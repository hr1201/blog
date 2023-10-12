<template>
    <div>
        <!-- 使用v-if组件会直接销毁，而v-show则是隐藏 -->
        <life v-if="station"/>
        <!-- 用来销毁life组件，使onBeforeUnmount和onUnmounted被调用 -->
        <Button @click="station=!station" hoverF="销毁" hoverS="click!" />
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import Button from '../../组件库/Button.vue'
import life from './life.vue'

const station=ref<boolean>(true)
</script>
<style scoped></style>