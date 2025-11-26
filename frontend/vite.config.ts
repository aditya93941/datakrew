import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy API calls to backend server (only for local development)
      // In production, frontend calls backend directly via VITE_BACKEND_API_URL
      '/api': {
        target: 'https://datakrew.onrender.com',
        changeOrigin: true,
        secure: true, // For HTTPS backends
      },
    },
  },
});

