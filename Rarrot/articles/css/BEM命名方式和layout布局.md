# BEM命名方式

## BEM的介绍
BEM（Block, Element, Modifier）是一种流行的CSS命名方法，用于创建可重用的组件并减少样式冲突。在Element UI中，我们可以看到BEM命名方法的应用。

- **Block（块）**：这是一个独立的实体，它本身是有意义的。例如，`el-button`，`el`是命名空间，`button`是块名，表示一个按钮组件。

- **Element（元素）**：这是块内部的一个组成部分，它没有独立的意义，只能在某个块的上下文中使用。元素名通过双下划线与块名连接。例如，`el-menu__item`，`menu`是块名，`item`是元素名，表示菜单组件中的一个项目。

- **Modifier（修饰符）**：这是一个标志，用于创建块或元素的变体。修饰符名通过单下划线与块名或元素名连接。例如，`el-button--primary`，`button`是块名，`primary`是修饰符名，表示主要的按钮样式。

使用BEM命名方法，可以使CSS更加清晰、有组织，同时也方便团队协作和代码维护。


## 用less实现BEM命名方式

[less教程](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)

<<< ./components/useless.vue


## 用scss实现BEM命名方式

<<< ./components/bem.scss

使用方式：
```vue
<style lang=scss scoped>
@include b(block){
    color: red;
    @include e(element){
        color: blue;
    }
    @include m(modifier){
        color: green;
    }
}
</style>
```