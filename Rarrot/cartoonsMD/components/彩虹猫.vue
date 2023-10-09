<template>
    <block>
        <p ref="wrap">{{ text }}</p>
    </block>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'

const text = ref('');

function setTextValue() {
    if (window.matchMedia('(max-width: 580px)').matches) {
        text.value = Array(50).fill(Math.random() * 12345 + 12000).reduce((str, item) => str + parseInt(item).toString(2), '');
    } else if(window.matchMedia('(max-width: 750px)').matches) {
        text.value = Array(50).fill(Math.random() * 1234567 + 10000).reduce((str, item) => str + parseInt(item).toString(2), '');
    }else{
        text.value = Array(50).fill(Math.random() * 123456789 + 10000).reduce((str, item) => str + parseInt(item).toString(2), '');
    }
}

onMounted(() => {
    setTextValue();
    window.addEventListener('resize', setTextValue);
});

</script>
<style scoped>
p {
    overflow: hidden;
    box-sizing: border-box;
    color: transparent;
    /* 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面,
         实现原理为背景图延伸到文字的下方，然后使用js生成01，这样就出现01在跳动的情况,
         background-clip也可以用来实现炫彩字   
      */
    height: 95%;
    background-clip: text;
    -webkit-background-clip: text;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/彩虹猫.gif);
    /* 描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合。 */
    mix-blend-mode: hard-light;
    word-break: break-all;
}

/* @media (max-width: 640px) {
    p {
        width:95%;
        height: 90%;
        transform: rotate(90deg);
    }
} */
</style>