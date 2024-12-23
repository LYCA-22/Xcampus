import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { execSync } from 'child_process'
import fs from 'fs'

// 取得 Git hash
const getGitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'unknown'
  }
}

// 讀取 package.json
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

// 更新環境變數
const buildTime = new Date().toISOString()
const gitHash = getGitHash()

// 寫入 .env
fs.writeFileSync('.env', `
  VITE_APP_VERSION=${pkg.version}
  VITE_BUILD_TIME=${buildTime}
  VITE_GIT_HASH=${gitHash}
`)

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
        enabled: true,
      },
      manifest: {
        short_name: 'LYHS+',
        name: 'LYHS+',
        orientation: "portrait",
        orientation_lock: "portrait",
        icons: [
          {
            src: '/applogo.png',
            sizes: '500x500',
            type: 'image/png',
          },
          {
            src: '/applogo.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
        start_url: '/',
        display: 'fullscreen',
        theme_color: '#ffffff',
        background_color: '#ffffff',
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // 設置為 6MB
        globPatterns: [
          '**/*.{js,jsx,css,html,ico,png,svg,jpg,jpeg,json}',
          'assets/**',
        ],
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:js|css|html|png|jpg|jpeg|svg|ico|json)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 天
              },
            },
          },
          {
            urlPattern: /.*\.(?:woff2?|ttf|eot)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 天
              },
            },
          },
          {
            urlPattern: ({ url }) => url.origin !== self.location.origin,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'external-resources',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 天
              },
            },
          },
        ],
      },
    }),
  ],
  define: {
    'import.meta.env.VITE_IS_BETA': JSON.stringify(process.env.VITE_IS_BETA),
  },
  buildBase: {
    buildId: `${pkg.version}_${gitHash}`
  },
});