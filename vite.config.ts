import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Ensure dev server serves index.html for client-side routes like /products/:id
  appType: 'spa',
   server: {
    host: true,          // allows mobile access
    port: 5173,
    strictPort: true
  },
})
