# 计算属性computed

[计算属性](https://so.csdn.net/so/search?q=%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7&spm=1001.2101.3001.7020)是基于其他数据源（如 data、props 等）的值进行计算得到的，是缓存的，只有当依赖的数据源发生变化时，计算属性才会重新计算。

计算属性适合用来处理根据其他数据源的值变化而变化的数据，例如：格式化日期、过滤列表等。

## 基本用法

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
import tables from './components/table.vue'

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

<br/>

### 脏值检测解释

<br/>

① 这里传入到effect的schedule函数将_dirty转为true，这样可以进入if条件句进行依赖更新，同样也是为了防止第一次依赖更新之后的_dirty一直为false，未完请往下看：

以下为简易的computed函数实现：
```typescript{3-5}
export const computed = (getter: Function) => {
    let _value = effect(getter,{
        scheduler(){
            _dirty=true
        }
    })
    let catchCompu:Function//用于暂存函数，防止_dirty不是true时也去调用依赖
    let _dirty=true

    class ComputedRefImpl {
        get value() {
            if(_dirty){
                // 进行依赖更新
                catchCompu=_value()
                _dirty=false
            }
            return catchCompu

        }
    }
    return new ComputedRefImpl()
}
```

<br/>

② 在effect中多接收一个参数options，在effect中对收集的函数新增的一个属性options进行初始化，并返回依赖更新函数，未完请往下看：


以下为简易的effect函数实现：
```typescript{22}
interface Options {
    scheduler?: Function
}

type EffectFunction = {
    (): any;
    options?: Options;
};

// 收集函数
let findeffect

// fn为匿名的函数，这里将fn收集起来，当依赖更新时执行effect副作用函数
export function effect(fn: Function, options: Options) {
    // 闭包
    let _effect:EffectFunction = function () {
        findeffect = _effect;
        let res = fn();
        return res
    }
    // 给_effect增添一个属性
    _effect.options = options
    _effect()
    return _effect
}
```

<br/>

③ 当依赖更新时具有了options，所以会调用scheduler函数进行依赖更新，这也就实现了computed在不改变数据时不重复调用，而是使用缓存，当改变时也可以及时的进行依赖调用。


以下为简易的trigger函数实现：
```typescript{9-15}
export function trigger(target: object, key: any) {
    // 从targetMap用target作为key获取到含有相应对象的newMap
    const newMap = targetMap.get(target)
    // 从newMap中获取到含有相应属性的Set，Set中含有函数，并且是可迭代的
    const effects = newMap.get(key)

    // 调用effects中收集的函数
    effects.forEach(effect => {
        if (effect?.options?.scheduler) {
            // 如果存在options的话就调用options下的scheduler()函数，对_dirty进行更改
            // 否则就调用effect()
            effect?.options?.scheduler?.()
        } else {
            effect()
        }
    })
}
```

<br/>

::: tip 提示
你可以代入一个computed函数的使用去按照流程走一遍，可能会清晰一些。
::: 

::: warning 注意
只有当值改变时才会去effect收集依赖，然后trigger更新依赖；而没有改变时，调用get value获取值(catchCompu)
:::