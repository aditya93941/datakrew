# Fixing 404 Error - API Endpoint Issue

## Problem

Getting `404 Not Found` error means the API endpoint doesn't exist or is incorrect.

## Current Endpoint

The code is trying: `/v1/search`

## Solution

You need to check Clay's actual API documentation for the correct endpoint. Common patterns:

1. `/search` - Simple endpoint
2. `/v1/search` - Versioned endpoint (currently trying this)
3. `/companies/search` - Resource-based
4. `/api/v1/search` - Full path
5. `/v2/search` - Different version

## How to Fix

### Step 1: Check Clay API Documentation

1. Go to https://clay.com/docs
2. Look for "API Reference" or "Search Endpoint"
3. Find the exact endpoint path

### Step 2: Update the Endpoint

Edit `frontend/src/pages/search/index.tsx`:

Find this line (around line 60):
```typescript
const endpoint = '/v1/search'; // Try v1 endpoint first
```

Change to the correct endpoint from Clay's docs, for example:
```typescript
const endpoint = '/search'; // or whatever Clay uses
```

### Step 3: Check Request Format

Also verify the request body format. Clay might expect:
- `{ query: "..." }`
- `{ search: "..." }`
- `{ q: "..." }`
- Or different structure

Check the console logs to see what's being sent.

## Debug Information

The code now logs to console:
- The full URL being called
- Whether API key is set
- The search query

Check browser console (F12) to see these logs.

## Alternative: Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try a search
4. Click on the failed request
5. Check:
   - Request URL (what endpoint was called)
   - Request Payload (what data was sent)
   - Response (what error Clay returned)

This will tell you exactly what's wrong.

## Quick Test Endpoints

You can try these common patterns by editing the endpoint:

```typescript
// Try these one by one:
const endpoint = '/search';
const endpoint = '/v1/search';
const endpoint = '/companies/search';
const endpoint = '/api/v1/search';
const endpoint = '/v2/search';
```

## Need Help?

If you have Clay API documentation, share the endpoint structure and I can update the code accordingly.

