# Alternatives to ngrok for Local Development

## The Problem

You need a public URL so Clay can POST to your local backend at `http://localhost:3000/api/clay-data`.

## Option 1: Fix ngrok (Recommended)

### Check if ngrok needs authentication:

```bash
# Check ngrok status
ngrok config check

# If not authenticated, sign up at https://ngrok.com
# Then add your authtoken:
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### Then run:

```bash
ngrok http 3000
```

This gives you a URL like: `https://abc123.ngrok.io`

Use this in Clay: `https://abc123.ngrok.io/api/clay-data`

## Option 2: Use localtunnel (No Signup Required)

### Install:

```bash
npm install -g localtunnel
```

### Run:

```bash
lt --port 3000
```

This gives you a URL like: `https://abc123.loca.lt`

Use this in Clay: `https://abc123.loca.lt/api/clay-data`

**Note**: localtunnel URLs are less stable than ngrok, but work without signup.

## Option 3: Use cloudflared (Cloudflare Tunnel)

### Install:

```bash
# On Mac with Homebrew
brew install cloudflare/cloudflare/cloudflared

# Or download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
```

### Run:

```bash
cloudflared tunnel --url http://localhost:3000
```

This gives you a URL like: `https://abc123.trycloudflare.com`

Use this in Clay: `https://abc123.trycloudflare.com/api/clay-data`

## Option 4: Deploy to Production (Best for Testing)

Instead of local development, deploy your backend:

### Vercel (Easiest):

1. Install Vercel CLI: `npm i -g vercel`
2. In `backend/` folder: `vercel`
3. Get your URL: `https://your-backend.vercel.app`
4. Use in Clay: `https://your-backend.vercel.app/api/clay-data`

### Render:

1. Create account at https://render.com
2. Create new Web Service
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Get your URL: `https://your-backend.onrender.com`
7. Use in Clay: `https://your-backend.onrender.com/api/clay-data`

## Option 5: Use webhook.site for Testing

For quick testing, you can use webhook.site to see what Clay sends:

1. Go to https://webhook.site
2. Copy the unique URL
3. Use that URL in Clay HTTP API action
4. See the data Clay sends in real-time

Then manually copy the data to test your backend endpoint.

## Quick Test Without Public URL

If you just want to test the backend logic:

1. Use Postman or curl to manually POST to `/api/clay-data`:

```bash
curl -X POST http://localhost:3000/api/clay-data \
  -H "Content-Type: application/json" \
  -d '{
    "address": "laptop",
    "company_name": "Dell Technologies",
    "domain": "dell.com",
    "website": "https://www.dell.com"
  }'
```

2. Then search again: `GET /api/search?q=laptop`
3. Should return cached results!

## Recommended Approach

For **local development**: Use **localtunnel** (easiest, no signup)

For **production/demo**: Deploy to **Vercel** or **Render** (free tier available)

## Troubleshooting ngrok

If ngrok keeps getting killed:

```bash
# Check if ngrok process is running
ps aux | grep ngrok

# Kill any stuck processes
pkill ngrok

# Try running with verbose output
ngrok http 3000 --log=stdout
```

If you see authentication errors:
- Sign up at https://ngrok.com (free)
- Get your authtoken from dashboard
- Run: `ngrok config add-authtoken YOUR_TOKEN`

