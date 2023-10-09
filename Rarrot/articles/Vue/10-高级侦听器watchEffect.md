# 高级侦听器watchEffect
`watchEffect` 是 Vue 3 中的一个响应式依赖跟踪函数，它会自动跟踪其内部使用的响应式数据，并在这些数据发生变化时重新执行。

`watchEffect` 与 `watch` 类似，但它不需要指定侦听的数据源，因为它会**自动**检测依赖。

<!-- <<< ./components/watchEffect.vue -->

## 示例
```vue
<template>
    <div>
        <input class="inp" v-model="message" type="text">
    </div>

    <button @click="stop">停止监听stop</button>
</template>

<script setup lang='ts'>
import { ref, watchEffect } from 'vue'

let message = ref<string>('rarrot')

const stop = watchEffect((oninvalidate) => {
    let inp = document.querySelector('.inp') as HTMLInputElement
    // 可以获取到元素
    console.log("🚀  inp", inp)

    // watchEffect是非惰性的，这里使用了message就会直接去监听message
    console.log("🚀  message", message.value)
    oninvalidate(() => {
        console.log('before')
    })
}, {
    // pre 组件更新前执行
    // sync 强制效果始终同步触发
    // post 组件更新后执行
    flush: 'post',
    // 可以用来debugger
    // onTrigger(e) {
    //     debugger
    // }
})

</script>
<style scoped></style>
```


### 测试
<watchEffect />

<script setup>
import watchEffect from './components/watchEffect.vue'

</script>