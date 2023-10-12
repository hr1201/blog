<template>
    <div>
        <div ref="div" style="font-size: 20px;font-weight: 600;color: #ecc208;">{{ str }}</div>
        <Button @click="change" hoverF="修改" hoverS="click!" />
    </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, onRenderTracked, onRenderTriggered } from 'vue';
import Button from '../../组件库/Button.vue'

// import { ref } from 'vue'
// 在使用options API时是没有beforeCreate和created这两个生命周期的
// setup语法糖模式是没有beforeCreate和created这两个生命周期的
console.log('setup')

const str = ref<string>('Rarrot')
const div = ref<HTMLDivElement>()
const change = () => {
    str.value = "我被修改了"
}
// 通过getCurrentInstance查看当前组件的实例，也是一个hook
const instance=getCurrentInstance()
console.log("🚀  instance", instance)

// 组件第一次渲染前调用，此时根元素不存在，无法访问到DOM
onBeforeMount(() => {
    console.log("组件第一次渲染前调用", div.value)//undefined
})

// 组件第一次渲染后调用，该元素现在可用，允许直接DOM访问
onMounted(() => {
    console.log("组件第一次渲染后调用", div.value)//<div>Rarrot</div>
})

// 获取更新之前的dom
onBeforeUpdate(() => {
    console.log("更新前")
})

// 获取更新之后的dom
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

// 以下两个钩子主要用于调试，onRenderTracked用来获取收集的依赖
onRenderTracked((e) => {
    // 打印effect等对象
    console.log(e)
})

// 依赖被修改时则会调用此钩子
onRenderTriggered((e) => {
    console.log(e)
})
</script>
<style scoped></style>