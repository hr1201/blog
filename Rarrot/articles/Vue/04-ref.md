# ref

## ref，isRef

在 Vue 3 中，ref 是一个**函数**，用于**创建响应式的数据**。它接受一个参数作为初始值，并返回一个包装过的响应式对象。



**ref**跟vue2的以下这段代码是一个意思，也就是创建响应式数据：

```Vue
<template>
  <div>

  </div>
</template>

<script setup lang='ts'>
export default{
  data(){
    return {
      age:18
    }
  }
}
</script>
<style scoped>

</style>
```



### 使用ref去写则是这样的：

```Vue
<template>
  <div>
    ref {{ rarrot }}
  </div>
  <button @click="change">点击我</button>
</template>

<script setup lang='ts'>
import { ref, isRef } from 'vue'

const rarrot = ref({ name: "rarrot" })

const change = () => {
  // 通过value去改变rarrot的值
  rarrot.value.name='nihao'
  console.log("🚀", rarrot)

  // 用于检测是否为响应式对象
  console.log(isRef(rarrot))
}

</script>
<style scoped></style> 
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308031812741.png)



### shallowRef，triggerRef

在 Vue 3 中，shallowRef 和 ref 区别如下：

||响应式对象的处理方式|性能影响|
|-|----------|----|
|**ref**|ref 创建的响应式对象会对其值进行**深层次**的响应式转换。<br>当访问或修改 ref 返回的对象时Vue 会自动追踪依赖**并进行视图更新**。|由于 ref 对值进行深层次的响应式转换，当值是复杂对象或数组时，会**有一定的性能开销**因为 Vue 需要**递归地追踪**其所有属性的变化|
|**shallowRef**|shallowRef 创建的响应式对象只对其值进行**浅层次**的响应式转换。<br>当访问或修改 shallowRef 返回的对象时，Vue **只会追踪该对象本身的变化**，而不会深度追踪其内部属性的变化。|由于 shallowRef 只对值进行浅层次的响应式转换，对于复杂对象或数组，它的**性能开销较低**。因为 Vue 只会**追踪对象本身**的变化，而不会深度追踪其内部属性的变化。|





### 示例：

通过`triggerRef(rarrot2)`和`rarrot2.value={` `name:'nihao2'` `}`这两种方式会更新收集的依赖，也就是视图的更新，看代码：

```Vue
<template>
  <div>
    shallowRef {{ rarrot2 }}
  </div>
  <button @click="change">点击我</button>
</template>

<script setup lang='ts'>
import { shallowRef, triggerRef } from 'vue'
// ref shallowRef
// ref深层次   shallowRef浅层次的响应
// shallowRef跟ref混写的话，改变ref，shallowRef的页面也会被修改，原因是调用了triggerRef()

const rarrot2 = shallowRef({ name: 'rarrot2' })

const change = () => {
  // shallowRef以下这么修改会导致对象被修改，但是页面上没有被修改
  rarrot2.value.name = 'nihao2'
  triggerRef(rarrot2)//triggerRef会强制更新收集的依赖
  console.log("🚀  rarrot2", rarrot2)

// shallowRef用以下这种方式对象和页面上都会被修改
  // rarrot2.value={
  //   name:'nihao2'
  // }
  // console.log("🚀  rarrot2", rarrot2)
}
</script>
<style scoped></style> 
```



下图将`triggerRef(rarrot2)`和`rarrot2.value={ name:'nihao2' }`都注释了：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308032027751.png)





## customRef

在 Vue 3 中，**customRef** 是一个函数，用于创建自定义的响应式数据。它接受一个工厂函数作为参数，该工厂函数负责定义**自定义**的响应式行为，并返回一个包装过的响应式对象。



通过使用 customRef，你可以**完全控制响应式数据的依赖追踪和触发更新的逻辑**。这对于实现一些特定的响应式行为或处理复杂的数据情况非常有用。看代码：

```Vue
<template>
  <div>
    customRef {{ rarrot3 }}
  </div>
  <button @click="change">点击我</button>
</template>

<script setup lang='ts'>
import { isRef, customRef } from 'vue'

function myRef<T>(value: T) {
  let timer:any
  // track 用于追踪依赖，trigger 用于触发更新
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newVal) {
        clearTimeout(timer)
        timer=setTimeout(()=>{
          console.log('触发了')
          value=newVal
          timer=null;
          trigger()
        },500)
        
      }
    }
  })
}

// 对其进行赋值时，会调用customRef的get()方法去收集这个依赖
const rarrot3=myRef<string>('rarrot3')
console.log(isRef(rarrot3))//true
console.log(rarrot3)

const change = () => {
  //.value会调用customRef的set()方法去更新收集的这个依赖
  rarrot3.value='nihao3'
}
</script>
<style scoped></style> 
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308032041975.png)



以上代码中使用了一个简单的防抖，防止用户过快点击，导致卡顿，防抖会使得用户在过快点击时不会触发定时器，在停止点击后才触发，以下为代码解释：

这段代码的作用是在修改 `rarrot3` 的值后，延迟500毫秒才触发更新。这是通过在 `set()` 方法中使用 `setTimeout()` 来实现的。在 `set()` 方法中，清除之前的定时器（如果有的话），然后设置一个新的定时器来延迟更新。当定时器触发时，就将新的值赋给 `value`，并通过调用 `trigger()` 方法来触发更新。





## ref 小妙招

我们在使用ref后，想要打印返回的响应式对象，但是给了一堆属性，如下图：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308032102901.png)

所以可以进行以下设置：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308032057850.png)



设置之后打印的效果就变得很简洁，如下图所示：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308032103697.png)



## 用ref操作DOM

看代码：

