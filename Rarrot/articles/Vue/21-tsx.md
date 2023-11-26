# tsx

用 npm,pnpm或yarn 安装插件支持tsx：
```shell
npm install @vitejs/plugin-vue-jsx -D

pnpm add @vitejs/plugin-vue-jsx --save-dev

yarn add @vitejs/plugin-vue-jsx --dev
```

修改vite.config.ts 配置文件：
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()]
})
```

修改tsconfig.json 配置文件：
```json
 "compilerOptions": {
    "jsx":"preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
 }
```
## tsx的三种书写形式

### 直接返回一个渲染函数

```tsx
export default function(){
    return (<div>Rarrot</div>)
}
```

### optionAPI
```tsx
export default defineComponent({
    data(){
        return{
            age:23
        }
    },

    render(){
        return (<div>{this.age}</div>)
    }
})
```

### setup函数模式
```tsx
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const flag = true
        return () => (<div>Rarrot</div>)
    }
})
```

## 支持的语法

### 1. 支持v-show
```tsx
export default defineComponent({
    setup() {
        const flag = true
        return () => (<div v-show={flag}>Rarrot</div>)
    }
})
```

### 2. 支持ref，但是不会自动解包，所以在标签中需要使用flag.value
```tsx
export default defineComponent({
    setup() {
        const flag = ref(false)
        return () => (<div v-show={flag.value}>Rarrot</div>)
    }
})
```

### 3. 不支持v-if，可以用三元表达式代替
```tsx
export default defineComponent({
    setup() {
        const flag = ref(false)
        return () => (<div>{flag.vlue ? <div>true</div> : <div>false</div>}</div>)
    }
})
```

### 4. 不支持v-for，可以用map代替
```tsx
export default defineComponent({
    setup() {
        const data = [
            {
                age: 16
            },
            {
                age: 24
            },
            {
                age: 32
            },
        ]
        return () => (
            data.map(d => {
                return <div>{d.age}</div>
            })
        )
    }
})
```

### 5. 接收父组件传过来的值
```tsx
interface Props {
    name?: string
}
export default defineComponent({
    props: {
        name: String
    },
    setup(props: Props) {
        return () => (<>
            <div>props:{props?.name}</div>
        </>)
    }
})
```
```vue
<template>
    <!-- 传送组件需要使用 -->
    <uses name="Rarrot"></uses>
</template>
```

### 6. emit派发事件
```tsx
interface Props {
    name?: string
}
export default defineComponent({
    props: {
        name: String
    },
    emits: ['on-click'],
    setup(props: Props, { emit }) {
        const data = [
            {
                age: 16
            },
            {
                age: 24
            },
            {
                age: 32
            },
        ]
        const fn = (item: any) => {
            console.log('按我' + item.age)
            emit('on-click', item)
        }
        return () => (<>
            <div>props:{props?.name}</div>
            <hr />
            {data.map(d => {
                return <div onClick={() => fn(d)}>{d.age}</div>
            })}
        </>)
    }
})
```

```vue
<template>
    <!-- 传送组件需要使用 -->
    <uses @on-click="getItem" name="Rarrot"></uses>
</template>

<script setup lang='ts'>
import { ref, reactive, watch, defineAsyncComponent } from 'vue'
import uses from './components/tsx/App'

const getItem=(age:any)=>{
    console.log('父组件收到了',age)
}
</script>
```

### 7. v-slot
```tsx
const A = (_, { slots }) => (<>
    <div>{slots.default ? slots.default() : '默认值'}</div>
    <div>{slots.foo?.()}</div>
</>)

export default defineComponent({
    emits: ['on-click'],
    setup() {
        const slots={
            default:()=>(<div>Rarrot default</div>),
            foo:()=>(<div>Rarrot foo</div>)
        }
        return () => (<>
            <A v-slots={slots}></A>
        </>)
    }
})
```

### 8. v-model
```tsx
export default defineComponent({
    setup() {
        const flag = ref('')
        return ()=>(<>
            <input v-model={flag.value} type="text"></input>
            <div>{flag.value}</div>
        </>)
    }
})
```
