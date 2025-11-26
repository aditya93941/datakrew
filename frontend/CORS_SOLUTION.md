# CORS Issue - Solution

## Problem

Clay API doesn't allow direct browser requests due to CORS (Cross-Origin Resource Sharing) policy. This is a security feature that prevents websites from making unauthorized API calls.

## Error Message

```
Access to XMLHttpRequest at 'https://api.clay.com/search' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

## Solutions

### Option 1: Use Clay's JavaScript SDK (Recommended)

Check if Clay provides a JavaScript SDK that handles CORS:
1. Visit Clay documentation
2. Look for "JavaScript SDK" or "Browser SDK"
3. Use their official SDK instead of direct API calls

### Option 2: Simple Backend Proxy (Minimal)

Create a minimal backend that proxies requests:

```javascript
// Simple Express proxy (proxy-server.js)
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.post('/api/search', async (req, res) => {
  try {
    const response = await axios.post('https://api.clay.com/search', req.body, {
      headers: {
        'Authorization': `Bearer ${process.env.CLAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

### Option 3: Vite Proxy (Development Only)

Add proxy to `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/clay': {
        target: 'https://api.clay.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/clay/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            proxyReq.setHeader('Authorization', `Bearer ${process.env.VITE_CLAY_API_KEY}`);
          });
        },
      },
    },
  },
});
```

**Note**: This won't work in production build - only for development.

### Option 4: Check Clay Documentation

1. Visit https://clay.com/docs
2. Look for:
   - "Browser Integration"
   - "JavaScript SDK"
   - "CORS Configuration"
   - "Frontend Access"

## Current Status

- ✅ Search page won't auto-fetch (prevents CORS errors on page load)
- ✅ Companies list won't auto-fetch (prevents CORS errors)
- ✅ Clear error messages for CORS issues
- ⚠️ Direct API calls from browser will fail due to CORS

## Recommendation

**For production use, you'll need a backend proxy** or use Clay's official JavaScript SDK if available. The frontend-only approach will not work due to CORS restrictions.

