<template>
    <div>
        <p>你好</p>
        <div ref="div">{{ str }}</div>
        <button @click="change">我要被改啦</button>
        <iframe src="https://codesandbox.io/embed/pedantic-villani-li2uw?fontsize=14&amp;hidenavigation=1&amp;theme=light"
            style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="Vue Example1"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
    </div>
</template>

<script setup lang='ts'>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';

// import { ref } from 'vue'
// 在使用options API时是没有beforeCreate和created这两个生命周期的
// setup语法糖模式是没有beforeCreate和created这两个生命周期的
console.log('setup')

const str = ref<string>('Rarrot')
const div = ref<HTMLDivElement>()
const change = () => {
    str.value = "我被修改了"
}

// 组件第一次渲染前调用，此时根元素不存在，无法访问到DOM
onBeforeMount(() => {
    console.log("组件第一次渲染前调用", div.value)//undefined
})

// 组件第一次渲染后调用，该元素现在可用，允许直接DOM访问
onMounted(() => {
    console.log("组件第一次渲染后调用", div.value)//<div>Rarrot</div>
})

// 更新时
onBeforeUpdate(() => {
    console.log("更新时")
})

// 更新后
onUpdated(() => {
    console.log("更新后")
})

// 销毁组件之前调用
onBeforeUnmount(() => {
    console.log("销毁组件之前调用")
})

// 销毁组件之后调用
onUnmounted(() => {
    console.log("销毁组件之后调用")
})
</script>
<style scoped></style>