# Fixing 500 Internal Server Error

## Common Causes

### 1. .env File Has Leading Spaces ❌

**Problem**: Your `.env` file has spaces at the beginning of lines.

**Fix**: Remove ALL leading spaces from `backend/.env`

**Wrong:**
```bash
   PORT=3000
   CLAY_WEBHOOK_URL=...
```

**Correct:**
```bash
PORT=3000
CLAY_WEBHOOK_URL=...
```

### 2. Backend Not Reading .env

**Check**: Is backend server running?
```bash
cd backend
npm run dev
```

**Look for**: 
- `🔗 Clay webhook: ✅ Configured` = Good
- `🔗 Clay webhook: ❌ NOT SET` = .env not loaded

### 3. Check Backend Console

When you get a 500 error, check the **backend terminal** for error messages:

```bash
[Search] Error: ...
```

This will tell you exactly what's wrong.

## Quick Fix Steps

1. **Open** `backend/.env`
2. **Remove all spaces** at the start of each line
3. **Make sure** it looks like this:
   ```bash
   PORT=3000
   CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
   CLAY_COLUMN_NAME=address
   ```
4. **Save** the file
5. **Restart backend**:
   ```bash
   cd backend
   # Stop server (Ctrl+C)
   npm run dev
   ```

## Verify It's Fixed

After restarting, you should see in backend console:
```
🚀 Backend server running on http://localhost:3000
🔗 Clay webhook: ✅ Configured
   Webhook URL: https://api.clay.com/v3/sources/webhook/...
   Column name: address
```

Then try searching again from frontend!

## Still Getting 500?

Check backend terminal for the actual error message - it will tell you what's wrong!

