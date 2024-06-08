// vite.config.js

import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react-refresh";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    // reactRefresh(), // Plugin for hot module replacement (HMR) during development
    react(), // Plugin for handling React components and JSX
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://ecom-prod-backend-deploy.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
