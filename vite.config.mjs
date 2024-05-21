import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { vitepressPlugin } from 'vite-plugin-vitepress';

export default defineConfig({
  base:'./',
  plugins: [
    vue(), 
    vitepressPlugin(),
  ],
  resolve: {
    alias: {
      '~': '/src'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 600, // 代码块超过600KB即提示，设置为 600 KB
  },
  server: {
    port: 5175,
    host: 'localhost',
    hmr: true
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
})