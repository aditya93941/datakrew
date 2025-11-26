# Update Your .env File

## Current Issue

Your `.env` file has:
```
VITE_CLAY_API_URL=https://clay.com
```

This is likely **incorrect**. Based on the Loops.so pattern (`https://app.loops.so/api/v1/...`), Clay probably uses:

## Correct Configuration

Update your `frontend/.env` file to:

```bash
# Option 1: If Clay uses api.clay.com
VITE_CLAY_API_URL=https://api.clay.com
VITE_CLAY_API_KEY=c98669090aba42426415

# OR Option 2: If Clay uses app.clay.com (like Loops)
VITE_CLAY_API_URL=https://app.clay.com
VITE_CLAY_API_KEY=c98669090aba42426415
```

## How to Check

1. **Check Clay Documentation**: Go to https://clay.com/docs and find the API base URL
2. **Check Your Clay Dashboard**: Look at API settings - it might show the base URL
3. **Try Both**: Update to `https://api.clay.com` first, if that doesn't work, try `https://app.clay.com`

## After Updating

1. **Restart Dev Server**: 
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Check Console**: The console will now log the full URL being called

3. **Test Search**: Try searching and check the console output

## Current Endpoint Pattern

The code is now trying: `/api/v1/search`

So with `https://api.clay.com`, it will call:
- `https://api.clay.com/api/v1/search`

If Clay uses a different pattern, you may need to adjust the endpoint in the code.

## Debug

Check browser console (F12) - it will show:
- Base URL
- Full URL being called
- Endpoint path
- Whether API key is set

This will help identify the correct configuration!

