# 记录开发grapesjs编辑器的问题

## 关于将多个同一组件拖动到画布时，改变其样式，多个同一组件会同时改变

最常见的图片拖动改变大小时同时变化案例解决：

原因：在定义图片时，一般是扩展官方的`image`，之所以会同时改变，是因为我们给官方`image`组件加了class类，失去了其默认的id，此id的值为一个哈希值，用于标识唯一。

解决方式：那就不能用class类去修改`image`组件，但是可以使用父级元素，再加`img元素`来修改样式，例如：
```css
.father img{
  max-width: 150px;
  max-height: 150px;
}
```

## 在画布上删除组件后，发现仍然有多余的元素在

原因：`多个div`的宽高一样，在画布上重合，导致光标放过去的时候不是到的最顶层的`div`，解决方法：

① 需要在自定义组件时考虑是否有定义了不必要的`div`；

② 也可以将div的宽高设置为不同，使得光标可以获取到`div`；

③ 或者在编辑器的`Open Layer Manager`上去删除组件，如图：
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202407072119864.png)

## 导出样式混乱

大概率是因为自定义组件时，在自定义组件的`attributes`属性中设置`style`样式，这样是没办法导出的，需要换成`class`类来定义样式，例如：
```js
{
  tagName: "ul",
  attributes: { style: 'margin: 50px;' }, // [!code error]
  components: [
    {
      tagName: "li",
      components: [{ type: idListLink, components: "你好" }],
    },
    {
      tagName: "li",
      components: [{ type: idListLink, components: "Rarrot" }],
    },
  ],
},

// 正确
{
  tagName: "ul",
  attributes: { class: 'ulStyle' }, // [!code warning]
  components: [
    {
      tagName: "li",
      components: [{ type: idListLink, components: "你好" }],
    },
    {
      tagName: "li",
      components: [{ type: idListLink, components: "Rarrot" }],
    },
  ],
},
```

还有一种可能是在class类中使用伪类元素时也会无法导出，可以直接在html标签上去定义内联样式进行解决。

## 其他
遇到自定义组件问题时的思考过程：由于做的是低代码平台，可以将自定义组件拖动到画布上，再查看导出的代码有什么问题，比对一下哪里没有达到自己想要的效果；还可以打印出来数据，在开发者模式的控制台查看是否有问题。


<!-- 可以自定义列表前面的小圆点，多列；（已解决，开启`droppable`即可拖动图片至任意位置）图列表混排可以自定义图片的位置 -->

还需要：明天需要搞清楚什么样的情况下blocks块会在gjs中（已知），在grapesjsService.js中，注释以下组件就会出现在原本的blocks Management中：
```js
// 区块管理器(组件存放区域)
// blockManager: {
//     // 绑定id对应的组件/标签
//     appendTo: `#${blocks}`,
// }
```

梳理一下全屏时的逻辑：一开始blocks在左侧，当我全屏时，左侧的移除，右侧的显示；当缩小时，右侧的消失，左侧的显示
已做的尝试，界面结构如下：
```html
<el-row style="border: 1px solid rgb(15, 22, 66); border-radius: 10px">
  <el-col class="blocks" style="height: 100vh" :span="3">
    <div id="blocks"></div>
  </el-col>
  <el-col class="gjs" :span="21">
    <div id="gjs"></div>
  </el-col>
</el-row>
```
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202407100946555.png)

全屏时将`editor.BlockManager.getConfig().appendTo`赋值为`null`，这样blocks管理器就会回到右侧；全屏左侧会默认关闭；
```js
// 全屏时应触发的事件
fullscreen(editor, blocks) {
  editor.on("command:run:before:fullscreen", () => {
    editor.BlockManager.getConfig().appendTo = null;
  });
  editor.on("command:stop:before:fullscreen", () => {
    editor.BlockManager.getConfig().appendTo = "#" + blocks;
    console.log(editor.BlockManager.getConfig().appendTo)
  });
},
```

缩小时的尝试：
1. 将`editor.BlockManager.getConfig().appendTo`赋值为`blocks`，控制台能打印出值，但是页面没有反应，并且是在`nextTick`情况下进行的，得出响应式有问题;
   
2. 之后将`<div id="blocks"></div>`改为`<div :id="blocks"></div>`，将id用动态赋值，并且进行监听，如下：
```js
// 监听blocks数据的变化
this.$watch('blocks', (newVal, oldVal) => {
  if (newVal === 'blocks') {
    // 当blocks的值改变时，动态更新appendTo
    editor.BlockManager.getConfig().appendTo = "#" + blocks;
  }
});
```
逻辑上存在问题，当blocks修改为`"blocks"`时，将`editor.BlockManager.getConfig().appendTo`赋值为`blocks`，仍然不行；

3. 再考虑到可能是赋值完没有进行页面的刷新，虽然这样能回到原本的页面，但是对用户并不友好，并且刷新有可能导致数据的丢失：
```js
// 监听blocks数据的变化
this.$watch('blocks', () => {
  // 当blocks的值改变时，刷新页面
  window.location.reload();
});
```

4. 那么可以使用新增组件的key值来局部刷新，在el-row上添加一个`:key="componentKey"`，然后在监听到blocks值变为`"blocks"`时，对key值新增1，就会使组件强制重新渲染<el-row\>，尝试后缩小时blocks管理器仍然在右边，而不会出现在左边；

5. 在全屏时使用浅拷贝`<el-col class="blocks">`元素，之后缩小时将其放到el-row下，现在缩小时可以出现在左侧，但是将块拖动到画布时没有反应；
```js
// 全屏时应触发的事件
fullscreen(editor, blocks) {
  editor.on("command:run:before:fullscreen", () => {
    this.removeBlocksColumn();
    editor.BlockManager.getConfig().appendTo = null;
    // this.openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
    // this.openBlocksBtn && openBlocksBtn.set('active', 1);
  });
  editor.on("command:stop:fullscreen", () => {
    this.createBlocks();
    editor.BlockManager.getConfig().appendTo = "#" + blocks;
    // this.openBlocksBtn = editor.Panels.removeButton("views","open-blocks");
    console.log(editor.BlockManager.getConfig().appendTo)
  });
},