```Vue
<template>
  <div ref="domm">
    我是domm
  </div>
  <button @click="change">点击我</button>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const domm=ref<HTMLDivElement>()

const change = () => {
  // ?. 是可选链操作符（Optional Chaining Operator）
  // 在访问对象的属性或方法之前，需要先确保对象本身不为 null 或 undefined
  // 如果对象为 null 或 undefined，直接访问其属性或方法将会导致 TypeError 错误。
  console.log(domm.value?.innerText)

}


</script>
<style scoped></style> 
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308032111261.png)



## 从源码解释ref和shallowRef的区别

### ref的创建过程

先说一下ref的创建过程：

```typescript
/**
 * 获取一个内部值并返回一个reactive(响应)和mutable(可变)的 ref 对象
 * 有一个指向内部值的属性`.value`
 *
 * @param value - The object to wrap in the ref.
 * @see {@link https://vuejs.org/api/reactivity-core.html#ref}
 */
export function ref<T extends Ref>(value: T): T
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>
export function ref(value?: unknown) {
  return createRef(value, false)
}
```

以上运用函数的重载，以适应多种传入的类型。



上面代码中调用`createRef(value, false)`，value为用户传入的值，代码如下：

```typescript
function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}
```

先判断了rawValue是否为响应式对象，是就直接返回rawValue，否则调用`RefImpl(rawValue, shallow)`创建ref对象。

记住，这里的`shallow`传入为**false**。



上面代码中不是ref对象就调用了`RefImpl(rawValue, shallow)`，这里是将`rawValue`和`shallow`传入到构造方法中，代码如下：

```typescript
class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    // 判断是否为浅响应式对象，shallowRef传入的__v_isShallow为true，
    // isShallow(newVal)判断传入的值是否为浅层响应式，
    // isReadonly(newVal)判断传入的值是否为只读响应式对象
    // 只要三个条件中有一个为true，useDirectValue就为true
    const useDirectValue =this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
       // 当useDirectValue为false，也就是为深层次响应对象时，就将其转换为原始对象
    newVal = useDirectValue ? newVal : toRaw(newVal)
       // 这里比较原始对象
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this, newVal)
    }
  }
}
```

以上代码先定义私有的`_value`和`_rawValue`，这个类中的构造方法的参数`__v_isShallow`前面传入为**false**，所以又会调用`toReactive(value)`。



`toReactive(value)`的代码如下：

```typescript
export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value
```

以上这段代码就是说判断`value`是不是一个引用类型，是的话就会调用`reactive(value)`，这个方法可以用来**将普通对象转换为响应式对象**，也就是说当对象的属性发生变化时，Vue 可以检测到这些变化并自动更新相关的视图。



### shallowRef的创建过程

```typescript
declare const ShallowRefMarker: unique symbol
export type ShallowRef<T = any> = Ref<T> & { [ShallowRefMarker]?: true }
/**
 * Shallow version of {@link ref()}.
 *
 * @example
 * ```js
 * const state = shallowRef({ count: 1 })
 *
 * // 这不会触发响应式系统的变化
 * state.value.count = 2
 *
 * // 这会触发响应式系统的变化
 * state.value = { count: 2 }
 * ```
 *
 * @param value - The "inner value" for the shallow ref.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowref}
 */
export function shallowRef<T extends object>(
  value: T
): T extends Ref ? T : ShallowRef<T>
export function shallowRef<T>(value: T): ShallowRef<T>
export function shallowRef<T = any>(): ShallowRef<T | undefined>
export function shallowRef(value?: unknown) {
  return createRef(value, true)
}
```

这一段跟上面ref的同理了，只不过这里传入到`createRef`的shallow为**true。**



因为传入为**true**，所以在构造方法中，就会直接返回value并赋值给RefImpl类的\_value私有属性，

1. 在读取时会调用`get()`方法，里面的`trackRefValue(this)`会收集依赖
2. 设置值时会调用`set(newVal)`方法，这里的`set(newVal)`会先判断值是否改变，有改变的话将新值传递给 \_rawValue
3. 如果之前已经使用了浅层模式或者新值是浅层响应式或只读响应式，则直接使用新值，否则使用 `toReactive(newVal)` 函数将新值转换为响应式对象。
4. 最后再调用 `triggerRefValue(this,newValue)` 函数，触发对该 customRef 对象的依赖更新。





之所以ref跟shallowRef同时使用，都会进行视图更新，因为ref会调用`triggerRefValue(this, newVal)`，就会把收集的依赖都进行更新。





## 疑问

1. 为什么深层次响应式对象要使用toRaw()转换为原始对象进行比较，而浅层次响应式对象不用转换？

看下方。



2. 还有一个疑问就是，以下会更新视图的变化是怎么一回事？

```typescript
const rarrot2 = shallowRef({ name: 'rarrot2' })
rarrot2.value={ name:'nihao2' }
```

而以下这样又不会更新视图

```typescript
const rarrot2 = shallowRef({ name: 'rarrot2' }) 
rarrot2.value.name='nihao2'
```



### 解答

其实两个问题的答案都在`set()`方法里，看源代码：

```typescript
set value(newVal) {

    ...

  // 当useDirectValue为true，也就是为深层次响应对象时，就将其转换为原始对象

    newVal = useDirectValue ? newVal : toRaw(newVal)

    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this, newVal)
    }
}
```

```typescript
export const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue)
```



① 这里深层次对象需要用toRaw()**转换为原始对象**进行比较，原因为直接比较的话比较的是引用，那就没有变化，需要比较的是属性值。



② 这里直接比较浅层次响应式对象的话，比较的是引用，新值的引用和旧值的引用，在只改变属性的情况下，还是一样的。

但是如果通过rarrot2.value={ name:'nihao2' }，则改变了引用，所以就会调用if里面的条件了。









