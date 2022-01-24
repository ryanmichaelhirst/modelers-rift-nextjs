import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import reactSvg from 'vite-plugin-react-svg'

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/output/**', '**/input/**'],
    },
    fs: {
      allow: ['client', 'node_modules', 'graphql'],
    },
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  plugins: [react(), reactSvg()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './client/src/components'),
      '@assets': path.resolve(__dirname, './client/src/assets'),
      '@hooks': path.resolve(__dirname, './client/src/hooks'),
      '@store': path.resolve(__dirname, './client/src/store'),
      '@customtypes': path.resolve(__dirname, './client/src/types'),
    },
  },
})
