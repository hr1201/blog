# 自定义hooks
`hooks`：翻译过来为钩子，**组合式函数**，当某些有状态逻辑需要复用的函数则可以用`hooks`封装出来；使用了**vue的响应式和生命周期**，这也是与utils文件夹下定义的工具函数的一大不同，工具函数不依赖框架。

组合式api的思想是将相同功能的变量方法写在同一块区域，使用hooks，可以更好地实现组合式api。

使用组合式api，在不同的功能中，同一功能的变量和方法会放在同一块，不同功能会放在不同块，但是当需要使用同一逻辑，逻辑中使用到响应式或生命周期时，不能很好的将其拆分，就可以使用到hooks。

[官方对hooks的说明](https://cn.vuejs.org/guide/reusability/composables.html)

[antfu写的hooks库useVue](https://vueuse.org/guide/)

::: tip 提示
hooks只能在 <script setup\> 或 setup() 钩子中被调用。
::: 

## 命名​
组合式函数约定用驼峰命名法命名，并以“use”作为开头。

## 示例
::: code-group
```ts [useFactorial.ts]
import { ref, watch, Ref } from 'vue';

export default function useFactorial(inputNumber: Ref<number>) {
    const factorialResult = ref(1);

    watch(inputNumber, (newVal: number) => {
        let result = 1;
        let inputNumber0 = 1,
            inputNumber1 = 1,
            inputNumber2 = 1,
            inputNumber3 = 1;

        let i;
        for (i = 1; i <= newVal - newVal % 4; i += 4) {
            inputNumber0 *= i;
            inputNumber1 *= i + 1;
            inputNumber2 *= i + 2;
            inputNumber3 *= i + 3;
        }

        result = inputNumber0 * inputNumber1 * inputNumber2 * inputNumber3;

        // 处理剩余的数字
        for (; i <= newVal; i++) {
            result *= i;
        }

        factorialResult.value = result;
    });

    return {
        factorialResult
    };
}
```

```vue [use.vue]
<template>
    <div>
        输入数字:<input v-model.number="inputNumber" style="width:100px" />
    </div>
    <span>阶乘等于:{{ factorialResult }}</span>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import useFactorial from './hooks/useFactorial.ts';

const inputNumber = ref(1);
// 直接运用导出的响应式变量：
const { factorialResult } = useFactorial(inputNumber);
</script>
<style scoped></style>
```
:::

