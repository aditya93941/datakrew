# Complete Clay Integration Setup Guide

## Understanding How Clay Works

Clay **does NOT** have a direct search API like `GET /api/search?q=...`

Instead, Clay uses:
- **Webhook endpoints** per table
- **Asynchronous enrichment** (takes time)
- **Table-based workflow** system

## Architecture

```
Frontend (React) 
    ↓
Backend (Express) - GET /api/search?q=...
    ↓
Clay Webhook - POST to table
    ↓
Clay Enrichment (async, runs in background)
```

## Setup Steps

### Step 1: Get Clay Webhook URL

1. **Go to Clay Dashboard**: https://clay.com
2. **Create or open a table** (e.g., "Search Results")
3. **Click "Integrations" or "Webhooks"** for that table
4. **Copy the Webhook URL**
   - Looks like: `https://hooks.clay.run/.../some-long-id`
5. **Save this URL** - you'll need it for the backend

### Step 2: Set Up Backend

1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env`** and add your Clay webhook URL:
   ```bash
   PORT=3000
   CLAY_WEBHOOK_URL=https://hooks.clay.run/your-table-id/your-webhook-id
   ```

5. **Start backend**:
   ```bash
   npm run dev
   ```

Backend will run on `http://localhost:3000`

### Step 3: Update Frontend

1. **Update `frontend/.env`**:
   ```bash
   VITE_BACKEND_API_URL=http://localhost:3000
   ```

2. **Restart frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

### Step 4: Test

1. **Open frontend**: http://localhost:5173
2. **Go to Search page**
3. **Enter query**: "EV companies in India"
4. **Click Search**

## How It Works

1. **Frontend** calls: `GET http://localhost:3000/api/search?q=EV+companies`
2. **Backend** receives query
3. **Backend** POSTs to Clay webhook (creates row in Clay table)
4. **Backend** returns immediate results (mocked for demo)
5. **Clay** enriches data in background (async)

## Current Implementation

### Demo Mode (Current)
- Returns **mocked results** immediately
- Sends query to Clay webhook (for tracking)
- Fast response time

### Production Mode (Future)
- Poll Clay table for enriched results
- Or use Clay's API to read enriched data
- Real-time updates when enrichment completes

## File Structure

```
clay/
├── backend/
│   ├── server.js          # Express server with /api/search
│   ├── package.json
│   └── .env              # Clay webhook URL here
│
└── frontend/
    ├── src/
    │   └── pages/
    │       └── search/
    │           └── index.tsx  # Calls backend /api/search
    └── .env              # Backend URL here
```

## Running Everything

**Terminal 1 - Backend**:
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Backend not starting
- Check `PORT=3000` in `backend/.env`
- Make sure port 3000 is not in use

### "Clay webhook URL not configured"
- Add `CLAY_WEBHOOK_URL` to `backend/.env`
- Get URL from Clay dashboard → Table → Integrations → Webhooks

### Frontend can't connect
- Check `VITE_BACKEND_API_URL=http://localhost:3000` in `frontend/.env`
- Make sure backend is running

### No results showing
- Check browser console for errors
- Check backend console for logs
- Verify webhook URL is correct

## Next Steps (Production)

To get real Clay-enriched data:

1. **Poll Clay table** after sending webhook
2. **Use Clay API** to read enriched rows
3. **Store results** in database for caching
4. **Webhook from Clay** when enrichment completes

For now, the demo returns mocked data instantly while Clay enriches in the background.

