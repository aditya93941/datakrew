# ⚠️ URGENT: Fix Your .env File NOW

## The Problem

Your backend is returning: **"Clay webhook URL not configured"**

This means your `.env` file is **NOT being read correctly**.

## The Fix

Your `backend/.env` file **MUST** have **NO SPACES** at the beginning of each line.

### ❌ WRONG (what you probably have):
```bash
   PORT=3000
   CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
   CLAY_COLUMN_NAME=address
```

### ✅ CORRECT (what it should be):
```bash
PORT=3000
CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
CLAY_COLUMN_NAME=address
```

## How to Fix

1. **Open** `backend/.env` in your editor
2. **Select all** (Cmd+A or Ctrl+A)
3. **Delete all leading spaces** from the start of each line
4. **Make sure** each line starts directly with the variable name:
   - `PORT=` (not `   PORT=`)
   - `CLAY_WEBHOOK_URL=` (not `   CLAY_WEBHOOK_URL=`)
   - `CLAY_COLUMN_NAME=` (not `   CLAY_COLUMN_NAME=`)

5. **Save** the file
6. **Restart backend**:
   ```bash
   cd backend
   # Stop server (Ctrl+C)
   npm run dev
   ```

## Verify It's Fixed

After restarting, you should see in backend console:
```
🔗 Clay webhook: ✅ Configured
   Webhook URL: https://api.clay.com/v3/sources/webhook/...
   Column name: address
```

If you still see "❌ NOT SET", the .env file still has spaces!

## Test It

After fixing, test:
```bash
curl "http://localhost:3000/api/search?q=ev"
```

Should return results, not an error!

