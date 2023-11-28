# style新特性

## :slotted
用例子来说明`:slotted`的用法，先写一个组件，里面放一个插槽：
```vue
<template>
    <div>
        <p>Rarrot</p>
    </div>
    <slot></slot>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
</script>
<style lang="less" scoped>
.a{
    color: red;
}
</style>
```

之后在父组件引用以上组件，并在插槽中定义一些内容：
```vue
<template>
    <A>
        <p class="a">Rarrot2</p>
    </A>
</template>

<script setup lang='ts'>
</script>
<style scoped>
</style>
```

如果想要使用子组件定义的样式`a`，直接在子组件定义`a`样式，是没有效果的，需要添加上`:slotted`才会有效：
```vue
<style lang="less" scoped>
:slotted(.a){
    color: red;
}
</style>
```

## :global
当style标签中有`scoped`时，会给样式添加上专有的hash值，使其只作用于此组件，当需要定义全局的样式时，直接将`scoped`去掉有些不妥，这时候可以使用`:global`，示例：
```vue
<template>
    <A>
        <p class="a">Rarrot2</p>
    </A>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import A from './A.vue'

let color = ref('red')

let size=ref({
    fontSize:'20px'
})
</script>
<style scoped>
:global(.a) {
    /* 可以直接在style中使用v-bind动态的定义样式值 */
    color: v-bind(color);
    font-size: v-bind('size.fontSize');
}
</style>
```


