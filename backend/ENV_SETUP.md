# Backend .env File Setup

## Create `backend/.env` File

Create a file named `.env` in the `backend/` folder with these exact variable names:

## Required Variables

```bash
PORT=3000
CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
CLAY_COLUMN_NAME=address
```

## Variable Names Explained

### 1. `PORT` (Optional)
- **What it is**: Server port number
- **Default**: 3000 (if not set)
- **Example**: `PORT=3000`

### 2. `CLAY_WEBHOOK_URL` (Required)
- **What it is**: Your Clay webhook endpoint URL
- **Where to get it**: Clay dashboard → Your Table → Webhooks
- **Format**: `https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-<YOUR-ID>`
- **Example**: `CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4`
- **Important**: Replace `<YOUR-ID>` with your actual webhook ID

### 3. `CLAY_COLUMN_NAME` (Required)
- **What it is**: The column name in your Clay table where search queries will be stored
- **How to find it**: Check your Clay table columns
- **Common options**:
  - `address` - If your table has an "address" column
  - `email` - If using email column
  - `query` - If you have a "query" column
  - `search_term` - If you have a "search_term" column
  - `name` - If using name column
- **Example**: `CLAY_COLUMN_NAME=address`

## Complete Example

Your `backend/.env` file should look like this:

```bash
PORT=3000
CLAY_WEBHOOK_URL=https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-28318a43-ab1a-4180-83f0-20fcc6b5f0c4
CLAY_COLUMN_NAME=address
```

## How to Create It

1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

2. **Create .env file**:
   ```bash
   # On Mac/Linux
   touch .env
   
   # Or just create it in your editor
   ```

3. **Add the variables** (copy the example above and replace with your values)

4. **Save the file**

## Important Notes

- ✅ Variable names are **case-sensitive** - use exactly as shown
- ✅ No spaces around the `=` sign
- ✅ No quotes needed (unless the value has spaces)
- ✅ Replace the webhook URL with YOUR actual URL from Clay
- ✅ Replace column name with YOUR actual column name from Clay table

## Test It

After creating `.env`, start the backend:

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:3000
🔗 Clay webhook: ✅ Configured
   Webhook URL: https://api.clay.com/v3/sources/webhook/...
   Column name: address
```

If you see "❌ NOT SET", check your `.env` file variable names!

