# 异步组件&代码分包&suspense

## 为什么使用异步组件？

在Web开发中，我们通常希望尽可能减小应用的加载时间。一个有效的方法是**代码分割（code-splitting）**，即将应用划分为多个小的**代码块（或称为包）**，只有当需要时才加载特定的代码块。这样可以显著提高应用的**首次加载速度**。

当我们在Vue项目中使用import引入组件时，无论组件是否被使用，它们都会被打包到一个主包（main bundle）中。这可能导致主包体积过大，影响应用的加载性能。这种情况下，我们可以考虑使用**异步组件（Async Component）**。


## 异步组件的使用

异步组件将某个组件的代码分割到一个单独的包中。当这个组件被实际需要（例如被渲染）时，Vue会自动加载这个组件的代码。这样，我们可以将不常用的组件代码从主包中分离出去，从而减小主包的体积。


Vue还提供了一个名为`<suspense>`的特殊组件，用于处理异步组件的加载状态。
1. 当异步组件正在加载时，`<suspense>`会渲染它的`fallback`插槽；
2. 当异步组件加载完成时，`<suspense>`会渲染它的`default`默认插槽。
   
这使得我们可以轻松地为异步组件添加加载指示器，例如：骨架屏等。

```vue
<template>
    <!-- <uses></uses> -->
    <!-- 展示异步组件需要使用 -->
    <Suspense>
        <!-- 在封装的axios中，会延迟两秒再显示以下默认组件 -->
        <template #default>
            <!-- 真实组件 -->
            <syncVue></syncVue>
        </template>
        <!-- 在等待期间，可以使用#fallback放置骨架屏 -->
        <template #fallback>
            <!-- 骨架屏组件 -->
            <skeleton></skeleton>
        </template>
    </Suspense>
</template>

<script setup lang='ts'>
import { ref, reactive, watch, defineAsyncComponent } from 'vue'
import skeleton from './components/骨架屏/skeleton.vue'
// 异步组件的引入需要使用defineAsyncComponent
const syncVue = defineAsyncComponent(() => import('./components/骨架屏/sync.vue'))

</script>
<style scoped></style>
```

在这个例子中，`syncVue.vue`的代码会被分割到一个单独的包中。当`syncVue组件`被实际需要时，Vue会自动加载这个包。

## 示例：

<uses />

<script setup lang='ts'>
import uses from './components/骨架屏/use.vue'
</script>
