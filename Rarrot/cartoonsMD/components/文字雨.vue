<template>
    <block>
        <canvas ref="canvas"></canvas>
    </block>
</template>
  
<script setup>
import { ref, onMounted,onUnmounted } from 'vue'

// 代码雨
let canvas = ref()
let ctx
let intervalId; // 用于存储 setInterval 的返回值

// 获取画布的 2D 渲染上下文
onMounted(() => {
    ctx = canvas.value.getContext('2d')
    // 将画布的宽度和高度分别设置为屏幕的宽度和高度
    canvas.value.width = screen.availWidth;
    canvas.value.height = screen.availHeight;
    ctx.font = "25px Arial";
    let str = 'Rarrot'.split('');

    // 维护代码语的位置
    // 其长度等于屏幕宽度除以 10，向上取整到最接近的整数；对页面进行填充 0，相当于Arr列
    let Arr = Array(Math.ceil(canvas.value.width / 2)).fill(0);

    const rain = () => {
        if (!canvas.value) {
            return;
        }
        ctx.fillStyle = 'rgba(0,0,0,0.05)';//背景颜色，设置为半透明的黑色
        ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);//绘制一个覆盖整个画布的矩形
        ctx.fillStyle = '#0f0';//字体颜色为明亮的绿色

        Arr.forEach((item, index) => {
            ctx.fillText(str[Math.floor(Math.random() * str.length)], index * 10, item + 10);
            Arr[index] = item > canvas.value.height || item > 10000 * Math.random() ? 0 : item + 10
        });
    };

    intervalId = setInterval(rain, 40);
})

onUnmounted(() => {
    clearInterval(intervalId);
})
</script>
  
<style scoped>
canvas {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.90);
    transition: 0.25s ease;
}
</style>