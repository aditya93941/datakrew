#!/bin/bash

echo "🧪 Testing Backend Flow"
echo "========================"
echo ""

echo "1️⃣  Testing search (first time - should be empty)..."
curl -s "http://localhost:3000/api/search?q=laptop" | jq '.' || curl -s "http://localhost:3000/api/search?q=laptop"
echo ""
echo ""

echo "2️⃣  Simulating Clay sending enriched data to /api/clay-data..."
curl -X POST http://localhost:3000/api/clay-data \
  -H "Content-Type: application/json" \
  -d '{
    "address": "laptop",
    "company_name": "Dell Technologies",
    "domain": "dell.com",
    "website": "https://www.dell.com",
    "enriched_address": "Round Rock, Texas, USA"
  }'
echo ""
echo ""

echo "3️⃣  Testing search again (should return cached results)..."
curl -s "http://localhost:3000/api/search?q=laptop" | jq '.' || curl -s "http://localhost:3000/api/search?q=laptop"
echo ""
echo ""

echo "✅ Test complete! If you see cached results in step 3, your backend is working!"

