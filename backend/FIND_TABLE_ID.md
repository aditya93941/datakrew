# How to Find Your Clay Table ID

## Why You Need It

The `CLAY_TABLE_ID` is required to query your Clay table and get real search results. Without it, searches will return empty results.

## Method 1: From Table URL

1. **Go to your Clay table** in the dashboard
2. **Look at the browser URL**
3. The URL will look like:
   ```
   https://clay.com/tables/YOUR_TABLE_ID
   ```
4. **Copy the table ID** from the URL

## Method 2: From Table Settings

1. **Open your Clay table**
2. **Click on table name** or **Settings** (gear icon)
3. **Go to "API" or "Integrations"** section
4. **Find "Table ID"** - it should be displayed there
5. **Copy the table ID**

## Method 3: From API Documentation

1. **Go to Clay dashboard**
2. **Navigate to your table**
3. **Check the API documentation** or **API tab**
4. **Table ID** should be listed there

## Example Table ID Format

Table IDs are usually long strings like:
- `abc123def456ghi789`
- `tbl_abc123def456`
- `28318a43-ab1a-4180-83f0-20fcc6b5f0c4`

## Add to .env

Once you have the table ID, add it to `backend/.env`:

```bash
CLAY_TABLE_ID=your_actual_table_id_here
```

## Verify It Works

After adding `CLAY_TABLE_ID` and `CLAY_API_KEY`:

1. **Restart backend**: `npm run dev`
2. **Check console** - should show: `📊 Clay table ID: ✅ Configured`
3. **Try a search** - should return real results from your Clay table

## Still Can't Find It?

- Check Clay's documentation: https://docs.clay.com
- Contact Clay support
- The table ID might be in the webhook URL structure (though it's usually different)

