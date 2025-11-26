# ⚡ Quick Start - 3 Steps

## ✅ YES - Local Works! No Deployment Needed

Everything runs on your computer. Perfect for development and testing.

## 🎯 3 Simple Steps

### 1️⃣ Get Clay Webhook URL
- Go to https://clay.com → Your Table → Integrations → Webhooks
- Copy the webhook URL

### 2️⃣ Start Backend
```bash
cd backend
npm install
# Edit .env: add CLAY_WEBHOOK_URL=your_url_here
npm run dev
```

### 3️⃣ Start Frontend
```bash
cd frontend  
npm install
# Edit .env: add VITE_BACKEND_API_URL=http://localhost:3000
npm run dev
```

## 🎉 Done!

Open http://localhost:5173 and search!

---

## 📋 Files to Edit

### `backend/.env`
```bash
PORT=3000
CLAY_WEBHOOK_URL=https://hooks.clay.run/your-url-here
```

### `frontend/.env`
```bash
VITE_BACKEND_API_URL=http://localhost:3000
```

## 🔍 Test It

1. Open http://localhost:5173
2. Search for "EV companies"
3. See results!

**That's it!** Everything runs locally. No deployment needed.

See `START_HERE.md` for detailed instructions.

