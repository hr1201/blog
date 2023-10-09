<template>
    <barchat :yAxisData="yAxisData" :seriesData="seriesData" />
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import barchat from './BarChart.vue';
import { ElMessage } from 'element-plus'

// 柱状图的yAxis数据
let yAxisData = ref<string[]>([]);

// 柱状图的series数据
let seriesData = ref<number[]>([]);

// 获取数据
async function getNum(): Promise<void> {
    try {
        const response = await fetch('/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        data.forEach((value: { username: string; compliance: string; duration: number }) => {
            yAxisData.value?.push(value.username);
            seriesData.value?.push(value.duration);
        });
    } catch (error) {
        ElMessage.error('获取用户数量失败');
    }
}

// 初始化用户数量
getNum()
</script>
<style scoped></style>