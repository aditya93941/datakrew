# Test Backend Without Tunnel (Manual Testing)

Since tunnels are having firewall issues, let's test the backend flow manually first!

## Step 1: Start Your Backend

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:3000
```

## Step 2: Test the Flow Manually

### A. Simulate Clay Sending Enriched Data

Open a **new terminal** and run:

```bash
curl -X POST http://localhost:3000/api/clay-data \
  -H "Content-Type: application/json" \
  -d '{
    "address": "laptop",
    "company_name": "Dell Technologies",
    "domain": "dell.com",
    "website": "https://www.dell.com",
    "enriched_address": "Round Rock, Texas, USA"
  }'
```

You should see in backend console:
```
[Clay Webhook] Received enriched data from Clay
[Clay Webhook] ✅ Cached enriched data for query: "laptop"
```

### B. Test Search (Should Return Cached Results)

```bash
curl "http://localhost:3000/api/search?q=laptop"
```

You should get:
```json
{
  "query": "laptop",
  "results": [
    {
      "id": "...",
      "name": "Dell Technologies",
      "domain": "dell.com",
      "website": "https://www.dell.com",
      ...
    }
  ],
  "total": 1,
  "cached": true
}
```

### C. Test Sending Query to Clay Webhook

```bash
curl "http://localhost:3000/api/search?q=EV%20companies"
```

This will:
1. Send to Clay webhook (creates row in Clay)
2. Return "waiting" message
3. Later, when Clay enriches and sends to `/api/clay-data`, results will be cached

## Step 3: For Real Clay Integration - Deploy to Production

Since tunnels aren't working, **deploy your backend to production**:

### Option A: Vercel (Easiest)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd backend
   vercel
   ```

3. Follow prompts (defaults are fine)

4. Get your URL: `https://your-backend.vercel.app`

5. Use in Clay: `https://your-backend.vercel.app/api/clay-data`

### Option B: Render (Also Easy)

1. Go to https://render.com
2. Create account
3. New → Web Service
4. Connect GitHub repo (or deploy from CLI)
5. Settings:
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Get your URL: `https://your-backend.onrender.com`
7. Use in Clay: `https://your-backend.onrender.com/api/clay-data`

### Option C: Railway

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Get your URL
4. Use in Clay

## Why Production is Better

- ✅ Stable URL (doesn't change)
- ✅ No firewall issues
- ✅ Works 24/7 (even when your laptop is off)
- ✅ Free tier available on all platforms
- ✅ Better for demos

## Quick Test Script

Save this as `test-backend.sh`:

```bash
#!/bin/bash

echo "1. Testing search (should be empty first time)..."
curl "http://localhost:3000/api/search?q=laptop"

echo -e "\n\n2. Simulating Clay sending enriched data..."
curl -X POST http://localhost:3000/api/clay-data \
  -H "Content-Type: application/json" \
  -d '{
    "address": "laptop",
    "company_name": "Dell Technologies",
    "domain": "dell.com",
    "website": "https://www.dell.com"
  }'

echo -e "\n\n3. Testing search again (should return cached results)..."
curl "http://localhost:3000/api/search?q=laptop"
```

Run: `chmod +x test-backend.sh && ./test-backend.sh`

## Summary

1. ✅ **Test manually** - Proves the backend works
2. ✅ **Deploy to production** - Get stable URL for Clay
3. ✅ **Configure Clay** - Use production URL in HTTP API action
4. ✅ **Done!** - Full flow working

