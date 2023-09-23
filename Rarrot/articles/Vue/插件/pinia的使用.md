# pinia的使用

## 安装
```bash
yarn add pinia
# 或者使用 npm
npm install pinia
# 或者使用 pnpm
pnpm add pinia
```

## 基本用法
vue3项目入口main.js文件配置pinia：
```JavaScript{2,6,7,9}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const store=createPinia()
let app=createApp(App)

app.use(store)

app.mount('#app')
```

<br/>

在src文件夹下创建store文件夹，并在此文件夹下创建index.ts文件：
```typescript
import { defineStore } from 'pinia'

export const useTestStore=defineStore('Test',{
    state:()=>{
        return{
            current:1,
            name:'rarrot'
        }
    },
    // computed 修饰值
    getters:{

    },
    // methods 可以做同步异步，提交state
    actions:{
        setCurrent(num:number){
            // this是由定义好的store实例调用的，箭头函数只会保存当前作用域的this 
            this.current=num
        }
    }
})
```

<br/>

在App.vue进行使用：
```vue
<template>
  <div>
    pinia:{{ test.age }}--{{ test.name }}
    <br>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang='ts'>
// import { ref, reactive } from 'vue'
import { useTestStore } from './store'

const test = useTestStore()

// 修改值的方式
// 1.直接修改test.age++ 
// 2.用test.$patch({ age:888 })进行修改
// 3.用函数的写法：test.$patch((state)=>{ state.age=999 })  推荐
// 4.整个对象进行修改test.$state={ age:1000,name:'rorrot' }
// 5.在store里边的actions里面定义一个函数，然后直接调用test.setage(123)

function change(){
  test.setAge(123)
}
</script>
<style scoped></style>
```


## storeToRefs源码详解
对pinia进行解构会失去响应式，但是通过storeToRefs可以将一个存储对象（store）转换为一组响应式的引用（refs），使其重新具备响应式。

```JavaScript
/**
 * 创建一个对象包含所有的state, getters, and plugin-added
 * state 属性 of the store. 类似于 `toRefs()` 但是是特别地
 * 专为 Pinia stores 设计，所以方法和非响应式属性完全忽略
 *
 * @param store - store to extract the refs from
 */
function storeToRefs(store) {
    // See https://github.com/vuejs/pinia/issues/852
    // 使用toRefs()更容易，虽然它包含更多的东西.
    // 判断是vue2就直接使用toRefs
    if (isVue2) {
        // @ts-expect-error: toRefs include methods and others
        return toRefs(store);
    }
    else {
        // 将ref响应式对象转换为原始对象
        console.log(store)
        store = toRaw(store);
        console.log(store)

        const refs = {};
        // 遍历store,判断是否为响应式ref或reactive,是就通过toRef转换为引用
        // 并添加至refs中,遍历完后返回
        for (const key in store) {
            const value = store[key];
            if (isRef(value) || isReactive(value)) {
                // @ts-expect-error: the key is state or getter
                refs[key] =
                    // ---
                    toRef(store, key);
            }
        }
        return refs;
    }
}
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309131553222.png)

<br/>

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309131554889.png)


## actions的同步异步使用

### 同步调用 
./store/index.ts
```typescript
import { defineStore } from 'pinia'

type User={
    name:string,
    age:number
}

let result:User={
    name:'鸡',
    age:999
}

export const useTestStore=defineStore('test',{
    state:()=>{
        return{
            user:<User>{},
            name:'鹅'
        }
    },
    // computed 修饰值
    getters:{

    },
    // methods 可以做同步异步，提交state
    actions:{
        setUser(){
            this.user=result
        }
    }
})
```

./App.vue
```vue
<template>
  <div>
    pinia:{{ test.user }}
    <br/>
    pinia:{{ test.name }}
    <button @click="change">change</button>
  </div>
</template>

<script setup lang='ts'>
// import { ref, reactive } from 'vue'
import { useTestStore } from './store';

const test = useTestStore()

function change() {
  test.setUser()
}
</script>
<style scoped></style>
```

### 异步调用
```typescript
import { defineStore } from 'pinia'

type User = {
    name: string,
    age: number
}

const Login = (): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: '鸡',
                age: 999
            })
        }, 2000);
    })
}

export const useTestStore = defineStore('test', {
    state: () => {
        return {
            user: <User>{},
            name:'鹅'
        }
    },
    // computed 修饰值
    getters: {

    },
    // methods 可以做同步异步，提交state
    actions: {
        async setUser() {
            const result = await Login()
            this.user = result
            this.setName('鸭')
        },
        setName(name:string){
            this.name=name
        }
    }
})
```


## getters用法

在原来代码基础上添加以下代码


./store/index.ts
```typescript
    // computed 修饰值
    getters: {
        newName():string{
            return `${this.name}--${this.getAge}`
        },
        getAge():number{
            return this.user.age            
        }
    },
```

<br/>

./App.vue
```vue
    <p>getter:{{ test.newName}}</p>
```

## pinia的API
```vue
<template>
  <div>
    pinia:{{ test.user }}
    <br />
    pinia:{{ test.name }}
    <br />
    <p>getter:{{ test.newName }}</p>

    <button @click="change">change</button>
    <br /><br />
    <button @click="reset">reset</button>
  </div>
</template>

<script setup lang='ts'>
// import { ref, reactive } from 'vue'
import { useTestStore } from './store';

const test = useTestStore()

test.$subscribe((args, state) => {
  // 包含新值旧值
  console.log("🚀  args1", args)
  // 包含store里面state的数据
  console.log("🚀  state", state)
})

test.$onAction((args) => {
  // 后输出
  args.after(() => {
    console.log('after')
  })
  console.log("🚀  args2", args)
}, true)

function change() {
  test.setUser()
}

const reset = () => {
  // 将修改的值进行恢复
  test.$reset()
}
</script>
<style scoped></style>
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309132019319.png)

