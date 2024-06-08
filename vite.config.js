import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-icons']
    }},
  server: {
    proxy: {
      '/api': {
        target: 'https://ecom-prod-backend-deploy.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
