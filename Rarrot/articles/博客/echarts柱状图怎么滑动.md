# echarts柱状图怎么滑动


在写一个管理后台时，首页需要一个柱状图，可以统计组员的打卡时长以及排名，考虑到组员人数多，所以就使用了可滑动的竖形柱状图。

## 实现滑动
实现滑动的代码在图表配置option中，如下：

```typescript
dataZoom: [
    {
      type: "inside", // 滚轮缩放
      startValue: 0,
      endValue: 8,
      minValueSpan: 6,
      maxValueSpan: 6,
      yAxisIndex: [0],
      zoomOnMouseWheel: false,  // 关闭滚轮缩放
      moveOnMouseWheel: true, // 开启滚轮平移
      moveOnMouseMove: true  // 鼠标移动能触发数据窗口平移
    },
    {
      type: 'slider', // 滑动条
      realtime: true,
      startValue: 0,
      endValue: 8,
      width: '3.5',
      height: '80%',
      yAxisIndex: [0], // 控制y轴滚动
      fillerColor: "rgba(154, 181, 215, 1)", // 滚动条颜色
      borderColor: "rgba(17, 100, 210, 0.12)",
      backgroundColor: '#cfcfcf',//两边未选中的滑动条区域的颜色
      handleSize: 0, // 两边手柄尺寸
      showDataShadow: false,//是否显示数据阴影 默认auto
      showDetail: false, // 拖拽时是否展示滚动条两侧的文字   
      top: '10%',
      right: '5',
    }
],
```


## 完整代码
1. **导入依赖和类型定义**：将竖形柱状图封装为一个组件，使用局部引入 ECharts 相关的库和类型。
2. **图表配置**：`option` 对象包含了 ECharts 图表的配置选项，如标题、提示框、网格、坐标轴、数据缩放和系列等。
3. **图表实例化**：先对`seriesData`数据进行降序排列，之后mychart 引用用于存储图表的 DOM 元素。watch 函数监听 `props` 的变化，当属性发生变化时，初始化图表并调用 `pageUpdate` 函数。
4. **图表更新**：`pageUpdate` 函数负责更新图表的配置选项，并添加一个事件监听器，用于在窗口大小改变时调整图表尺寸。
5. **使用此组件**：只需要在父组件传入`yAxisData`（y轴数据）和`seriesData`（x轴数据）到子组件即可，具体可查看以下的Barchart组件使用：

### Barchart组件的使用
::: details 展开代码
```Vue
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
```
:::

data.json数据
```JSON
[
    {
        "id": 129,
        "username": "Rarrot",
        "duration": 29.75
    },
]
```

### Barchart组件代码
::: details 展开代码
```Vue
<template>
  <div class="echart" ref="mychart" :style="myChartStyle"></div>
</template>
 
<script lang="ts" setup>
import { shallowRef, watch, StyleValue, ref, nextTick } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  DataZoomComponent,
  DataZoomComponentOption
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer, DataZoomComponent]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption | DataZoomComponentOption
>;

const myChart = shallowRef<echarts.ECharts | undefined>();
// const sortData = ref<number[]>([])
const myChartStyle: StyleValue | undefined = { float: "left", width: '100%', height: '68vh', marginTop: '3vh' };
// 获取父组件传过来的yAxis和series数据 
const props = defineProps(['yAxisData', 'seriesData'])

// 对父组件传过来的数据进行排序
const propsDesc = ref<{ value: number; label: any; }[]>([]);

const option = shallowRef<EChartsOption>({
  title: {
    text: '一周时长统计'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '5%',
    bottom: '4%',
    containLabel: true
  },
  xAxis: {
    max: "dataMax",
    // boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: "category",
    data: propsDesc.value.map((item: { label: any; }) => item.label),//y轴数据
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    // max: props.yAxisData.length - 1
  },
  dataZoom: [
    {
      type: "inside",
      startValue: 0,
      endValue: 8,
      minValueSpan: 6,
      maxValueSpan: 6,
      yAxisIndex: [0],
      zoomOnMouseWheel: false,  // 关闭滚轮缩放
      moveOnMouseWheel: true, // 开启滚轮平移
      moveOnMouseMove: true  // 鼠标移动能触发数据窗口平移
    },
    {
      type: 'slider',
      realtime: true,
      startValue: 0,
      endValue: 8,
      width: '3.5',
      height: '80%',
      yAxisIndex: [0], // 控制y轴滚动
      fillerColor: "rgba(154, 181, 215, 1)", // 滚动条颜色
      borderColor: "rgba(17, 100, 210, 0.12)",
      backgroundColor: '#cfcfcf',//两边未选中的滑动条区域的颜色
      handleSize: 0, // 两边手柄尺寸
      showDataShadow: false,//是否显示数据阴影 默认auto
      showDetail: false, // 拖拽时是否展示滚动条两侧的文字   
      top: '10%',
      right: '5',
    }
  ],
  series: [
    {
      realtimeSort: false,
      name: "时长",
      type: "bar",
      data: propsDesc.value.map((item: { value: any; }) => item.value),//x轴数据 
      label: {
        show: true,
        position: "right",
        valueAnimation: false
      },
      itemStyle: {
        color: '#f9db88',
        borderColor: '#ff822d',
        borderWidth: 1
      }
    }
  ] as any,
  legend: {
    // show: true
  },
  animationDuration: 1000,
  animationDurationUpdate: 100,
  animationEasing: "linear",
  animationEasingUpdate: "linear"
})

const mychart = ref<HTMLElement | null>(null)

watch([props, propsDesc.value], async () => {
  propsDesc.value = props.seriesData
    .map((value: any, index: string | number) => ({ value, label: props.yAxisData[index] }))
    .sort((a: { value: number; }, b: { value: number; }) => b.value - a.value);

  await nextTick(); // 等待 DOM 更新

  const labels = propsDesc.value.map((item: { label: any; }) => item.label);
  const values = propsDesc.value.map((item: { value: any; }) => item.value);

  (option as any).value.yAxis.data = labels;
  (option as any).value.series[0].data = values;

  // await nextTick(); // Add this line to wait for the DOM update   
  myChart.value = echarts.init(mychart.value);
  pageUpdate();
}, { deep: true });

function pageUpdate() {
  myChart.value?.setOption(option.value);
  //随着屏幕大小调节图表
  window.addEventListener("resize", () => {
    if (myChart.value) {
      myChart.value.resize();
    }
  });
}

</script>
```
:::

## 效果展示

<script setup>
import BarChart from './components/BarChartuse.vue'
</script>

<ClientOnly>
    <BarChart />
</ClientOnly>