<template>
    <div>
        <block>
            <div class="container">
                <svg viewBox="0 0 960 300">
                    <!-- 用于存储文本路径 -->
                    <symbol id="s-text">
                        <text text-anchor="middle" x="50%" y="80%">欢迎来到Rarrot的动画库</text>
                    </symbol>

                    <!-- 使用<g>元素创建了五个文本副本，每个副本都引用<symbol>中定义的文本路径 -->
                    <g class="g-ants">
                        <use xlink:href="#s-text" class="text-copy"></use>
                        <use xlink:href="#s-text" class="text-copy"></use>
                        <use xlink:href="#s-text" class="text-copy"></use>
                        <use xlink:href="#s-text" class="text-copy"></use>
                        <use xlink:href="#s-text" class="text-copy"></use>
                    </g>
                </svg>
            </div>
        </block>
    </div>
</template>

<script setup lang='tsx'>
import { ref, reactive } from 'vue'
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat);

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    /*   border:1px solid red; */
    height: 90%;
    width: 100%;
    font-family: Arial;
}

svg {
    display: block;
    font: 5em 'Montserrat';
    margin: 0 auto;
}

/* 设置stroke-dasharray、stroke-dashoffset和animation属性，实现文本描边的动画效果 */
.text-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 5px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5s infinite linear;
}

.text-copy:nth-child(1) {
    stroke: #001088;
    animation-delay: -1;
}

.text-copy:nth-child(2) {
    stroke: #0024a5;
    animation-delay: -2s;
}

.text-copy:nth-child(3) {
    stroke: #3e52e0;
    animation-delay: -3s;
}

.text-copy:nth-child(4) {
    stroke: #3e52e0;
    animation-delay: -4s;
}

.text-copy:nth-child(5) {
    stroke: #646cff;
    animation-delay: -5s;
}

@keyframes stroke-offset {
    100% {
        stroke-dashoffset: -35%;
    }
}


/* @media (max-width: 560px) {
    svg {
        width: 65vw;
        height: 48vh;
        margin: auto 0;
        writing-mode: vertical-rl;

    }
} */
</style>