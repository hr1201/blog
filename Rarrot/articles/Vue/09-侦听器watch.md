# 侦听器watch

侦听器用于观察和响应 Vue 实例上的数据变化，当侦听的数据源发生变化时，侦听器会执行一个回调函数。

侦听器适合用来处理需要在数据发生变化时执行异步操作或较复杂逻辑的场景，例如：数据验证、向服务器发送请求等。



## 基本用法
```Vue{20,27,36,52,66,67}
<template>
<div>
    rarrot：<input v-model="message1" type="text">
    <hr>
    rorrot：<input v-model="message2" type="text">
    <hr>
    666：<input v-model="message3" type="text">
    <hr>
    age：<input v-model="message4.foo.bar.age" type="text">
    <hr>
    like：<input v-model="message5.foo.bar.like" type="text">
    <hr>
    career：<input v-model="message5.foo.bar.career" type="text">
</div>
</template>

<script setup lang='ts'>
import { ref,reactive, watch } from 'vue'

// 1. 对单变量进行侦听
let message1=ref<string>('rarrot')
watch([message1],(newval,oldval)=>{
    // 输出新值和旧值
    console.log(newval,oldval)
})

// 2. 对多变量进行侦听
let message2=ref<string>('rorrot')

let message3=ref<string>('666')

watch([message2,message3],(newval,oldval)=>{
    console.log(newval,oldval)
})

// 3. 对深层次对象进行侦听,需要开启watch的第三个属性deep进行深度监听
//    但是仍然会出现一个问题，新newval旧oldval的值一样
let message4=ref({
    foo:{
        bar:{
            age:66,
        }
    }
})

watch(message4,(newval,oldval)=>{
    console.log(newval,oldval)
},{
    deep:true
})

// 4. 侦听reactive数据，不用添加第三个属性deep也可以进行深度监听
let message5=reactive({
    foo:{
        bar:{
            like:'ping-pong',
            career:'quanduan'
        }
    }
})

// watch(message5,(newval,oldval)=>{
//     console.log(newval,oldval)
// })

// 5. 侦听reactive的单一属性
// 6. 侦听ref的单一属性时，需要用message5.value去获取值
watch(()=>message5.foo.bar.career,(newval,oldval)=>{
    console.log(newval,'oldval '+oldval)
},{
    //用于在执行之前先处理一次,以上这段会先输出quanduan oldval undefined
    immediate:true,
    // pre 组件更新之前调用  sync 同步执行  post 组件更新之后执行
    flush:"pre"

})
</script>
<style scoped></style>
```

<br/>

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309122123111.png)

<br/>

