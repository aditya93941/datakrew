# Quick Start: Expose Local Backend to Clay

## The Problem

Clay needs a public URL to POST enriched data to your backend, but your backend is running on `localhost:3000` which Clay can't reach.

## Solution: Use localtunnel (Already Installed!)

## Step 1: Start Your Backend

In one terminal:

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:3000
```

## Step 2: Start the Tunnel

In a **new terminal** (keep backend running):

```bash
cd backend
npm run tunnel
```

You'll see something like:
```
your url is: https://abc123.loca.lt
```

**Copy this URL!** You'll need it for Clay.

## Step 3: Configure Clay HTTP API Action

1. Go to Clay dashboard → Your table
2. Add HTTP API action
3. Set the URL to: `https://abc123.loca.lt/api/clay-data`
   (Replace `abc123.loca.lt` with your actual localtunnel URL)
4. Configure the body mapping (see `CLAY_HTTP_API_SETUP.md`)

## Step 4: Test It!

1. Search in your app: "laptop"
2. Wait 10-30 seconds for Clay to enrich
3. Check backend console - should see:
   ```
   [Clay Webhook] Received enriched data from Clay
   ```
4. Search again - should return cached results!

## Important Notes

- **Keep both terminals running**: Backend + Tunnel
- **Tunnel URL changes**: Each time you restart `npm run tunnel`, you get a new URL
- **Update Clay when URL changes**: If you restart the tunnel, update the URL in Clay
- **For production**: Deploy to Vercel/Render instead of using tunnel

## Alternative: Test Manually First

Before setting up Clay, test your backend endpoint manually:

```bash
curl -X POST http://localhost:3000/api/clay-data \
  -H "Content-Type: application/json" \
  -d '{
    "address": "laptop",
    "company_name": "Dell Technologies",
    "domain": "dell.com",
    "website": "https://www.dell.com"
  }'
```

Then search: `GET /api/search?q=laptop` - should return cached results!

## Troubleshooting

### Tunnel not working?
- Make sure backend is running on port 3000
- Check if port 3000 is already in use
- Try restarting both backend and tunnel

### Clay not sending data?
- Verify the tunnel URL in Clay matches what `npm run tunnel` shows
- Check backend console for incoming requests
- Make sure tunnel is still running (don't close that terminal!)

### URL keeps changing?
- That's normal with localtunnel
- Just update the URL in Clay when it changes
- Or deploy to production for a stable URL

