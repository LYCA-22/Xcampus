import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'beta.app.lyhsca.local',
    port: 3001,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        "short_name": "LYHS+",
        "name": "LYHS+",
        "icons": [
          {
            "src": "/applogo.png",
            "sizes": "500x500",
            "type": "image/png"
          },
          {
            "src": "/applogo.png",
            "sizes": "192x192",
            "type": "image/png"
          }
        ],
        "start_url": "/",
        "display": "fullscreen",
        "theme_color": "#ffffff",
        "background_color": "#ffffff"
      },
      workbox: {
        globPatterns: [
          '**/*.{js,jsx,css,html,ico,png,svg,jpg,jpeg,json,woff,woff2,ttf,eot}',
          'assets/**'
        ]
      }
    })
  ],
  define: {
    'import.meta.env.VITE_IS_BETA': JSON.stringify(process.env.VITE_IS_BETA),
  },
})