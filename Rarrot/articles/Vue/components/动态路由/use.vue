<template>
    <div class="btn-position">
        <div @click="select(item, index)" :class="active == index ? 'active' : ''" class="btn-style" v-for="(item, index) in data"
            :key="index">
            <div>{{ item.name }}</div>
        </div>
    </div>

    <component :is="selectCpn"></component>
</template>

<script setup lang='ts'>
import { reactive, ref, markRaw, shallowRef } from 'vue'
import A from './A.vue'
import B from './B.vue'
import C from './C.vue'

const selectCpn = shallowRef(A)

const active = ref()

const data = reactive([
    {
        name: '组件A',
        cpn: markRaw(A)
    },
    {
        name: '组件B',
        cpn: markRaw(B)
    },
    {
        name: '组件C',
        cpn: markRaw(C)
    },

])

active.value = 0

const select = (item: any, index: any) => {
    active.value = index
    selectCpn.value = item.cpn
}
</script>
<style scoped>
.btn-position {
    display: flex;
}

.btn-style {
    border: 1px #000 solid;
    margin: 15px;
    padding: 8px 10px;

}

/* 点击按钮后的背景颜色改变 */
.active {
    background-color: rgb(206, 236, 248);
}
</style>
