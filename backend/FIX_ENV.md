# Fix Your .env File

## Problem

Your `.env` file has **leading spaces** before the variable names. This prevents the variables from being read correctly.

## Solution

Edit `backend/.env` and make sure there are **NO spaces** at the beginning of each line.

### ❌ Wrong (has spaces):
```bash
   PORT=3000
   CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
   CLAY_COLUMN_NAME=address
```

### ✅ Correct (no leading spaces):
```bash
PORT=3000
CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
CLAY_COLUMN_NAME=address
```

## How to Fix

1. **Open** `backend/.env` in your editor
2. **Remove all spaces** at the beginning of each line
3. **Make sure** each line starts directly with the variable name
4. **Save** the file
5. **Restart** the backend server

## After Fixing

Restart your backend:
```bash
cd backend
# Stop current server (Ctrl+C)
npm run dev
```

You should see:
```
🔗 Clay webhook: ✅ Configured
   Webhook URL: https://api.clay.com/v3/sources/webhook/...
   Column name: address
```

If you still see "❌ NOT SET", the .env file still has issues.

