import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    allowedHosts: ['linawa-frontend.onrender.com'],
    host:'0.0.0.0',
    port: process.env.PORT || 5173,  // Use the PORT environment variable, fallback to 5173 for local development
    strictPort: true,  // Ensure that the port is strictly followed (don't fall back to a different port)
  }
})
