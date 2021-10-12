import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/src/index.html'),
      },
    },
  },
  server: {
    fs: {
      allow: ['client', 'node_modules'],
    },
  },
  plugins: [react()],
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
