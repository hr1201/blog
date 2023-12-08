# webpack构建Vue3

1. 利用`npm init -y`创建`package.json`
   
2. 用`tsc --init`创建`tsconfig.json`
   
3. 此时创建文件使得目录结构为：
```txt
|-- webpack-demo,
    |-- package.json,
    |-- pnpm-lock.yaml,
    |-- tsconfig.json,
    |-- webpack.config.js,
    |-- pubilc,
    |   |-- index.html,
    |-- src,
        |-- App.vue,
        |-- main.ts,
        |-- assets,
        |-- views,
```

4. 使用webpack还需要配置`webpack`和`webpack-cli`，用以下两条命令：
```shell
pnpm add webpack

pnpm add webpack-cli
```

5. 安装启动服务`pnpm add webpack-dev-server`

6. 安装html模板`pnpm add html-webpack-plugin`

7. 在`webpack.config.js`中配置模式，入口文件，输出文件，模板文件等，配置如下：
```js
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

8. 用`pnpm add vue`安装vue

9. 在入口文件`main.ts`中将app挂载至vue中，需要在`index.html`中先定义一个div元素，例如：
::: code-group
```html [index.html]
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack-demo</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```
```ts [main.ts]
import { createApp } from 'vue';
import App from './App.vue'

createApp(App).mount('#app')
```
:::

10. 此时还不能识别`<template>`标签，需要安装`vue-loader`和`@vue/compiler-sfc`来解析vue，运用以下命令：
```shell
pnpm add vue-loader

pnpm add @vue/compiler-sfc
```

11.  安装`clean-webpack-plugin`，使其在重新打包的时候清空dist，并修改配置文件`webpack.config.js`如下：
```js
const { Configuration } = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
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
    module:{
        rules:[
            {
                test: /\.vue$/, //解析vue 模板
                use: "vue-loader"
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './pubilc/index.html'
        }),
        new CleanWebpackPlugin(), //打包清空dist
        new VueLoaderPlugin(), //解析vue
    ]
}

module.exports = config
```

12. 初始化`App.vue`，可以进行 `pnpm run dev` 或 `pnpm run build`进行测试：
```vue
<template>
    <div>
        hello
        {{ Rarrot }}
    </div>
</template>

<script setup>
import { ref } from 'vue'
const Rarrot='nihao'
</script>
<style scoped>

</style>
```

13. 此时项目还不能解析css文件的样式属性，需要安装`css-loader`和`style-loader`，跟vue-loader一样要在配置文件`webpack.config.js`中进行配置：
```js
... 
rules: [
    {
        test: /\.vue$/, //解析vue 模板
        use: "vue-loader"
    },
    {
        test: /\.css$/, //解析css
        use: ["style-loader", "css-loader"],
    },
]
...
```

14. 要使其可以识别ts，需要安装`typescript`和`ts-loader`，并在配置文件`webpack.config.js`中进行配置：
```js
... 
rules: [    
    ...
    {
        test: /\.ts$/,  //解析ts
        loader: "ts-loader",
        options: {
            configFile: path.resolve(process.cwd(), 'tsconfig.json'),
            appendTsSuffixTo: [/\.vue$/]
        },
    }

]
...
```
