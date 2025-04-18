import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 10000,
    strictPort: true
  },
  preview: {
    host: '0.0.0.0',
    port: 10000,
    strictPort: true,
    allowedHosts: [
      'chatbot-frontend-de18.onrender.com', // Your Render URL
      'localhost' // For local testing
    ]
  },
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: 'dist'
  }
})
