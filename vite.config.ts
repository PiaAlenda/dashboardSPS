import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5176,
    proxy: {
      '/api/v1': {
        target: 'https://transitoytransporte.sanjuan.gob.ar',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
