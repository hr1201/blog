// vite.config.js
import { readFileSync } from 'fs';

export default {
  plugins: [
    {
      name: 'watch-vue-files',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.md')) {
          console.log(`Vue file updated: ${file}`);
          // 执行自定义行为...
        }
      }
    }
  ]
}