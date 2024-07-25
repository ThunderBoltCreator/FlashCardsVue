import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import svg from '@neodx/svg/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    svg({
      fileName: '{name}.{hash:8}.svg',
      metadata: {
        path: 'src/shared/ui/icon/sprite.gen.ts',
        runtime: {
          size: true,
          viewBox: true
        }
      },
      output: 'public/sprites',
      root: 'src/shared/ui/assets'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
