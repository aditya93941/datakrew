# 🚀 Start Here - Get It Working Now

## ✅ Local Setup Works - No Deployment Needed!

You can run everything locally for development and testing.

## 📋 Step-by-Step Instructions

### Step 1: Get Clay Webhook URL (5 minutes)

1. **Go to Clay Dashboard**: https://clay.com
2. **Login** to your account
3. **Create a new table** (or use existing):
   - Click "New Table" or open an existing table
   - Name it something like "Search Results"
4. **Get Webhook URL**:
   - Click on the table
   - Look for "Integrations" or "Webhooks" tab/section
   - Click "Add Webhook" or "View Webhooks"
   - **Copy the webhook URL**
   - It looks like: `https://hooks.clay.run/abc123/xyz789`

### Step 2: Set Up Backend (2 minutes)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file - add your Clay webhook URL
# Open .env and add:
# CLAY_WEBHOOK_URL=https://hooks.clay.run/your-actual-url-here
```

**Edit `backend/.env`**:
```bash
PORT=3000
CLAY_WEBHOOK_URL=https://hooks.clay.run/your-actual-webhook-url-here
```

### Step 3: Start Backend Server

```bash
# Still in backend folder
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:3000
📡 Search endpoint: http://localhost:3000/api/search?q=your+query
🔗 Clay webhook: Configured
```

**Keep this terminal open!**

### Step 4: Set Up Frontend (1 minute)

**Open a NEW terminal window**:

```bash
# Navigate to frontend folder
cd frontend

# Check if .env exists, if not create it
# Add this line to frontend/.env:
VITE_BACKEND_API_URL=http://localhost:3000
```

**Create/Edit `frontend/.env`**:
```bash
VITE_BACKEND_API_URL=http://localhost:3000
```

### Step 5: Start Frontend

```bash
# Still in frontend folder
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

### Step 6: Test It! 🎉

1. **Open browser**: http://localhost:5173
2. **Go to Search page**
3. **Type**: "EV companies in India"
4. **Click Search**
5. **See results!** ✨

## ✅ What You Should See

- **Frontend**: http://localhost:5173 (React app)
- **Backend**: http://localhost:3000 (Express server)
- **Search works**: Results appear instantly

## 🔍 Verify It's Working

### Check Backend Logs
In the backend terminal, you should see:
```
[Search] Query received: "EV companies in India"
[Search] Query sent to Clay webhook successfully
```

### Check Frontend
- Search results appear in table
- No errors in browser console

## 🐛 Troubleshooting

### Backend won't start
- **Port 3000 in use?** Change `PORT=3001` in `backend/.env`
- **Missing dependencies?** Run `npm install` in backend folder

### Frontend can't connect
- **Backend running?** Check backend terminal
- **Wrong URL?** Verify `VITE_BACKEND_API_URL=http://localhost:3000` in `frontend/.env`
- **Restart frontend** after changing .env

### No results showing
- **Check browser console** (F12) for errors
- **Check backend terminal** for logs
- **Verify webhook URL** is correct in `backend/.env`

## 📝 Summary

**You need 2 terminals running:**

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**That's it!** Everything runs locally. No deployment needed for development.

## 🚀 When Do You Need Deployment?

**Only if:**
- You want to share it with others (not on your computer)
- You want to use it in production
- You need it accessible from the internet

**For now:** Local setup is perfect for development and testing!

## ✅ Quick Checklist

- [ ] Got Clay webhook URL
- [ ] Backend `.env` has `CLAY_WEBHOOK_URL`
- [ ] Backend running on port 3000
- [ ] Frontend `.env` has `VITE_BACKEND_API_URL=http://localhost:3000`
- [ ] Frontend running on port 5173
- [ ] Tested search - results appear!

You're all set! 🎉

