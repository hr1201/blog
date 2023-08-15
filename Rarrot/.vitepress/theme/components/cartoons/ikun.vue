<template>
    <block>
        <div class="ikun">
            <img id="cxk" class="cxk" src="https://aikun.one/api/file/0420b310-ec66-43b3-b00e-3058ff6bb35c" alt="">
            <img id="basketballs" class="basketball" src="https://gcubot.cn/wp-content/uploads/2023/07/basketball.png"
                alt="">
        </div>
    </block>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
</script>
<style scoped>
.ikun {
    width: 200px;
    height: 200px;
    display: flex;
}

.cxk {
    margin-bottom: 10px;
    position: relative;
    top: 5%;
    left: 30%;
    width: 120px;
    height: 200px;
}

.basketball {
    position: relative;
    left: 15%;
    top: 14%;
    width: 45px;
    height: 45px;
    transform-origin: center bottom;
}

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
</style>