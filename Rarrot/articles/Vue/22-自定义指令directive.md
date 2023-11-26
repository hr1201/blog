# 自定义指令directive

自定义指令命名时必须以`vNameOfDirective`的形式来命名本地自定义指令以使得它们可以直接在模版中使用。例如`vRarrot`以及其指令的生命周期：
```vue
<template>
    <div>
        <button @click="flag = !flag">切换</button>
        <A v-if="flag" v-rarrot:rabbit.carrot="{ color: 'red' }"></A>
    </div>
</template>

<script setup lang='ts'>
import { ref, Directive, DirectiveBinding } from 'vue'
import A from './A.vue'

let flag = ref<boolean>(true)
type Dir = {
    color: string
}
const vRarrot: Directive = {
    created: (...args: Array<any>) => {
        console.log("创建===>");

    },
    beforeMount(...args: Array<any>) {
        // 在元素上做些操作
        console.log("挂载之前=======>");
        console.log(args)

    },
    mounted(el: HTMLElement, dir: DirectiveBinding<Dir>) {
        console.log("挂载完成========>");
        console.log(dir.value.color)
        el.style.color = dir.value.color
    },
    beforeUpdate() {
        console.log("更新之前");
    },
    updated() {
        console.log("更新结束");
    },
    beforeUnmount(...args: Array<any>) {
        console.log(args);
        console.log("======>卸载之前");
    },
    unmounted(...args: Array<any>) {
        console.log(args);
        console.log("======>卸载完成");
    }
}
</script>
<style scoped></style>
```
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202311201923654.png)

## 实践
实现图片懒加载：
```vue
<template>
    <div class="blocks">
        <img v-lazy="item" v-for="item in arr" alt="image">
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import type { Directive } from 'vue';
// 使用vite方式一键导入图片
// glob 懒加载的模式，使用这种方式会进行分包，也就类似于懒加载:
/* 
let modules={
    'xxxx':()=>import('xxxx')
}
*/
// globEager 静态加载，类似直接进行引入：
// import xxxx from './xxxx'

let imageList: Record<string, { default: string }> = import.meta.glob('../../../assets/*.*', { eager: true })
// 获取到图片数组
let arr = Object.values(imageList).map(v => v.default)

let vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {
    // console.log(el)，在图片加载前展示的默认图片
    const defaultImg = await import('../../../assets/simage.jpg')
    el.src = defaultImg.default
    // console.log(binding.value)，binding接收的值为item，也就是图片路径
    // 使用js提供的api对可视化界面内的元素进行监控
    const obServe = new IntersectionObserver((entries) => {
        console.log(entries)
        // 通过判断intersectionRatio，可以知道元素是否显示在页面上，然后进行加载
        if (entries[0].intersectionRatio > 0) {
            setTimeout(() => {
                el.src = binding.value
            }, 1000)
            // 在判断完之后就可以进行取消监听
            obServe.unobserve(el)
        }
    })
    // 将el传入obServe中进行监听
    obServe.observe(el)
}

console.log(arr)
</script>
<style lang="less" scoped>
.blocks {
    overflow: auto;

    img {
        width: 300px;
        height: 400px;
    }
}
</style>
```