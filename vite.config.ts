/// <reference types="vitest" />

import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [UnoCSS()],
  test: {
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      lib: fileURLToPath(new URL('./lib', import.meta.url))
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: true,
    open: false
  }
})
