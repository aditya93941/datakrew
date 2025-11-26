# Troubleshooting 500 Error

## Common Causes

### 1. Backend Not Running
**Check**: Is the backend server running?
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:3000
```

### 2. .env File Issues

**Check your `.env` file format:**

❌ **WRONG** (has spaces):
```bash
   CLAY_WEBHOOK_URL=https://...
```

✅ **CORRECT** (no spaces):
```bash
CLAY_WEBHOOK_URL=https://...
```

**Common mistakes:**
- Spaces before variable name
- Missing quotes (if URL has special chars)
- Wrong variable name (case-sensitive)

### 3. Check Backend Console

When you make a search request, check the backend terminal for errors:

```
[Search] Query received: "ev companies"
[Search] Error sending to Clay webhook: ...
```

### 4. Test Backend Directly

Test if backend is working:
```bash
curl http://localhost:3000/health
```

Should return:
```json
{"status":"ok","timestamp":"..."}
```

### 5. Check .env File Location

Make sure `.env` is in the `backend/` folder, not root:
```
clay/
└── backend/
    ├── .env          ← HERE
    ├── server.js
    └── package.json
```

### 6. Restart Backend After .env Changes

After editing `.env`, restart the backend:
```bash
# Stop backend (Ctrl+C)
# Then restart:
npm run dev
```

## Debug Steps

1. **Check backend is running**: `curl http://localhost:3000/health`
2. **Check .env format**: No spaces, correct variable names
3. **Check backend console**: Look for error messages
4. **Test webhook URL**: Try the curl command from Clay docs
5. **Restart backend**: After any .env changes

## Quick Fix Checklist

- [ ] Backend server is running
- [ ] `.env` file is in `backend/` folder
- [ ] No spaces before variable names in `.env`
- [ ] `CLAY_WEBHOOK_URL` is set correctly
- [ ] `CLAY_COLUMN_NAME` is set correctly
- [ ] Backend restarted after .env changes
- [ ] Check backend console for error details

