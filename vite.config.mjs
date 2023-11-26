import { SearchPlugin } from 'vitepress-plugin-search'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { vitepressPlugin } from 'vite-plugin-vitepress';

// 创建自定义插件
const watchFileChangesPlugin = () => {
  return {
    name: "VitePluginAutoSidebar",
    configureServer: ({ watcher, restart }) => {
      const fsWatcher = watcher.add("*.md");
      console.log('=================>修改'+fsWatcher)
      fsWatcher.on("all", (event, filePath) => {
        if (event === "addDir") return;
        if (event === "unlinkDir") return;
        if (event == "add") return;
        if (event === "unlink") {
          restart();
          return;
        }
        if (event === "change") {
          const title = matchTitle(filePath);
          const route = getRoute(opts.root, filePath);
          if (!route || !title) return;
          // 未更新 title
          if (title === titleCache[route]) return;
          restart();
          return;
        }
      });
    },
  };
};

export default defineConfig({
  plugins: [
    SearchPlugin({
      encode: false,
      tokenize: 'full',
      placeholder: '搜索内容',
      buttonLabel: '搜索',
      previewLength: 10,
    }), 
    vue(), 
    vitepressPlugin(),
    watchFileChangesPlugin()
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