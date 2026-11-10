import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// During development, calls to /api and /auth are sent to the Express server
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
  },
})
