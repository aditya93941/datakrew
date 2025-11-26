# ⚠️ IMPORTANT: CORS Issue with Clay API

## The Problem

Clay API **does not allow direct browser requests** due to CORS policy. This is a security feature.

## What I've Fixed

✅ **Disabled auto-fetching** - Companies list won't try to load automatically
✅ **Added Vite proxy** - For development, requests go through Vite proxy
✅ **Better error messages** - Clear CORS error messages

## Current Setup

### Development (Vite Dev Server)
- ✅ **Works**: Vite proxy forwards requests to Clay API
- Requests go: `Browser → Vite Proxy → Clay API`
- No CORS errors in development

### Production Build
- ❌ **Won't Work**: Direct browser → Clay API calls will fail
- You'll get CORS errors in production

## Solutions

### Option 1: Use Vite Proxy (Development Only) ✅ CURRENT
Already configured! Just restart your dev server:
```bash
npm run dev
```

### Option 2: Simple Backend Proxy (For Production)
Create a minimal Node.js server:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/search', async (req, res) => {
  try {
    const response = await axios.post('https://api.clay.com/search', req.body, {
      headers: {
        'Authorization': `Bearer ${process.env.CLAY_API_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

Then update frontend to call `http://localhost:3000/api/search` instead.

### Option 3: Check Clay Documentation
- Visit https://clay.com/docs
- Look for "JavaScript SDK" or "Browser Integration"
- They might have a solution for frontend access

## Test It Now

1. **Restart dev server**: `npm run dev`
2. **Go to Search page**
3. **Enter search term**: "EV companies in India"
4. **Click Search**

The Vite proxy should handle the CORS issue in development!

## For Production

You'll need a backend proxy server. The frontend-only approach won't work in production due to CORS restrictions.

