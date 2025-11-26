const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Clay configuration from environment
const CLAY_WEBHOOK_URL = process.env.CLAY_WEBHOOK_URL || '';
// Note: CLAY_API_KEY, CLAY_TABLE_ID, etc. are not needed for this flow
// We use webhook (send TO Clay) + HTTP API action (receive FROM Clay) + cache

// In-memory cache to store enriched data from Clay
// Key: search query, Value: enriched results
const searchCache = new Map();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Webhook endpoint to receive enriched data from Clay
// Clay will POST enriched data to this endpoint via HTTP API action
app.post('/api/clay-data', (req, res) => {
  try {
    console.log('[Clay Webhook] Received enriched data from Clay');
    console.log('[Clay Webhook] Raw data:', JSON.stringify(req.body, null, 2));
    
    const clayData = req.body;
    
    // Extract the search query from the data
    // This should match CLAY_COLUMN_NAME (default: 'address')
    // Clay HTTP API should send: { "address": "original search text", ...enriched fields... }
    const columnName = process.env.CLAY_COLUMN_NAME || 'address';
    const query = clayData[columnName] || clayData.query || clayData.search_term || clayData.searchQuery || '';
    
    if (!query) {
      console.warn('[Clay Webhook] No query found in data. Expected field:', columnName);
      console.warn('[Clay Webhook] Available fields:', Object.keys(clayData));
      return res.status(400).json({
        status: 'error',
        message: `Missing search query. Expected field '${columnName}' in request body.`,
        receivedFields: Object.keys(clayData),
      });
    }
    
    console.log(`[Clay Webhook] Processing enriched data for query: "${query}"`);
    
    // Normalize enriched data to match frontend format
    const normalizedData = {
      id: clayData.id || clayData._id || `clay-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: clayData.company_name || clayData.name || clayData.company || clayData.title || '',
      domain: clayData.domain || (clayData.website ? clayData.website.replace(/^https?:\/\//, '').split('/')[0] : '') || '',
      industry: clayData.industry || clayData.industry_category || clayData.category || '',
      location: clayData.enriched_address || clayData.location || clayData.address || `${clayData.city || ''}, ${clayData.country || ''}`.trim() || '',
      description: clayData.description || clayData.about || clayData.summary || '',
      employeeCount: clayData.employee_count || clayData.employees || clayData.headcount || null,
      revenue: clayData.revenue || clayData.annual_revenue || clayData.revenue_amount || '',
      website: clayData.website || clayData.website_url || (clayData.domain ? `https://${clayData.domain}` : ''),
      enrichedAt: new Date().toISOString(),
    };
    
    // Store in cache (keyed by query)
    const queryKey = query.toLowerCase().trim();
    if (!searchCache.has(queryKey)) {
      searchCache.set(queryKey, []);
    }
    searchCache.get(queryKey).push(normalizedData);
    
    console.log(`[Clay Webhook] ✅ Cached enriched data for query: "${query}"`);
    console.log(`[Clay Webhook] Company: ${normalizedData.name || 'N/A'}`);
    console.log(`[Clay Webhook] Cache now has ${searchCache.size} unique queries`);
    console.log(`[Clay Webhook] Total cached results: ${Array.from(searchCache.values()).reduce((sum, arr) => sum + arr.length, 0)}`);
    
    res.json({ 
      status: 'success', 
      message: 'Data received and cached',
      query: query,
      cached: true,
    });
  } catch (error) {
    console.error('[Clay Webhook] Error processing data:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// Real-time search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q || req.query.query || '';

    if (!query.trim()) {
      return res.status(400).json({
        error: 'Query parameter is required',
        message: 'Please provide a search query using ?q=your+search+term',
      });
    }

    if (!CLAY_WEBHOOK_URL || CLAY_WEBHOOK_URL.trim() === '') {
      console.error('[Search] CLAY_WEBHOOK_URL is not set or empty');
      return res.status(500).json({
        error: 'Clay webhook URL not configured',
        message: 'Please set CLAY_WEBHOOK_URL in your .env file (no leading spaces!)',
        debug: {
          envLoaded: !!process.env.CLAY_WEBHOOK_URL,
          webhookUrlLength: CLAY_WEBHOOK_URL?.length || 0,
        },
      });
    }

    console.log(`[Search] Query received: "${query}"`);

    // Step 0: Check cache first (if Clay has already enriched this query)
    const queryKey = query.toLowerCase().trim();
    if (searchCache.has(queryKey) && searchCache.get(queryKey).length > 0) {
      const cachedResults = searchCache.get(queryKey);
      console.log(`[Search] Found ${cachedResults.length} cached result(s) for "${query}"`);
      
      const normalizedResults = cachedResults.map(item => ({
        id: item.id,
        name: item.name,
        domain: item.domain,
        industry: item.industry,
        location: item.location,
        description: item.description,
        employeeCount: item.employeeCount,
        revenue: item.revenue,
        website: item.website,
      }));
      
      return res.json({
        query: query,
        results: normalizedResults,
        total: normalizedResults.length,
        cached: true,
        message: `Found ${normalizedResults.length} cached result(s)`,
      });
    }

    // Step 1: Send query to Clay webhook (creates a row for tracking)
    const columnName = process.env.CLAY_COLUMN_NAME || 'address';
    const webhookPayload = { [columnName]: query };

    try {
      await axios.post(CLAY_WEBHOOK_URL, webhookPayload, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(`[Search] Query sent to Clay webhook (column: ${columnName})`);
      console.log(`[Search] Clay will enrich this data and send it back to /api/clay-data`);
    } catch (webhookError) {
      console.error('[Search] Webhook error:', webhookError.message);
      return res.status(500).json({
        error: 'Failed to send query to Clay',
        message: webhookError.message,
      });
    }

    // Step 2: Return "waiting" response
    // Clay will enrich asynchronously and POST results to /api/clay-data
    // Next search (or poll) will return cached results
    res.json({
      query: query,
      results: [],
      total: 0,
      cached: false,
      message: `Query sent to Clay. Enrichment in progress. Results will be available once Clay sends enriched data to /api/clay-data.`,
      note: 'Poll this endpoint or search again in a few seconds to get results.',
    });
  } catch (error) {
    console.error('[Search] Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      response: error.response?.data,
      status: error.response?.status,
    });
    
    // If it's a webhook error, still return empty results
    if (error.response) {
      res.status(200).json({
        query: query,
        results: [],
        total: 0,
        error: `Clay webhook returned ${error.response.status}`,
        message: error.response.data?.message || error.message,
      });
    } else {
      res.status(500).json({
        error: 'Search failed',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 Search endpoint: GET http://localhost:${PORT}/api/search?q=your+query`);
  console.log(`📥 Clay data webhook: POST http://localhost:${PORT}/api/clay-data (for Clay to send enriched data)`);
  console.log(`🔗 Clay webhook (send TO Clay): ${CLAY_WEBHOOK_URL ? '✅ Configured' : '❌ NOT SET'}`);
  if (CLAY_WEBHOOK_URL) {
    console.log(`   Webhook URL: ${CLAY_WEBHOOK_URL.substring(0, 60)}...`);
    console.log(`   Column name: ${process.env.CLAY_COLUMN_NAME || 'address'}`);
  }
  console.log(`\n📋 Setup Instructions:`);
  console.log(`   1. Configure Clay HTTP API action to POST to: https://datakrew.onrender.com/api/clay-data`);
  console.log(`   2. Make sure Clay sends '${process.env.CLAY_COLUMN_NAME || 'address'}' field with original search text`);
  console.log(`   3. Search → Clay enriches → Results cached → Next search returns results!`);
});

