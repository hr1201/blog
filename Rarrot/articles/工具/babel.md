# Babel

可以将es6语法转换成es5语法，解决旧浏览器的兼容性问题。

babel提供在线编译转码网站【https://babeljs.io/repl/】

以下仅介绍babel和babel-cli的部分内容，还有其他功能查看【[https://www.ruanyifeng.com/blog/2016/01/babel.html](https://www.ruanyifeng.com/blog/2016/01/babel.html)】

安装

```shell
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```



 ## ES2015转码规则

  ```shell
   # ES2015转码规则
  $ npm install --save-dev babel-preset-es2015
   # react转码规则
  $ npm install --save-dev babel-preset-react
   # ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
  $ npm install --save-dev babel-preset-stage-0
  $ npm install --save-dev babel-preset-stage-1
  $ npm install --save-dev babel-preset-stage-2
  $ npm install --save-dev babel-preset-stage-3
  
  ```


然后，在项目根目录下创建.babelrc，将这些规则加入.babelrc。

  ```JSON
  {
    "presets":[
      "es2015",
      "react",
      "stage-2"
    ],

    "plugins":[]
  }
  ```


以下babel工具，均需要先写好.babelrc


## 命令行转码工具babel-cli

### 安装在全局

命令：`npm install --global babel-cli`

基本用法：

```shell

# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js

# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib

# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

<br/>

### 安装在项目

安装：`npm install --save-dev babel-cli`


其次，改写package.json

```JSON
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}
```

转码执行`npm run build`



执行`babel utils.js --out-file utils2.es5.js`效果，由于Object.entries(events)不在es6和es5范围内

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308282119970.png)



在项目目录下创建babel.config.json配置文件

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}

```



运行此命令将src目录下的所有代码编译到lib目录：

`./node_modules/.bin/babel src --out-dir lib`


-----


