# vue-router的使用
根据[小满zs](https://www.bilibili.com/video/BV1dS4y1y7vd?p=80&vd_source=77200ec73c64f27ae0b35c31a8f51d40)的这个视频编写的笔记

## 安装
```bash
npm install vue-router@4
//或者
yarn add vue-router@4
# 或者使用 pnpm
pnpm install vue-router@next
```

## 使用
安装后在main.ts去注册一下：
```typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

let app = createApp(App)

app.use(router)

app.mount('#app')
```

./router/index.ts
```typescript
import { createRouter,createWebHistory,RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw>=[
    {
        path:'/',
        component:()=>import('../components/login.vue')
    },
    {
        path:'/reg',
        component:()=>import('../components/reg.vue')
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router
```

## 路由模式


### vue2 mode  hash  vue3  createWebHashHistory

hash是URL中hash(#)及后面的那部分，常用作锚点在页面内进行导航，改变URL中的hash部分不会引起页面刷新。

通过hashchange事件监听URL的变化，改变URL的方式只有这几种：
1. 通过浏览器前进后退改变 URL
2. 通过\<a>标签改变 URL
3. 通过`window.location`改变URL

可以通过`window.addEventListener('hashchange',(e)=>{console.log(e)})`来监听路由的变化  


### vue2 mode history vue3 createWebHistory

history 提供了 pushState 和 replaceState 两个方法，这两个方法改变 URL 的 path 部分不会引起页面刷新。

history 提供类似 hashchange 事件的 popstate 事件，但 popstate 事件有些不同:
1. 通过浏览器前进后退改变 URL 时会触发 popstate 事件
2. 通过`pushState`/`replacestate`或 \<a>标签改变 URL 不会触发 popstate 事件
3. 可以拦截 pushState/replaceState的调用和\<a>标签的点击事件来检测 URL 变化
4. 通过js 调用history的back，go，forward方法课触发该事件

可以通过`window.addEventListener('popstate',(e)=>{console.log(e)})`来监听路由的变化  


### vue2 mode abstact vue3  createMemoryHistory


## 命名路由
就是给路由添加上name属性，使其可以通过获取name进行跳转

./router/index.ts
```typescript
import { createRouter,createWebHashHistory,RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw>=[
    {
        path:'/',
        name:'Login',
        component:()=>import('../components/login.vue')
    },
    {
        path:'/reg',
        name:'Reg',
        component:()=>import('../components/reg.vue')
    }
]
const router=createRouter({
    history:createWebHashHistory(),
    routes
})
export default router
```

./App.vue
```vue
<template>
  <div>
    <h1>rarrot</h1>
  </div>
  <!-- 添加replace可以不保留跳转的历史记录 -->
  <router-link :to="{name:'Login'}">Login</router-link>
  <hr>
  <router-link :to="{name:'Reg'}">Reg</router-link>
  
  <hr>
  <!-- 接收视图转变 -->
  <router-view></router-view>

  <hr>
  <button @click="toPage('Login')">login</button>
  <button @click="toPage('Reg')">reg</button>

  <button @click="next()">前进</button>
  <button @click="prev()">后退</button>

</template>

<script setup lang='ts'>
// import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
 
const toPage = (url:string) => {
  // 字符串
  // push改为replace可以不保留跳转的历史记录
  // router.push(url)
  // 对象
  // router.push({
  //   path:url
  // })
  // 命名式
  router.push({
    name:url
  })
}

const next=()=>{
  router.go(1)
}

const prev=()=>{
  router.go(-1)
}
</script>
<style scoped>

</style>
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309141512929.png)


## 路由传参
在login页面进行传参
```vue
<template>
    <div>嘿嘿嘿! 我是列表页面</div>
    <table cellspacing="0" class="table" border="1">
        <thead>
            <tr>
                <th>品牌</th>
                <th>价格</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="item.id" v-for="item in data">
                <th>{{ item.name }}</th>
                <th>{{ item.price }}</th>
                <th>
                    <button @click="toDetail(item)">详情</button>
                </th>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang='ts'>
import { data } from './list.json'
import { useRouter } from 'vue-router';

const router=useRouter()

// 下载在JSON to TS插件可以在json数据页面按ctrl+shift+alt+s获取item类型
type item = {
    name: string;
    price: number;
    id: number;
}

const toDetail = (item: item) => {
    router.push({
        // 使用params进行路由传参必须传入name
        name:'Reg',
        path:'/reg',
        // 路由传参
        // query:item
        params:item
    })
}
</script>
<style scoped>
.login {
    background: #f44747;
    height: 400px;
    width: 400px;
    font-size: 20px;
    color: white;
}
</style>
```

<br/>

在reg页面进行接收参数
```vue
<template>
    <div class="reg">
        <div>嘿嘿嘿! 我是列表页面</div>
        <!-- 用query传参就将params改为query -->
        <div>物种：{{ route.params.name }}</div>
        <div>价格{{ route.params.price }}</div>
        <div>ID：{{ route.params.id }}</div>

    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';

const route=useRoute()
</script>
<style scoped>
.reg{
    background:#20d18b;
    height: 400px;
    width: 400px;
    font-size:20px;
    color:white;
}
</style>
```
<br/>

使用params传参会出现重新加载页面丢失参数的问题
[官方解决办法github地址](https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22)


## 嵌套路由
./router/index.ts
```typescript{8}
import { createRouter,createWebHashHistory,RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw>=[
    {
        path:'/fa',
        name:'footer',
        component:()=>import('../components/footer.vue'),
        children:[
            {
                path:'',
                name:'Login',
                component:()=>import('../components/login.vue')
            },
            {
                path:'reg',
                name:'Reg',
                component:()=>import('../components/reg.vue')
            }
        ]
    },
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
```

./components/footer.vue
```vue
<template>
    <div>
        <router-view></router-view>
        <hr>
        <h1>我是父路由</h1>
        <div>
            <router-link to="/fa/">Login</router-link>
            <router-link to="/fa/reg">Reg</router-link>

        </div>
    </div>
</template>

<script setup lang='ts'>
// import { ref } from 'vue'
</script>
<style scoped>

</style>
```