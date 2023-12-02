# markdown扩展

:::tip 提示
此文章翻译自[官方文档的Markdown扩展](https://vitepress.dev/guide/markdown#table-of-contents)。

翻译时[官方文档的Markdown扩展](https://vitepress.dev/guide/markdown#table-of-contents)的更新时间是`2023/12/2 00:44`。
:::


VitePress 带有内置的 Markdown 扩展。

## 标题锚点

标题自动应用锚链接。可以使用 `markdown.anchor` 选项配置锚点的渲染。

### 自定义锚

要为标题指定自定义锚点标记而不是使用自动生成的锚点标记，请为标题添加后缀：

``` md
# 自动生成的锚点标记 {#自定义锚点标记}
```

这允许你链接到 `#自定义锚点标记` ，而不是默认标题 `#自动生成的锚点标记`。

## 链接

内部和外部链接都得到特殊处理。

### 内部链接

内部链接转换为路由器链接，用于 SPA 导航。此外，每个子目录中包含的每个 `index.md` 内容都将自动转换为 `index.html` ，并带有相应的 URL `/` 。

例如，给定以下目录结构：

```md
.
├─ index.md
├─ foo
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ index.md
   ├─ three.md
   └─ four.md
```

并为您提供 `foo/one.md`：

```md
[Home](/) <!-- 将用户发送到根index.md -->
[foo](/foo/) <!-- 将用户发送到目录foo的index.html -->
[foo heading](./#heading) <!-- 将用户锚定到foo索引文件中的标题 -->
[bar - three](../bar/three) <!-- 你可以省略扩展名 -->
[bar - three](../bar/three.md) <!-- 你可以添加 .md -->
[bar - four](../bar/four.html) <!-- 或者添加 .html -->
```

### 页面后缀

默认情况下，生成的 `.html` 页面和内部链接带有后缀。

### 外部链接

出站链接自动获取 `target="_blank" rel="noreferrer"`：

- [vuejs.org](https://vuejs.org)
- [GitHub 上的 VitePress](https://github.com/vuejs/vitepress)

## Frontmatter

[YAML Frontmatter](https://jekyllrb.com/docs/front-matter/)支持开箱即用：

```yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

此数据将可用于页面的其余部分，以及所有自定义和主题化组件。

有关详细信息，请参见[Frontmatter](https://vitepress.dev/reference/frontmatter-config)。

## GitHub 风格的表格

**输入**

```md
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**输出**

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## 表情符号:tada:

**输入**

``` md
:tada: :100:
```

**输出**

:tada: :100:

所有[表情符号列表](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)都可用。

## 目录

**输入**

```
[[toc]]
```

**输出**

[[toc]]

可以使用 `markdown.toc` 选项配置目录的渲染。

## 自定义容器

自定义容器可以按其类型、标题和内容进行定义。

### 默认标题

**输入**

```md
::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险的警告。
:::

::: details
这是一个详细信息块。
:::
```

**输出**

::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险的警告。
:::

::: details
这是一个详细信息块。
:::

### 自定义标题

你可以通过在容器的“类型”后面附加文本来设置自定义标题。

**输入**

````md
::: danger STOP
危险区域，不要继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::
````

**输出**

::: danger STOP
危险区域，不要继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::

此外，你可以通过在站点配置中添加以下内容来全局设置自定义标题，如果不是用英语编写，这很有帮助：

```ts
// config.ts
export default defineConfig({
  // ...
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
  // ...
})
```

###  `raw`

这是一个特殊的容器，可用于防止与 VitePress 发生样式和路由器冲突。这在记录组件库时特别有用。你可能也想检查一下[whyframe](https://whyframe.dev/docs/integrations/vitepress)来获得更好的隔离。

**语法**

```md
::: raw
Wraps in a <div class="vp-raw">
:::
```

 `vp-raw` 类也可以直接在元素上使用。样式隔离目前是可选的：

- 使用包管理器进行安装 `postcss`：

  ```sh
  $ npm add -D postcss
  ```

- 创建名为 `docs/postcss.config.mjs` 的文件，并将以下内容添加到其中：

  ```js
  import { postcssIsolateStyles } from 'vitepress'
  
  export default {
    plugins: [postcssIsolateStyles()]
  }
  ```

  它在hood下使用 [ `postcss-prefix-selector`](https://github.com/postcss/postcss-load-config)。你可以像这样传递它的选项：

  ```js
  postcssIsolateStyles({
    includeFiles: [/vp-doc\.css/] // defaults to /base\.css/
  })
  ```

## 代码块中的语法突出显示

VitePress 使用[Shikiji](https://github.com/antfu/shikiji)的（[Shiki](https://shiki.matsu.io/)改进版本）在 Markdown 代码块中用彩色文本突出显示语言的语法。Shiki 支持多种编程语言。你只需将有效的语言别名附加到代码块的开头反引号：

**输入**

````
```js
export default {
  name: 'MyComponent',
  // ...
}
```
````

````
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
````

**输出**

```js
export default {
  name: 'MyComponent'
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

Shikiji的存储库中提供了[有效语言列表](https://github.com/antfu/shikiji/blob/main/docs/languages.md)。

你还可以在应用程序配置中自定义语法突出显示主题。请查看 [ `markdown`](https://vitepress.dev/reference/site-config#markdown) 选项了解更多详情。

## 代码块中的行突出显示

**输入**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除单行外，你还可以指定多行、范围或两者：

- 范围行：例如 `{5-8}`， `{3-10}`， `{10-17}`
- 多行：例如 `{4,7,9}`
- 单行和范围行：例如 `{4,7-13,16,23-27,40}`

**输入**

````
```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```
````

**输出**

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

或者，可以使用 `// [!code hightlight]` 注释直接在行中突出显示。

**输入**

````
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [！code highlight]
    }
  }
}
```
````

**输出**

```js
export default {
  data() {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```

## 代码块中的焦点

在行上添加 `// [!code focus]` 注释将使其聚焦，并模糊代码的其他部分。

此外，还可以使用 `// [!code focus:<lines>]` 定义多条要聚焦的行。

**输入**

````
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [！code focus]
    }
  }
}
```
````

**输出**

```js
export default {
  data() {
    return {
      msg: 'Focused!'// [!code focus]
    }
  }
}
```

## 代码块中的彩色差异

在行上添加 `// [!code --]` 或 `// [!code ++]` 注释将创建该行的差异，同时保留代码块的颜色。

**输入**

````
```js
export default {
  data () {
    return {
      msg: 'Removed' // [！code --]
      msg: 'Added' // [！code ++]
    }
  }
}
```
````

**输出**

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## 代码块中的错误和警告

在行上添加 `// [!code warning]` 或 `// [!code error]` 注释将相应地对其进行着色。

**输入**

````
```js
export default {
  data () {
    return {
      msg: 'Error', // [！code error]
      msg: 'Warning' // [！code warning]
    }
  }
}
```
````

**输出**

```js
export default {
  data() {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```

## 行号

你可以通过 config 为每个代码块启用行号：

```js
export default {
  markdown: {
    lineNumbers: true
  }
}
```

请查看  [`markdown`](https://vitepress.dev/reference/site-config#markdown)[options](https://vitepress.dev/reference/site-config#markdown)了解更多详情。

你可以在隔离代码块中添加 `:line-numbers`/ `:no-line-numbers` 标记以覆盖 config 中设置的值。

你还可以通过在后面 `:line-numbers` 添加 `=` 来自定义起始行号。例如， `:line-numbers=2` 表示代码块中的行号将从 `2` 开始。

**输入**

````md
```ts {1}
// 默认情况行号禁用，由于我在配置文件修改了默认情况，所以还是有行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// 启用行号并从2开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```
````

**输出**

```ts {1}
// 默认情况行号禁用
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// 启用行号并从2开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

## 导入代码段

你可以通过以下语法从现有文件导入代码段：

:::tip 提示
`<<<`后面没有空格，以下只是为了方便演示
:::

```md
<<< @/filepath
```

它还支持[行突出显示](#代码块中的行突出显示)：

```md
<<< @/filepath{highlightLines}
```

**输入**

```md
<<< ./components/snippets/snippet.js{2}
```

**代码文件**

<<<./components/snippets/snippet.js

**输出**

<<<./components/snippets/snippet.js

:::tip 提示

值 `@` 对应于源根目录。默认情况下，它是 VitePress 项目根目录，除非 `srcDir` 已配置。或者，也可以从相对路径导入：

```md
<<< ../snippets/snippet.js
```

:::

也可以使用[VS Code区域](https://code.visualstudio.com/docs/editor/codebasics#_folding)仅包含代码文件的相应部分。你可以在文件路径之后用 `#` 提供自定义区域名称：

**输入**

```md
<<< ./components/snippets/snippet-with-region.js#snippet{1}
```

**代码文件**

<<<./components/snippets/snippet-with-region.js

**输出**

<<<./components/snippets/snippet-with-region.js#snippet{1}

你还可以在大括号（ `{}`）内指定语言，如下所示：

```md
<<< ./components/snippets/snippet.cs{c#}

<!-- with line highlighting: -->

<<< ./components/snippets/snippet.cs{1,2,4-6 c#}

<!-- with line numbers: -->

<<< ./components/snippets/snippet.cs{1,2,4-6 c#:line-numbers}
```

对于无法从文件扩展名中推断出源语言很有帮助。

## 代码组

你可以像这样对多个代码块进行分组：

**输入**

````md
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::
````

**输出**

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```
:::


你还可以在代码组中[导入代码段](#导入代码段)：

**输入**

```md
::: code-group

<!-- 默认情况下，文件名用作标题 -->

<<< ./components/snippets/snippet.js

<!-- 你也可以提供一个定制的 -->

<<< ./components/snippets/snippet-with-region.js#snippet{1,2 ts:line-numbers} [带突出显示的snippet.js]

:::
```

**输出**

::: code-group

<<<./components/snippets/snippet.js

<<<./components/snippets/snippet-with-region.js#snippet{1,2 ts:line-numbers}[带突出显示的snippet.js]

:::

## Markdown 文件包含

你可以将 Markdown 文件包含在另一个 Markdown 文件中，甚至嵌套。

::: tip 提示
你还可以在 Markdown 路径 `@` 前加上前缀，它将充当源根目录。默认情况下，它是 VitePress 项目根目录，除非 `srcDir` 已配置。
:::

例如，你可以使用以下命令包含相对应的 Markdown 文件：

**输入**

```md
# Docs

## Basics

<!--@ include: ./components/snippets/basics.md-->
```

**另一个文件**(`./components/snippets/basics.md`) 

```md
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**等效代码**

```md
# Docs

## Basics

<!--@include: ./components/snippets/basics.md-->
```

它还支持选择行范围：

**输入**

```md
# Docs

## Basics

<!--@ include: ./components/snippets/basics.md{3,}-->
```

**另一个文件**(`./components/snippets/basics.md`) 

```md
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**等效代码**

```md
# Docs

## Basics

<!--@include: ./components/snippets/basics.md{3,}-->
```

所选行范围的格式可以是： `{3,}`， `{,10}`， `{1,10}`

:::warning 警告
请注意，如果您的文件不存在，这不会引发错误。因此，使用此功能时，请确保内容按预期呈现。
:::

## 数学方程式

目前，这是选择加入的。要启用它，你需要安装 `markdown-it-mathjax3` 并在配置文件中设置 `markdown.math` 为 `true`：

```sh
npm add -D markdown-it-mathjax3
```

```ts
// .vitepress/config.ts
export default {
  markdown: {
    math: true
  }
}
```


**输入**

```md
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**麦克斯韦方程:**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |
```

**输出**

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**麦克斯韦方程:**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |

## 高级配置

VitePress[Markdown-it](https://github.com/markdown-it/markdown-it)用作 Markdown 渲染器。上面的许多扩展都是通过自定义插件实现的。你可以使用中的 `markdown` `.vitepress/config.js` 选项进一步自定义 `markdown-it` 实例：

```js
import { defineConfig } from 'vitepress'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItFoo from 'markdown-it-foo'

export default defineConfig({
  markdown: {
    // options for markdown-it-anchor
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    anchor: {
      permalink: markdownItAnchor.permalink.headerLink()
    },

    // options for @mdit-vue/plugin-toc
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    toc: { level: [1, 2] },

    config: (md) => {
      // use more markdown-it plugins!
      md.use(markdownItFoo)
    }
  }
})
```

请参阅中[配置参考：应用配置](https://vitepress.dev/reference/site-config#markdown)的可配置属性的完整列表。
