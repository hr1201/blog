<template>
    <div class="blocks">
        <div :style="blockColor" class="block">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props =defineProps({
    color: {
        type: String,
        default: 'rgba(0,0,0,0.9)'
    }
})

const blockColor = {
    backgroundColor: props.color
} 
</script>

<style scoped>
.blocks {
    display: flex;
    justify-content: center;
    align-items: center;

}

.block {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    width: 48vw;
    height: 28rem;
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126), 0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224), 0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
    /* 类似于透明度，实则是在一个元素后面区域添加图形效果(如模糊或颜色偏移) */
    /* backdrop-filter: blur(10px); */
    transition: 0.25s ease;
    /* background-color: rgba(0, 0, 0, 0.90); */

}

@media screen and (max-width: 960px) {
    .block {
        width: 80vw
    }
}
</style>