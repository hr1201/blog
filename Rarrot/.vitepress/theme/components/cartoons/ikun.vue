<template>
    <block color="rgba(256,256,256,0.1)">
        <div class="ikun">
            <img @click="bounceAnimation" ref="basketball" class="basketball" src="../images/basketball.png" alt="basketball">
        </div>
    </block>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'

const basketball = ref();

const bounceAnimation = () => {
    basketball.value.style.animation = 'bounce 0.5s forwards';
    setTimeout(() => {
        if (basketball.value.style.animation != '') {
            basketball.value.style.animation = ''
        }
    }, 500)

}

</script>

<!-- 注意这里没有添加scoped。原因为添加之后，会自动分配一个哈希值，动画也会添加一个哈希值，这样在点击时会获取不到动画 -->
<style>
.ikun {
    width: 100%;
    height: 100%;
    display: flex;
    background-image: url(../images/ikun.svg);
    background-repeat: repeat-x;
    background-position: center;
}

.basketball {
    position: relative;
    left: 52%;
    top: 28%;
    width: 45px;
    height: 45px;
    transform-origin: center bottom;
}

/* .basketball ::v-deep {
    animation: bounce 0.5s forwards;
} */
@keyframes bounce {

    from,
    20%,
    53%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        transform: translate3d(45px, -45px, 10px) scaleY(1.1);
    }

    70% {
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        transform: translate3d(0, -5px, 10px) scaleY(1.05);
    }

    80% {
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transform: translate3d(0, 0, 0) scaleY(0.95);
    }

    90% {
        transform: translate3d(0, -4px, 0) scaleY(1.02);
    }
}

@media screen and (max-width: 640px) {
    .basketball {
        left: 53%;
    }
}

@media screen and (max-width: 430px) {
    .basketball {
        left: 55%;
    }
}
</style>