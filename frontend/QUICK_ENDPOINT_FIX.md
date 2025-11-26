# Quick Fix for 404 Error

## The Issue

Clay API is returning 404, which means the endpoint path is wrong.

## Quick Fix

The code is currently trying `/search`. Try these alternatives:

### Option 1: Edit the endpoint directly

In `frontend/src/pages/search/index.tsx`, find line ~62:

```typescript
const endpoint = '/search'; // Change this
```

Try these one by one:
- `/search` (current)
- `/v1/search`
- `/companies/search`
- `/api/v1/search`
- `/v2/search`

### Option 2: Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Try a search
4. Look for: "Calling Clay API:" - this shows the exact URL

### Option 3: Check Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Try a search
4. Find the failed request (red)
5. Check the "Request URL" - this is what was called
6. Check the "Response" tab - might have hints from Clay

## Most Likely Solutions

Based on common API patterns, try:

1. **`/v1/search`** - Most common versioned endpoint
2. **`/companies/search`** - Resource-based endpoint
3. **`/api/v1/search`** - Full API path

## Need the Exact Endpoint?

Check Clay's documentation:
- https://clay.com/docs
- Look for "API Reference"
- Find "Search" or "Company Search" endpoint

Once you know the correct endpoint, just update line 62 in the search file!

