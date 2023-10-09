<template>
    <div class="home-position">
        <div class="description">
            <p>你好啊</p>
        </div>
        <div class="img">
            <img src="/rabbit.png" alt="rabbit">
        </div>
    </div>
    
</template>

<script setup lang='ts'>
import { ref } from 'vue'
</script>
<style lang="less" scoped>
.home-position {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    // background-color: #8cacb3;
    .description {

    }

    .img {
        width: 40%;

        img {
            display: flex;
            justify-content: flex-end;
            // width: 500px;
        }
        // mix-blend-mode:soft-light;
    }

}
</style>