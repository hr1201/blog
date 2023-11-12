<template>
    <Button @click="reload()" hoverF="刷新" hoverS="click!"></Button>
    <!-- 展示异步组件需要使用 -->
    <Suspense :key="key">
        <!-- 在封装的axios中，会延迟两秒再显示以下默认组件 -->
        <template #default>
            <!-- 真实组件 -->
            <syncVue></syncVue>
        </template>
        <!-- 在等待期间，可以使用#fallback放置骨架屏 -->
        <template #fallback>
            <!-- 骨架屏组件 -->
            <skeleton></skeleton>
        </template>
    </Suspense>
</template>

<script setup lang='ts'>
import Button from '../../../组件库/Button.vue'
import { ref, defineAsyncComponent } from 'vue'
import skeleton from './skeleton.vue'
// 异步组件的引入需要使用defineAsyncComponent
const syncVue = defineAsyncComponent(() => import('./sync.vue'))

let key = ref(0)

const reload = () => {
  key.value++
}

</script>
<style scoped></style>
