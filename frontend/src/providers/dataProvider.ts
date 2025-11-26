import { DataProvider } from '@refinedev/core';
import axios from 'axios';

// Clay API Configuration
// Use proxy in development to avoid CORS issues
const isDev = import.meta.env.DEV;
const CLAY_API_URL = isDev 
  ? '/api/clay'  // Use Vite proxy in development
  : (import.meta.env.VITE_CLAY_API_URL || 'https://api.clay.com');
const CLAY_API_KEY = import.meta.env.VITE_CLAY_API_KEY || '';

// Create axios instance with proper configuration
const axiosInstance = axios.create({
  baseURL: CLAY_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth header to all requests
if (CLAY_API_KEY) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${CLAY_API_KEY}`;
}

// Add request interceptor to ensure headers are set
axiosInstance.interceptors.request.use((config) => {
  if (CLAY_API_KEY) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${CLAY_API_KEY}`;
  }
  return config;
});

// Simple data provider that calls Clay API directly
export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    // Don't auto-fetch companies - they should be searched via Search page
    // This prevents CORS errors from auto-loading
    if (resource === 'companies') {
      return { data: [], total: 0 };
    }
    
    return { data: [], total: 0 };
  },
  
  getOne: async ({ resource, id, meta }) => {
    const response = await axiosInstance.get(`/companies/${id}`);
    const company = response.data;
    
    return {
      data: {
        id: company.id || id,
        name: company.name || company.company_name || '',
        domain: company.domain || company.website_domain || '',
        industry: company.industry || company.industry_category || '',
        location: company.location || `${company.city || ''}, ${company.country || ''}`.trim(),
        description: company.description || company.about || '',
        employeeCount: company.employee_count || company.employees || company.headcount,
        revenue: company.revenue || company.annual_revenue || '',
        website: company.website || company.website_url || company.domain || '',
      },
    };
  },
  
  custom: {
    search: async ({ url, method, payload, meta }) => {
      try {
        // Check if API key is configured
        if (!CLAY_API_KEY) {
          throw new Error('Clay API key is not configured. Please add VITE_CLAY_API_KEY to your .env file.');
        }

        const response = await axiosInstance.post('/search', {
          query: payload?.query || '',
          filters: payload?.filters || {},
        });
        
        const companies = response.data.results || response.data.data || response.data;
        const data = Array.isArray(companies) ? companies : [];
        
        return {
          data: {
            companies: data.map((item: any) => ({
              id: item.id || item.company_id || Math.random().toString(),
              name: item.name || item.company_name || '',
              domain: item.domain || item.website_domain || '',
              industry: item.industry || item.industry_category || '',
              location: item.location || `${item.city || ''}, ${item.country || ''}`.trim(),
              description: item.description || item.about || '',
              employeeCount: item.employee_count || item.employees || item.headcount,
              revenue: item.revenue || item.annual_revenue || '',
              website: item.website || item.website_url || item.domain || '',
            })),
            total: response.data.total || data.length,
            searchTerm: payload?.query || '',
            cached: false,
          },
        };
      } catch (error: any) {
        // Handle API errors
        if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS') || error.message?.includes('Access-Control')) {
          // CORS error - Clay API doesn't allow direct browser requests
          throw new Error(
            'CORS Error: Clay API cannot be accessed directly from the browser. ' +
            'You need a backend proxy server to make API calls. ' +
            'Please check Clay documentation for browser access options or set up a simple proxy server.'
          );
        } else if (error.response) {
          // API responded with error status
          throw new Error(
            error.response.data?.message || 
            error.response.data?.error || 
            `API Error: ${error.response.status} ${error.response.statusText}`
          );
        } else if (error.request) {
          // Request made but no response
          throw new Error('No response from Clay API. Please check your internet connection and API URL.');
        } else {
          // Error setting up request
          throw new Error(error.message || 'Failed to search companies');
        }
      }
    },
  },
};

