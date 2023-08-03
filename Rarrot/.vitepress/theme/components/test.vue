<template>
    <div>
        {{ rorrot }}
    </div>
    <button @click="change">修改</button>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

const rorrot=ref({name:'rorrot'})

const change=()=>{
    rorrot.value.name='rarrot'
}

</script>
<style scoped></style>