import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/register': {
        target: 'http://server:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/register/, ''),
      },
      '/event': {
        target: 'http://10.2.15.143:30150',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/event/, ''),
      },
    },
  },
})
