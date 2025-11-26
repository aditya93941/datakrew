# Clay HTTP API Action Setup - Exact Instructions

## What You Need to Do in Clay Dashboard

### Step 1: Open Your Table in Clay

1. Go to https://app.clay.com
2. Open the table that has your webhook configured

### Step 2: Add HTTP API Action

1. In your table, look for:
   - **"Actions"** or **"Enrichments"** tab
   - Or **"Add Column"** → **"HTTP API"**
   - Or **"Integrations"** → **"HTTP API"**

2. Click to add a new HTTP API action/enrichment

### Step 3: Configure the HTTP API

#### A. In the "Describe the API" text box, paste this:

```
For every enriched row in this table, send a POST request with JSON to my backend:

Endpoint: http://localhost:3000/api/clay-data
Method: POST

The JSON body should include:
- address: the value from the "Address" column (the original search query)
- company_name: the enriched company name column
- domain: the enriched domain column
- website: the enriched URL column
- enriched_address: the enriched address column
- also include any other enriched fields that are useful.

Use "address" as the key that contains the original search text, because my backend uses that to match the query.
```

**Important**: If your backend is not on localhost (e.g., using ngrok or production), replace `http://localhost:3000` with your actual URL.

#### B. Click "Generate API Connection" or "Continue"

#### C. In the "Configure" tab, set up the body mapping:

Make sure the JSON body looks like this (adjust column names to match your actual Clay table columns):

```json
{
  "address": "{{Address}}",
  "company_name": "{{en Enrich Company}}",
  "domain": "{{en Domain}}",
  "website": "{{en Url}}",
  "enriched_address": "{{en Address}}"
}
```

**Key Points:**
- `"address"` must contain the **original search query** (from your "Address" column)
- Use `{{Column Name}}` syntax to reference Clay columns
- Enriched columns usually start with `"en "` prefix (e.g., `"en Enrich Company"`)

#### D. Set the trigger:

- **When to trigger**: "After row is enriched" or "On row update"
- **Or**: Set it to trigger automatically when enrichments complete

### Step 4: Test It

1. **Search in your app**: Type "laptop" and search
2. **Check backend console**: Should see `[Clay Webhook] Received enriched data`
3. **Search again**: Should return cached results!

## For Local Development (ngrok)

If your backend is running on `localhost:3000`, Clay can't reach it directly. Use ngrok:

```bash
# Install ngrok (if not installed)
# Then run:
ngrok http 3000
```

This gives you a URL like: `https://abc123.ngrok.io`

**Update Clay HTTP API action** to use: `https://abc123.ngrok.io/api/clay-data`

**Note**: ngrok URLs change each time you restart ngrok. Update Clay when it changes.

## For Production

If your backend is deployed (Vercel, Render, etc.):

1. Get your production URL: `https://your-backend.vercel.app`
2. Use in Clay: `https://your-backend.vercel.app/api/clay-data`

## How to Verify It's Working

1. **Search in your app**: "EV companies"
2. **Check backend logs**: Should see:
   ```
   [Search] Query sent to Clay webhook
   ```
3. **Wait a few seconds** (for Clay to enrich)
4. **Check backend logs again**: Should see:
   ```
   [Clay Webhook] Received enriched data from Clay
   [Clay Webhook] ✅ Cached enriched data for query: "ev companies"
   ```
5. **Search again**: Should return results immediately!

## Troubleshooting

### Clay not sending data?
- Check Clay dashboard → Your table → See if HTTP API action is configured
- Check if action is enabled/active
- Verify the URL is correct (no typos)
- For localhost, make sure you're using ngrok

### Backend not receiving data?
- Check backend console for incoming requests
- Verify the endpoint URL in Clay matches your backend
- Check if backend is running and accessible

### Wrong data format?
- Check backend console logs - it shows what fields Clay sent
- Verify the `address` field contains the original search query
- Adjust column mappings in Clay if needed

### Cache not working?
- Check backend logs - should show cache size
- Verify query matching (case-insensitive, trimmed)
- Try searching the exact same text again

## Summary

✅ **Webhook URL** (TO Clay): Already configured, working
✅ **Backend endpoint** (FROM Clay): Created at `/api/clay-data`
⏳ **Clay HTTP API action**: Configure this in Clay dashboard using instructions above

Once configured, the full flow works:
1. User searches → Backend sends to Clay ✅
2. Clay enriches → Sends to `/api/clay-data` ✅
3. Backend caches → Returns results on next search ✅

