# How to Set Up Clay to Send Data Back to Your Backend

## The Issue Explained

You have:
- ✅ **Webhook URL** (sends data TO Clay) - This is working!

You need:
- ❌ **HTTP API Action in Clay** (sends data FROM Clay) - This needs to be configured in Clay dashboard

## Two Different URLs

### 1. Your Webhook URL (Already Have) ✅
```
CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-...
```
**Purpose**: Your backend → Clay (sends search queries)
**Status**: Working! Creates rows in Clay table

### 2. Your Backend Webhook Endpoint (Just Created) ✅
```
http://localhost:3000/api/clay-data
```
**Purpose**: Clay → Your backend (sends enriched data)
**Status**: Created! Now you need to configure Clay to use it

## Step-by-Step Setup in Clay Dashboard

### Step 1: Get Your Public Backend URL

For local development, use **ngrok** or similar:

```bash
# Install ngrok (if not installed)
# Then run:
ngrok http 3000
```

This gives you a public URL like: `https://abc123.ngrok.io`

Your webhook URL will be: `https://abc123.ngrok.io/api/clay-data`

### Step 2: Configure HTTP API Action in Clay

1. **Go to Clay Dashboard**: https://app.clay.com
2. **Open your table** (the one with your webhook)
3. **Add a new column** or **Add an action**:
   - Look for "HTTP API" or "Webhook" action
   - Or go to "Enrichments" → "Add Enrichment" → "HTTP API"
4. **Configure the HTTP API action**:
   - **URL**: `https://your-ngrok-url.ngrok.io/api/clay-data`
   - **Method**: `POST`
   - **Headers**: 
     - `Content-Type: application/json`
   - **Body**: Select which fields to send
     - Include: `address` (or your search column)
     - Include: All enriched fields (company name, website, etc.)
5. **Set trigger**:
   - Trigger when: "Row is enriched" or "After enrichment completes"
   - Or: "On row update"

### Step 3: Test It

1. **Search in your app**: "laptop"
2. **Check backend console**: Should see `[Clay Webhook] Received enriched data`
3. **Search again**: Should return cached results immediately!

## How It Works Now

```
1. User searches "laptop"
   ↓
2. Backend sends to Clay webhook (creates row)
   ↓
3. Clay enriches the row (async, takes time)
   ↓
4. Clay HTTP API action triggers
   ↓
5. Clay POSTs enriched data to /api/clay-data
   ↓
6. Backend caches the data
   ↓
7. User searches again → Gets cached results instantly!
```

## Alternative: For Production

If deploying to production (Vercel, Render, etc.):

1. **Deploy your backend** (get public URL)
2. **Use that URL** in Clay HTTP API action:
   ```
   https://your-backend.vercel.app/api/clay-data
   ```

## Troubleshooting

### Clay not sending data?
- Check Clay dashboard → Your table → See if HTTP API action is configured
- Check backend console for incoming requests
- Verify the URL in Clay matches your backend URL

### Data not appearing?
- Check backend console logs
- Verify Clay is sending the correct field names
- Check cache: backend will log cache size

### Local development issues?
- Use ngrok to expose localhost
- Make sure ngrok URL is accessible
- Update Clay HTTP API action URL when ngrok URL changes

## Summary

- ✅ **Webhook URL** (TO Clay): Already configured, working
- ✅ **Backend endpoint** (FROM Clay): Just created at `/api/clay-data`
- ⏳ **Clay HTTP API action**: You need to configure this in Clay dashboard

Once you configure the HTTP API action in Clay, the full flow will work!

