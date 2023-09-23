# vscode配置自定义代码片段

## 第一步

点击vscode左下角的小齿轮，点击“用户代码片段”:

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202307221357684.png)



## 第二步

在搜索框输入vue，点击vue.json文件：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202307221400247.png)



## 第三步

按照其示例代码进行编写自定义的代码片段，以下为本人的vue3自定义代码片段：

```json
{
    // Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
    // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
    // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
    // same ids are connected.
    // Example:
    "Print to console": {
        // prefix代表你输入的是vue3，则会跳出提示，回车即可。
        "prefix": "vue3",
      //body表示你的自定义代码片段


        "body": [
            "<template>",
            "<div>",
            "</div>",
            "</template>",
            "",
            "<script setup lang='ts'>",
            "import { ref,reactive } from 'vue'",
            "</script>",
            "<style scoped>",
            "",
            "</style>",
        ],
        "description": "Log output to console"
    }
}
```



其余语言也可类似进行配置，可提高开发效率，减少重复代码的编写。

