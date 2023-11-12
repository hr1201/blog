import { SearchPlugin } from 'vitepress-plugin-search'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { vitepressPlugin } from 'vite-plugin-vitepress';

export default defineConfig({
  plugins: [
    SearchPlugin({
      encode: false,
      tokenize: 'full',
      placeholder: '搜索内容',
      buttonLabel: '搜索',
      previewLength: 10,
    }), vue(), vitepressPlugin()
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
    port: 5175
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
})