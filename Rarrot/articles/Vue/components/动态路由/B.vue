<template>
    <div class="block">
        <p>组件B</p>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
</script>
<style lang="less" scoped>

.block{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border:1px #ccc solid;
    padding: 20vh 100px;
    margin: 15px;
    font-size: 10vw;
}
</style>