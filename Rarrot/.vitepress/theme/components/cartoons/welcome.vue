<template>
    <div>
        <block color="black">
            <div class="container">
                <svg viewBox="0 0 960 300">
                    <symbol id="s-text">
                        <text text-anchor="middle" x="50%" y="80%">欢迎来到Rarrot的动画库</text>
                    </symbol>

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

<script setup lang='ts'>
import { ref, reactive } from 'vue'
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat);

.container {
    display: flex;
    /*   border:1px solid red; */
    height: 100%;
    width: 100%;
    align-items: center;
    font-family: Arial;

}

svg {
    display: block;
    font: 5em 'Montserrat';
    width: 47vw;
    height: 65vh;
    margin: 0 auto;
}

.text-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 5px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5s infinite linear;
}

.text-copy:nth-child(1) {
    stroke: #4D163D;
    animation-delay: -1;
}

.text-copy:nth-child(2) {
    stroke: #840037;
    animation-delay: -2s;
}

.text-copy:nth-child(3) {
    stroke: #BD0034;
    animation-delay: -3s;
}

.text-copy:nth-child(4) {
    stroke: #BD0034;
    animation-delay: -4s;
}

.text-copy:nth-child(5) {
    stroke: #FDB731;
    animation-delay: -5s;
}

@keyframes stroke-offset {
    100% {
        stroke-dashoffset: -35%;
    }
}

@media screen and (max-width: 960px) {
    svg{
        width: 69vw;
    }
}
</style>