# 计算属性computed

[计算属性](https://so.csdn.net/so/search?q=%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7&spm=1001.2101.3001.7020)就是当依赖的属性的值**发生变化的时候，才会触发他的更改**，如果依赖的值，不发生变化的时候，使用的是缓存中的属性值。



## 调用方式

### 选项式写法

```Vue
<template>
    <div>
        姓：<input type="text" v-model="firstname">
    </div>
    <div>
        名：<input type="text" v-model="secondname">
    </div>
    <div>
        全名：{{ total }}
    </div>
    <button @click="changeName">changeName</button>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
let firstname = ref('R')
let secondname = ref('arrot')

// 选项式写法  支持一个对象传入get函数以及set函数自定义操作
const total = computed<string>({
    get() {
        return '姓' + firstname.value + '，名' + secondname.value
    },
set(newVal) {
        [firstname.value, secondname.value] = newVal.split(',')
    }
})

const changeName = () => {
    total.value = 'R,orrot'
}

</script>
<style scoped></style>
```



### 函数式写法

```Vue
<template>
    <div>
        姓：<input type="text" v-model="firstname">
    </div>
    <div>
        名：<input type="text" v-model="secondname">
    </div>
    <div>
        全名：{{ total }}
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
let firstname = ref('R')
let secondname = ref('arrot')

// 函数式写法  只能支持一个getter函数不允许修改值
const total = computed<string>(() => '姓' + firstname.value + '，名' + secondname.value)
</script>
<style scoped></style>
```



## 应用

```Vue
<template>
    <div style="margin-left: 15px;">
        <div style="margin-bottom: 30px;">
            <input type="text" placeholder="搜索" v-model="searchText">
        </div>
        <table class="gridtable" width="500">
            <thead>
                <tr>
                    <th>动物名称</th>
                    <th>动物单价</th>
                    <th>动物数量</th>
                    <th>动物总价</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody align="center">
                <tr v-for="(item, index) in searchDatas">
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>
                        <button @click="item.num > 1 ? item.num-- : item.num">-</button>
                        {{ item.num }}
                        <button @click="item.num++">+</button>
                    </td>
                    <td>{{ item.price * item.num }}</td>
                    <td>
                        <button @click="deleteItem(index)">删除</button>&nbsp;
                    </td>
                </tr>
                <tr>
                    <td><input style="width: 40px;" type="text" placeholder="名称" v-model="nameTemp"></td>
                    <td><input style="width: 40px;" type="text" placeholder="价格" v-model="priceTemp"></td>
                    <td>
                        <button @click="numTemp > 1 ? numTemp-- : numTemp">-</button>
                        {{ numTemp }}
                        <button @click="numTemp++">+</button>
                    </td>
                    <td>嘻嘻</td>
                    <td>
                        <button @click="addItem">增加</button>

                    </td>
                </tr>
            </tbody>
            <tfoot>
                <td colspan="5" align="right">总价：{{ total }}</td>
            </tfoot>

        </table>
    </div>

</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'

interface Data {
    name: string,
    price: number,
    num: number,
}

const items: Data[] = reactive([
    { name: '鸡鸡', price: 66, num: 1, },
    { name: '鸭鸭', price: 36, num: 1, },
    { name: '狗狗', price: 50, num: 1, },
])

// 计算总价
const total = computed(() => {
    return items.reduce((prev: number, next: Data) => {
        return prev + next.num * next.price
    }, 0)
})

// 删除
const deleteItem = (index: any) => {
    items.splice(index, 1)
}

// 搜索
const searchText = ref<string>('')
const searchDatas = computed(() => {
    return items.filter((value) => {
        return value.name.includes(searchText.value)
    })
})

// 增加
let nameTemp: string
let priceTemp: number
let numTemp = ref<Data['num']>(0)
const addItem = () => {
    if (nameTemp != '' && priceTemp > 0 && numTemp.value > 0) {
        let temps: Data = {
            name: nameTemp,
            price: priceTemp,
            num: numTemp.value
        }
        items.push(temps)
        nameTemp = '',
        priceTemp = 0,
        numTemp.value = 0
    } else {
        alert('请检查是否输入完整，以及价格、数量是否大于0')
    }
}
</script>
<style scoped>

</style>
```

<br/>

### 表格展示(可增删查👆)
<br/>

<script setup>
import tables from '../../../Rarrot/.vitepress/theme/components/demo/table.vue'

</script>

<tables />



## 源码解读
仅展示部分重要的代码：

### 选项式和函数式的不同

源码中先判断传入过来的是否为函数，是函数的话就是只读的；因为选项式写法传入的是一个包含get和set函数的对象。

```typescript
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions,
  isSSR = false
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>

  const onlyGetter = isFunction(getterOrOptions)
  // 如果是函数的话，进行setter更改就会进行报错
  if (onlyGetter) {
    getter = getterOrOptions
    setter = __DEV__
      ? () => {
          console.warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    // 传入的不是函数就可以进行get和set 
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR)

  if (__DEV__ && debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack
    cRef.effect.onTrigger = debugOptions.onTrigger
  }

  return cRef as any
}
```

<br/>

### 怎么对值进行更改的(脏值检测)
```typescript
export class ComputedRefImpl<T> {
  public dep?: Dep = undefined

  private _value!: T
  public readonly effect: ReactiveEffect<T>

  public readonly __v_isRef = true
  public readonly [ReactiveFlags.IS_READONLY]: boolean = false

  public _dirty = true//判断是否是脏的，默认true
  public _cacheable: boolean

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
    isReadonly: boolean,
    isSSR: boolean
  ) {

    // 跟响应式原理类似，先进行收集，当变化时就执行
    this.effect = new ReactiveEffect(getter, () => {
    // 依赖变化，并且脏值是false时才会进行调用，说明刚注册computed时是不会进入这个条件语句的
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)//在ref中有提到过，用于把收集的依赖都进行更新
      }
    })
    this.effect.computed = this
    this.effect.active = this._cacheable = !isSSR
    this[ReactiveFlags.IS_READONLY] = isReadonly
  }

  // computed的get返回值时之所以要添加value就是因为这里构造方法里面的value方法
  get value() {
    // the computed ref may get wrapped by other proxies e.g. readonly() #3376
    // computed的ref可能会被其他代理包装，例如readonly()
    const self = toRaw(this)
    trackRefValue(self)
    if (self._dirty || !self._cacheable) {
      // 这里将_dirty赋值为false，说明变化的值已经更新，就不用再重新计算
      // 当值改变调用ReactiveEffect时，_dirty是true就会进入这个条件语句，获取返回值
      self._dirty = false
      // self.effect.run()返回get的return的值
      self._value = self.effect.run()!
    }
    return self._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }
}
```
