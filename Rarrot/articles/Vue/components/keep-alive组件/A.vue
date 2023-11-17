<template>
    <div class="btn-position">
        <div @click="select(item, index)" :class="active == index ? 'active' : ''" class="btn-style" v-for="(item, index) in data"
            :key="index">
            <div>{{ item.name }}</div>
        </div>
    </div>

    <keep-alive>
        <component :is="selectCpn"></component>
    </keep-alive>
</template>

<script setup lang='ts'>
import { reactive, ref, markRaw, shallowRef } from 'vue'
import table from '../table.vue'
import recursionCard from '../recursionCard.vue'

const selectCpn = shallowRef(table)

const active = ref()

const data = reactive([
    {
        name: 'table组件',
        cpn: markRaw(table)
    },
    {
        name: '按钮组件',
        cpn: markRaw(recursionCard)
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
    background-color: rgb(170, 222, 243);
}
</style>
