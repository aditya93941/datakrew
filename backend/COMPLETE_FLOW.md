# Complete Flow: Search in Your App → Get Results from Clay

## Architecture Overview

```
Frontend (React)
    ↓ GET /api/search?q=laptop
Backend (Express)
    ↓ POST to Clay webhook
Clay Table (creates row)
    ↓ Enrichment (async)
Clay HTTP API Action
    ↓ POST enriched data
Backend /api/clay-data (caches)
    ↓
Frontend polls/searches again → Gets cached results!
```

## Step-by-Step Flow

### 1. User Searches in Frontend

```javascript
// Frontend calls:
GET http://localhost:3000/api/search?q=laptop
```

### 2. Backend Receives Search

- Checks cache first (if already enriched, returns immediately)
- If not cached, sends to Clay webhook

### 3. Backend Sends to Clay Webhook

```javascript
POST https://api.clay.com/v3/sources/webhook/...
Body: { "address": "laptop" }
```

This creates a new row in Clay table with:
- `address` = "laptop" (the search query)

### 4. Clay Enriches the Row

Clay runs enrichments asynchronously:
- Finds companies related to "laptop"
- Enriches: company name, domain, website, address, etc.

### 5. Clay Sends Enriched Data Back

Clay HTTP API action triggers and POSTs to:

```javascript
POST http://localhost:3000/api/clay-data
Body: {
  "address": "laptop",  // Original search query
  "company_name": "Dell Technologies",
  "domain": "dell.com",
  "website": "https://www.dell.com",
  "enriched_address": "Round Rock, Texas, USA"
}
```

### 6. Backend Caches the Data

Backend receives data at `/api/clay-data`:
- Extracts `address` field (original query)
- Normalizes the data
- Stores in memory cache: `searchCache.set("laptop", [enrichedData])`

### 7. User Searches Again (or Frontend Polls)

```javascript
GET http://localhost:3000/api/search?q=laptop
```

Backend:
- Checks cache: `searchCache.get("laptop")`
- Finds cached results ✅
- Returns immediately!

## Key Components

### Backend Endpoints

1. **GET `/api/search?q=...`**
   - Checks cache
   - Sends to Clay webhook if not cached
   - Returns "waiting" message or cached results

2. **POST `/api/clay-data`**
   - Receives enriched data from Clay
   - Caches it by query
   - Returns success

### Environment Variables

```bash
# Required
CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/...
CLAY_COLUMN_NAME=address  # Column name in Clay table

# Optional (for local dev)
PORT=3000
```

### Clay Configuration

1. **Webhook URL** (already configured)
   - Receives search queries from your backend
   - Creates rows in Clay table

2. **HTTP API Action** (needs configuration)
   - Sends enriched data to your backend
   - Configure in Clay dashboard
   - See `CLAY_HTTP_API_SETUP.md` for details

## Data Flow Example

### First Search: "laptop"

```
1. Frontend: GET /api/search?q=laptop
2. Backend: Cache empty → POST to Clay webhook
3. Backend: Returns { results: [], message: "Enrichment in progress..." }
4. Clay: Enriches row (takes 10-30 seconds)
5. Clay: POST to /api/clay-data with enriched data
6. Backend: Caches data under "laptop"
```

### Second Search: "laptop" (or poll)

```
1. Frontend: GET /api/search?q=laptop
2. Backend: Cache hit! Returns cached results immediately
3. Frontend: Displays results ✅
```

## Testing the Flow

### 1. Start Backend

```bash
cd backend
npm run dev
```

Should see:
```
🚀 Backend server running on http://localhost:3000
📡 Search endpoint: GET http://localhost:3000/api/search?q=your+query
📥 Clay data webhook: POST http://localhost:3000/api/clay-data
```

### 2. Configure Clay HTTP API Action

Follow `CLAY_HTTP_API_SETUP.md` to set up the HTTP API action in Clay.

### 3. Test Search

```bash
# First search (will be empty, sends to Clay)
curl "http://localhost:3000/api/search?q=laptop"

# Wait 10-30 seconds for Clay to enrich

# Second search (should return cached results)
curl "http://localhost:3000/api/search?q=laptop"
```

### 4. Check Backend Logs

You should see:
```
[Search] Query received: "laptop"
[Search] Query sent to Clay webhook
[Clay Webhook] Received enriched data from Clay
[Clay Webhook] ✅ Cached enriched data for query: "laptop"
[Search] Found 1 cached result(s) for "laptop"
```

## Frontend Polling (Optional)

For better UX, frontend can poll until results are ready:

```javascript
const search = async (query) => {
  const poll = async () => {
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    
    if (data.cached && data.results.length > 0) {
      // Results ready!
      return data.results;
    } else {
      // Wait and poll again
      setTimeout(poll, 2000); // Poll every 2 seconds
    }
  };
  
  return poll();
};
```

## Summary

✅ **Simplified backend**: Only webhook + cache, no Clay REST API attempts
✅ **Clear flow**: Search → Clay → Cache → Results
✅ **Easy setup**: Just configure Clay HTTP API action
✅ **Fast results**: Cached results return instantly

The backend is now clean and focused on the webhook + cache pattern!

