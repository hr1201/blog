<template>
    <div class="inputStyle">
        <!-- 需要用.stop阻止冒泡事件 -->
        <div @click.stop="clickInput(cardData, $event)" v-for="cardData in data">
            <input v-model="cardData.checked" type="checkbox"><span>{{ cardData.index }}</span>
            <rarrot style="margin-left: 10px;" v-if="cardData?.children?.length" :data="cardData.children">
            </rarrot>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
interface cardType {
    index: string,
    checked: boolean,
    children?: cardType[]
}

defineProps<{
    data?: cardType[]
}>()

// 如果需要修改递归组件的名，可以使用以下方式：
defineOptions({
    name: 'rarrot'
})

const clickInput = (cardData: cardType, e: { target: any; }) => {
    console.log("🚀  cardData", cardData, e.target)
}
</script>

<style lang="less" scoped>
.inputStyle {
    border: none
}
</style>