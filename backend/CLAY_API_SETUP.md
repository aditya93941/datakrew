# How to Get Real Data from Clay

## The Problem

Clay webhooks **only return "OK"** - they don't return enriched data. The enrichment happens asynchronously in the background.

## The Solution

You need to use **Clay's API** to read/search data from your Clay table.

## Step 1: Get Your Clay API Key

1. Go to https://clay.com
2. Click **Settings** (or your profile)
3. Go to **API Keys**
4. **Create a new API key** or copy existing one
5. **Copy the API key**

## Step 2: Add to Backend .env

Edit `backend/.env` and add:

```bash
CLAY_API_KEY=your_actual_api_key_here
```

## Step 3: Find Your Table ID (Optional)

If you want to read from a specific table:

1. Go to your Clay table
2. Look at the URL or table settings
3. Copy the table ID
4. Add to `.env`:
   ```bash
   CLAY_TABLE_ID=your_table_id_here
   ```

## Step 4: Restart Backend

```bash
cd backend
# Stop server (Ctrl+C)
npm run dev
```

## How It Works Now

1. **User searches** → Backend sends to Clay webhook (creates row)
2. **Backend calls Clay API** → Searches/reads data from Clay table
3. **Clay returns results** → Backend normalizes and returns to frontend
4. **Frontend displays** → Real data from Clay!

## Clay API Endpoints

The code tries these endpoints (you may need to adjust):

- `/v3/search` - General search
- `/v3/tables/{table_id}/rows` - Read table rows
- `/v3/companies/search` - Company search (if available)

**Check Clay API documentation** for the exact endpoint structure.

## If Still No Data

1. **Check Clay API key** is correct in `.env`
2. **Check backend console** for API errors
3. **Verify Clay API endpoint** - may need to adjust in `server.js`
4. **Check Clay documentation** for correct API structure

## Next Steps

Once you have `CLAY_API_KEY` set, the backend will:
- ✅ Send query to webhook (for tracking)
- ✅ Call Clay API to get actual data
- ✅ Return real results based on your search

The search for "laptops" will return laptop companies, not EV companies!

