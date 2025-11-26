# Debug 500 Error - Step by Step

## Step 1: Check if Backend is Running

**Look at your backend terminal** (where you ran `npm run dev`).

You should see:
```
🚀 Backend server running on http://localhost:3000
🔗 Clay webhook: ✅ Configured
```

**If you see "❌ NOT SET"**, your .env file has issues.

## Step 2: Check Backend Terminal for Errors

When you search, **check the backend terminal** for error messages like:

```
[Search] Error: ...
```

This will tell you exactly what's wrong.

## Step 3: Verify .env File Format

Your `backend/.env` should look **exactly** like this (NO spaces at start):

```bash
PORT=3000
CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
CLAY_COLUMN_NAME=address
```

**Common mistakes:**
- ❌ Spaces before `PORT=`
- ❌ Spaces before `CLAY_WEBHOOK_URL=`
- ❌ Quotes around values (not needed)
- ❌ Trailing spaces

## Step 4: Test Backend Directly

Test if backend is working:

```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok","timestamp":"..."}`

Then test search:

```bash
curl "http://localhost:3000/api/search?q=ev"
```

This will show you the exact error message.

## Step 5: Common Issues

### Issue 1: .env Not Loaded
**Symptom**: Backend shows "❌ NOT SET"
**Fix**: Remove leading spaces from .env, restart backend

### Issue 2: Backend Not Running
**Symptom**: Connection refused error
**Fix**: Start backend: `cd backend && npm run dev`

### Issue 3: Port Already in Use
**Symptom**: "EADDRINUSE" error
**Fix**: Change PORT in .env or kill process on port 3000

## Quick Test

Run this in terminal to test backend:

```bash
curl "http://localhost:3000/api/search?q=test"
```

Check what error it returns - that will tell us what's wrong!

