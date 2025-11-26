// Quick script to check if .env is being read
require('dotenv').config();

console.log('\n=== Environment Variables Check ===\n');
console.log('PORT:', process.env.PORT || 'NOT SET (will use 3000)');
console.log('CLAY_WEBHOOK_URL:', process.env.CLAY_WEBHOOK_URL || 'NOT SET ❌');
console.log('CLAY_COLUMN_NAME:', process.env.CLAY_COLUMN_NAME || 'NOT SET (will use "address")');
console.log('\n=== Raw Values ===\n');
console.log('CLAY_WEBHOOK_URL length:', process.env.CLAY_WEBHOOK_URL?.length || 0);
console.log('CLAY_WEBHOOK_URL first 50 chars:', process.env.CLAY_WEBHOOK_URL?.substring(0, 50) || 'N/A');
console.log('\n=== Fix ===\n');
if (!process.env.CLAY_WEBHOOK_URL) {
  console.log('❌ CLAY_WEBHOOK_URL is NOT set!');
  console.log('Check your backend/.env file:');
  console.log('1. Make sure file exists: backend/.env');
  console.log('2. Make sure NO spaces at start of lines');
  console.log('3. Should be: CLAY_WEBHOOK_URL=https://...');
  console.log('4. NOT:    CLAY_WEBHOOK_URL=https://... (with spaces)');
} else {
  console.log('✅ CLAY_WEBHOOK_URL is set!');
}

