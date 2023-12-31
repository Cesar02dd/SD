import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  proxy: {
    '/register': {
      target: 'http://server:32175',
      changeOrigin: true,
      rewrite: (path) => {
        const newPath = path.replace(/^\/register/, '');
        const fullURL = `http://server:8000${newPath}`;
        console.log('Proxying to:', fullURL);
        return newPath;
      },
    },
  },
})
