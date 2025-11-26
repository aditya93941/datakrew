# Clay Integration Frontend

Simple React + Refine frontend that fetches data directly from Clay API.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Clay API

Create `.env` file in the `frontend/` directory:

```bash
VITE_CLAY_API_URL=https://api.clay.com
VITE_CLAY_API_KEY=your_clay_api_key_here
```

**Get your Clay API key:**
1. Go to https://clay.com
2. Sign up / Login
3. Navigate to **Settings** → **API Keys**
4. Create a new API key
5. Copy it to `VITE_CLAY_API_KEY` in `.env`

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── dashboard/     # Dashboard page
│   │   ├── search/         # Search companies
│   │   └── companies/     # Company list & details
│   ├── components/         # Reusable components
│   ├── providers/         # Clay API data provider
│   └── main.tsx           # App entry point
└── package.json
```

## 🎯 Features

- **Search Page**: Search for companies using natural language queries
- **Company List**: View all searched companies
- **Company Details**: View detailed information about each company
- **Dashboard**: Overview and instructions

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

### Clay API Endpoints

The app calls Clay API directly. You may need to adjust endpoints in `src/providers/dataProvider.ts` based on Clay's actual API structure:

- Search: `POST /search`
- Get Company: `GET /companies/:id`

Check Clay API documentation for correct endpoints.

## 🐛 Troubleshooting

### "Cannot connect to Clay API"
- Verify `VITE_CLAY_API_KEY` is set correctly in `.env`
- Check `VITE_CLAY_API_URL` matches Clay's API base URL
- Verify API key has proper permissions

### "No data showing"
- Check browser console for errors
- Verify Clay API key is valid
- Check network tab for API requests

### Port already in use
- Vite will automatically use the next available port
- Or change port in `vite.config.ts`

## 📝 Notes

- This is a **frontend-only** application
- No backend or database required
- All data is fetched directly from Clay API
- Search results are not persisted (fresh on each search)