// 动态的构建blocks
createBlocks() {
  const elRow = document.querySelector(".el-row");
  console.log(this.elCol);
  // 将 el-col 插入到 el-row 中
  elRow.insertBefore(this.elCol, elRow.firstChild);
},
// 移除 el-col 元素
removeBlocksColumn() {
  let elColTemp = document.querySelector(".el-col.blocks");
  if (elColTemp) {
    this.elCol = elColTemp.cloneNode(true); // 保存元素的克隆
    elColTemp.remove();
  }
},
```

6. 在官方文档上找到`blockManager.render()`函数，可以渲染所有的块，尝试如下：

编写时还遇到的问题：由于设定external为true，这样就能构建两个blocks管理器在页面上，但是在全屏时选中了blocks管理器，那么在缩小时只会删除到Panels上的blocks管理器按钮，而删除不到其blocks块，blocks块仍然保留在页面上，这时候就可以在删除blocks管理器按钮前选中其余的按钮，这样blocks块就不会保留在页面上了

```js
// 全屏时应触发的事件
fullscreen(editor) {
  editor.on("command:run:before:fullscreen", () => {
    // 移除块的显示，转移到右侧
    editor.BlockManager.getConfig().appendTo = null;
    
    editor.Panels.addButton("views", {
      id: "open-blocks",
      className: "fa fa-th-large",
      command: "open-blocks",
      attributes: { title: "Open Blocks" },
    });
  });
  // 触发以下事件后，Panels按钮的blocks会消失
  editor.on("command:stop:before:fullscreen", () => {
    // 删除Panels按钮后，需要选中其余的按钮
    editor.Panels.getButton("views","open-sm").set("active", true);
    // 调用后会删除Panels按钮
    editor.Panels.removeButton("views","open-blocks");
    // 调用后会渲染左侧的blocks，右侧的就会消失，原因是没有设置external属性为true
    this.createBlocks();
  });
},
// 动态的构建blocks
createBlocks() {
    this.editor.BlockManager.getConfig().appendTo = "#blocks"
    const blocks = this.editor.BlockManager.getAll();
    const newBlocksEl = this.editor.BlockManager.render(blocks.models,{ external: true });
    document.getElementById('blocks').appendChild(newBlocksEl);
},

// 预览时应触发的事件
preview(editor) {
  let blocks = document.querySelector(".blocks");
  let gjs = document.querySelector(".gjs");
  editor.on("command:run:before:preview", () => {
    blocks.style.display = "none";
    gjs.classList.remove("el-col-21");
  });
  editor.on("command:stop:before:preview", () => {
    blocks.style.display = "block";
    gjs.classList.add("el-col-21");
  });
},
```

由于页面的`gjs-`数据一直保存在`localstorage`中，再次打开会导致跟上一次生成的代码重叠，导致导出的代码不对，所以需要将每个不同的官网根据不同id添加到数据库中，但是实时自动保存可能导致卡顿，所以可以添加个保存按钮：
1. 用户自己 `ctrl+s` 保存
2. 用户设置自动保存
  

## 组件的组合
用`editor.components`添加一组`addType`

使用同一组属性多次重用同一组件

idBurgerMenu中有idBurgerMenuLine，idBurgerMenuLine是一个css写的展开图标，也就是当缩小到一定宽度时，就会使用idBurgerMenu

idNavMenu中有三个idNavMenuLink，

idContainer中左边是一个默认的link，中间是idBurgerMenu，右边是idNavMenu，含有三个idNavMenuLink。

所以当第一个addType仅添加idContainer即可。