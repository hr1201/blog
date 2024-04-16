# 了解CJS和ESM的不同
首先说说两者的共同点，两者都是模块化开发，模块化可以帮助开发者在不影响全局命名空间的前提下管理代码，便于协作、功能分离、代码复用和依赖管理。

## CommonJS（CJS）
`CommonJS`主要被用于**服务端**中，使用`require`加载模块，再用`module.exports`或`exports`暴露为模块，而这个过程是同步加载的，在服务端中问题不大，因为文件大多数是在本地的，但是到了浏览器环境中，用**同步**的方式去加载模块就会导致阻塞卡顿。
```js
// 在`webpack.config.js`中配置模式，入口文件，输出文件，模板文件等
const { Configuration } = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 采用注解的方式引入代码提示
 * @type {Configuration}
 */
const config = {
    mode: "development",
    entry: './src/main.ts',
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './pubilc/index.html'
        })
    ]
}

module.exports = config
```

## ECMAScript Module（ESM）
`ECMAScript Module`是现代`JavaScript`的官方标准模块化系统,**提供用异步**的方式（不是无条件异步，当代码中包含顶级 await 时才会异步）去加载模块，但是不能在运行时动态地加载或创建模块，也就是静态的；ESM使用`import`导入模块，用`export`去导出模块：
```js
// 导入Vue计算属性和侦听器
import { watch, computed  } from 'vue';

// axios导出接口
export const loginh = (adminname: string, adminpsw: string) => {
  return http.post(urls + '/admin/login', { adminname: adminname, adminpsw: adminpsw });
};
```

