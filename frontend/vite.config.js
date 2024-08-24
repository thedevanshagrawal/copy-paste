import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // '/users': 'http://localhost:5000/api/v1'
      '/users': 'https://copypastebackend.vercel.app/api/v1'
    }
  },
  plugins: [react()],
})
