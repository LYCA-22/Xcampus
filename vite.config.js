import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'beta.app.lyhsca.local',
    port: 3001,
  },
  plugins: [
    react(),
  ],
  define: {
    'import.meta.env.VITE_IS_BETA': JSON.stringify(process.env.VITE_IS_BETA),
  },
})