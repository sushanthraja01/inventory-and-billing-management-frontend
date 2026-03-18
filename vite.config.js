import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://inventory-management-and-billing-system-12oh.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
