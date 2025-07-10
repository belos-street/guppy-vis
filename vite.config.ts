import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [UnoCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      lib: fileURLToPath(new URL('./lib', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
})
