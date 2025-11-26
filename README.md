# Clay Integration - Real-Time Search

Frontend React app with backend proxy for Clay webhook integration.

## 🚀 Quick Start

### 1. Get Your Clay Webhook URL

From Clay dashboard, your endpoint format is:
```
https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-<YOUR-ID>
```

### 2. Set Up Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env:
# CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-<YOUR-ID>
# CLAY_COLUMN_NAME=address
npm run dev
```

### 3. Set Up Frontend

```bash
cd frontend
npm install
# Create .env with: VITE_BACKEND_API_URL=http://localhost:3000
npm run dev
```

### 4. Test

Open http://localhost:5173 and search!

## 📋 Configuration

### Backend `.env`
```bash
PORT=3000
CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-<YOUR-ID>
CLAY_COLUMN_NAME=address
```

### Frontend `.env`
```bash
VITE_BACKEND_API_URL=http://localhost:3000
```

## 📚 Documentation

- `START_HERE.md` - Complete setup guide
- `SETUP_WITH_REAL_CLAY.md` - Real Clay webhook setup
- `CLAY_SETUP_GUIDE.md` - Detailed architecture

## ✅ Current Features

- ✅ Push search queries to Clay webhook
- ✅ Real-time search UI
- ✅ Immediate results (mocked for demo)
- ✅ Clay enriches in background

## 🔄 Next: Reading Enriched Results

To get real enriched data back from Clay, we can add:
- Polling Clay API for enriched rows
- Reading results from Clay table
- Real-time updates when enrichment completes

Let me know if you want this added!
