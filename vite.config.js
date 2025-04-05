import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Crucial for Render
    port: 10000,     // Render's default port
    strictPort: true  // Don't try fallback ports
  },
  preview: {
    host: '0.0.0.0', // Also for production preview
    port: 10000,
    strictPort: true
  },
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: 'dist'
  }
})
