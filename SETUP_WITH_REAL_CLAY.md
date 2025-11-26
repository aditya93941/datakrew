# Setup with Real Clay Webhook

## Your Clay Webhook Endpoint

Based on your Clay dashboard, your endpoint is:

```
https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
```

## Quick Setup

### 1. Update Backend `.env`

Edit `backend/.env`:

```bash
PORT=3000
CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
CLAY_COLUMN_NAME=address
```

**Important**: 
- Replace with your actual webhook ID if different
- `CLAY_COLUMN_NAME` should match the column name in your Clay table
  - Common: `address`, `email`, `query`, `search_term`
  - Check your Clay table to see which column you're using

### 2. Test the Webhook (Optional)

Test directly with curl:

```bash
curl 'https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4' \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"address":"EV companies in India"}'
```

This should create a new row in your Clay table.

### 3. Start Backend

```bash
cd backend
npm install
npm run dev
```

### 4. Start Frontend

```bash
cd frontend
npm install
# Make sure frontend/.env has: VITE_BACKEND_API_URL=http://localhost:3000
npm run dev
```

### 5. Test in App

1. Open http://localhost:5173
2. Search for "EV companies in India"
3. Check your Clay table - a new row should appear!

## How It Works

1. **User searches** → Frontend calls `/api/search?q=...`
2. **Backend receives** → POSTs to Clay webhook with query
3. **Clay creates row** → New row appears in your table
4. **Clay enriches** → Enrichments run automatically (async)
5. **Backend returns** → Immediate results (mocked for demo)

## Column Name Options

Your Clay table might use different column names. Update `CLAY_COLUMN_NAME` in `.env`:

- `address` - For location/address-based searches
- `email` - For email-based searches  
- `query` - For general search queries
- `search_term` - Alternative query field
- `name` - For company/person names

**Check your Clay table** to see which column you want to populate!

## Next Steps: Reading Enriched Results

Currently, the app:
- ✅ Pushes queries to Clay
- ✅ Returns mocked results immediately
- ⏳ Clay enriches in background

**If you want to read enriched results back:**

You'll need to:
1. Poll Clay API to check when enrichment is done
2. Read the enriched row from Clay table
3. Return real data instead of mocked

Let me know if you want me to add that functionality!

## Troubleshooting

### "Column name doesn't match"
- Check your Clay table columns
- Update `CLAY_COLUMN_NAME` in `.env` to match

### "Webhook not working"
- Verify the webhook URL is correct
- Test with curl first (see step 2)
- Check Clay dashboard for webhook logs

### "No row created in Clay"
- Check backend console for errors
- Verify webhook URL format is correct
- Make sure column name matches your table

