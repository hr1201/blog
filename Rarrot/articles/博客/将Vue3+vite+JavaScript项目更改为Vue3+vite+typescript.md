# 将Vitepress+Vite+JavaScript项目更改为Vitepress+vite+typescript

1. 安装TypeScript和相关依赖：
```shell
pnpm install typescript ts-loader
```
<br/>

2. 在项目根目录下创建一个`tsconfig.json`文件，添加基本的TypeScript配置：
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ]
    },
    "lib": [
      "esnext",
      "dom"
    ]
  },
  "include": [
    "Rarrot/.vitepress/**/*.ts",
    "Rarrot/.vitepress/**/*.tsx",
    "Rarrot/.vitepress/**/*.vue",
    "Rarrot/.vitepress/sidebarAuto.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
::: warning 注意
"include"中的值为你需要进行编译的文件，如果"include"和"exclude"路径没有正确匹配到项目中的TypeScript文件,则会报错配置文件找不到任何输入。
:::

<br/>

3. 将项目中的`.js`文件更改为`.ts`文件，也需要更改`.vue`文件中script标签为`<script setup lang="ts">`，并根据需要更新代码以满足TypeScript的类型要求；也可以为文件添加[声明文件](../typescript/19-声明文件d.ts.html)。

<br/>

4. 在Vite配置文件（例如`vite.config.js`）中，添加对TypeScript的支持：
```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vitepressPlugin } from 'vite-plugin-vitepress';

export default defineConfig({
  plugins: [vue(), vitepressPlugin()],
  resolve: {
    alias: {
      '~': '/src'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});
```
<br/>

5. 更新Vitepress配置文件（例如`.vitepress/config.js`），将其中的JavaScript导入更改为TypeScript导入。
