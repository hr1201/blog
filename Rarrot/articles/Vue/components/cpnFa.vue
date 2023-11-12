<template>
    <div>
        <p style="color:#22863a">cpnFa组件：</p>
        我是爹
        获取孩子的性别：<Button @click="getSonSex" hoverF="获取" hoverS="性别"></Button>

        <!-- 可以试一下不传age，会发现输出age为默认值6 -->
        <son ref="cpnSonp" @on-clicks="getName" :age=10 name="rarrot" />
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import son from './cpnSon.vue'
import Button from '../../组件库/Button.vue'

const getName = (name: string) => {
    console.log(name+'，ok')
}

// 获取子组件的引用
const cpnSonp = ref<InstanceType<typeof son>>()

const getSonSex=()=>{
    // 获取子组件暴露出来的属性
    console.log('孩子的性别是' + cpnSonp.value?.sex)
}

onMounted(()=>{
    getSonSex()
})

</script>
<style scoped></style>