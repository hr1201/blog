<template>
    <div>
        <p style="color:#22863a">cpnSon组件：</p>

        我是儿子，我爹给我取名为: {{ name }}，年龄为 {{ age }}

        <br/>
        获取爹的名字：<Button @click="send" hoverF="回答" hoverS="click!"></Button>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Button from '../../组件库/Button.vue'
import { number } from 'echarts';

// 子组件接收父组件传过来的值
// 1.
//  const props=defineProps<{
//     name:string,
//     age:number
// }>()
// 接收默认值，当父组件没有传age时，age为6
// withDefaults(defineProps<{
//     name: string,
//     age: number
// }>(), {
//     age: () => 6
// })

// 2.
const props=defineProps({
    name:{
        type:String,
        default:'默认值'
    },
    age:{
        type:Number,
        default:6
    }
})

// console.log(props.namSe)


// 1.子组件传值给父组件
// const emit = defineEmits(['on-click'])

// 2.用ts方式
const emit = defineEmits<{
    (e: 'on-clicks', name: string): void
}>()

const send = () => {
    emit('on-clicks', '爸爸的名字是：Rarrot')
}

defineExpose({
    sex:'男'    
})
</script>
<style scoped></style>