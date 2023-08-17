<template>
    <block color="" class="block">
        <div class="ui-content">
            <div class="water water1"></div>
            <div class="water water2"></div>
            <div class="water water3"></div>
            <div class="water water4"></div>
            <div class="water water5"></div>
            <div class="water water6"></div>
        </div>
    </block>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted } from 'vue'

let mx: number, my: number, z: number = 0;
let uiContent: HTMLElement | null;

function _water(i: number, j: number, k: number) {
    const waterPosition = document.createElement('div');

    waterPosition.className = 'water-position water' + k;
    waterPosition.style.cssText = 'z-index:' + k + ';top:' + j + 'px;left:' + i + 'px;';
    waterPosition.style.position = 'absolute';

    for (let n = 6; n >= 1; n--) {
        const water = document.createElement('div');
        water.className = 'water water' + n;
        waterPosition.appendChild(water);
    }

    if (uiContent) {
        uiContent.insertBefore(waterPosition, uiContent.firstChild);
    }

    setTimeout(() => {
        waterPosition.remove();
    }, 1500);
}

function handleClick(e: MouseEvent) {
    mx = e.pageX;
    my = e.pageY;
    z = z + 1;
    _water(mx, my, z);
}

onMounted(() => {
    uiContent = document.querySelector('.ui-content');
    document.addEventListener('click', handleClick);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClick);
});
</script>
<style scoped>
.block {
    background-image: url(images/forget.jpg);
    background-attachment: fixed;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.water {
    position: absolute;
    /* calc可以自动计算出圆心位置，相当方便，注意+-前后需要有空格 */
    top: calc((100% - 20px)/2);
    left: calc((100% - 20px)/2);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-image: url(images/forget.jpg);
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 50vw 65vh;

}

.water1 {
    z-index: 2;
    background-size: 100% 106%;
    -webkit-animation: w 1s forwards;
}

.water2 {
    z-index: 3;
    background-size: 100% 102%;
    -webkit-animation: w 1s .2s forwards;
}

.water3 {
    z-index: 4;
    background-size: 100% 104%;
    -webkit-animation: w 1s .4s forwards;
}

.water4 {
    z-index: 5;
    background-size: 100% 101%;
    -webkit-animation: w 1s .5s forwards;
}

.water5 {
    z-index: 6;
    background-size: 100% 102%;
    -webkit-animation: w 1s .8s forwards;
}

.water6 {
    z-index: 7;
    background-size: 100% 100%;
    -webkit-animation: w 1s 1s forwards;
}

@-webkit-keyframes w {
    0% {
        top: calc((100% - 20px)/2);
        left: calc((100% - 20px)/2);
        width: 20px;
        height: 20px;
    }

    100% {
        top: calc((100% - 200px)/2);
        left: calc((100% - 200px)/2);
        width: 10vw;
        height: 10vw;
    }
}

@media screen and (max-width: 960px) {
    .block {
        width: 80vw
    }
}
</style>