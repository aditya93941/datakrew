# Simple Frontend Setup

## What You Have

✅ **Frontend-only React app** that calls Clay API directly
- No backend needed
- No database needed
- Just frontend + Clay API

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Configure Clay API Key

Create `.env` file in `frontend/` directory:

```bash
VITE_CLAY_API_URL=https://api.clay.com
VITE_CLAY_API_KEY=your_clay_api_key_here
```

**Get your Clay API key:**
1. Go to https://clay.com
2. Sign up / Login
3. Settings → API Keys
4. Create new API key
5. Copy to `.env` file

### Step 3: Run

```bash
npm run dev
```

Open http://localhost:5173

## 📁 Project Structure

```
clay/
└── frontend/              # Only frontend, no backend!
    ├── src/
    │   ├── pages/         # Search, Dashboard, Companies
    │   ├── providers/     # Clay API integration
    │   └── components/    # UI components
    └── package.json
```

## 🎯 How to Use

1. **Search Page**: Enter search query (e.g., "EV companies in India")
2. **View Results**: See companies in a table
3. **Company Details**: Click to view full details

## ⚙️ Configuration

The app calls Clay API directly. You may need to adjust API endpoints in:
- `frontend/src/providers/dataProvider.ts`

Check Clay API documentation for correct endpoints.

## 🐛 Troubleshooting

**No data showing?**
- Check `.env` file has correct `VITE_CLAY_API_KEY`
- Verify API key is valid in Clay dashboard
- Check browser console for errors

**API errors?**
- Verify `VITE_CLAY_API_URL` matches Clay's API
- Check Clay API documentation for endpoint structure

## ✅ That's It!

No backend, no database, just frontend calling Clay API directly! 🎉

