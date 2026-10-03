import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  server: {
    host: true, // listen on the LAN too, so the site can be opened from a phone
    port: Number(process.env.PORT) || 5173,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    reportCompressedSize: false,
    // read by scripts/prerender.mjs to preload each page's dictionary chunk
    manifest: true,
  },
})