# reactive

vue3中的reactive是一个很重要的响应式API。它的作用是:

1. 使用Proxy把原对象包装成一个代理对象proxy。
2. 在代理对象proxy中`get()`拦截对原对象属性的访问,追踪哪些属性被读取了。
3. 在代理对象proxy中`set()`拦截对原对象属性的设置,当属性值发生改变时通知订阅者。
4. 在原对象上安装一个响应式标志,确保同一个对象不会被多次包装成proxy。



## 与ref的区别

ref支持**所有类型**，取值赋值需要**value**。

而reactive仅支持**引用类型**(Array Object Map Set) ，取值赋值不需要.value。



以下为reactive的声明文件，可以看到其类型是约束为object了。

```typescript
export declare function reactive<T extends object>(target: T): UnwrapNestedRefs<T>;
declare const ShallowReactiveMarker: unique symbol;
export type ShallowReactive<T> = T & {
    [ShallowReactiveMarker]?: true;
};
```



其实在上一篇ref中的源码也知道ref后面也是调用`toReactive(value)`方法，然后判断为引用类型，再调用`reactive(value)`方法，所以要将引用类型设置为响应式对象时，可以直接使用reactive。以下为`toReactive(value)`方法的源代码：

```typescript
/**
 * Returns a reactive proxy of the given value (if possible).
 *
 * If the given value is not an object, the original value itself is returned.
 *
 * @param value - The value for which a reactive proxy shall be created.
 */
export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value
```





## 使用reactive

### 传入Object类型数据

看代码：

```Vue
<template>
    <div>
        <form>
            姓名：<input v-model="form.name" type="text">
            <br>
            <button @click.prevent="submit">确认</button>
        </form>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

type M = {
    name: string,
}
let form = reactive<M>({
    name: 'rarrot',
})

const submit=()=>{
    console.log(form);
}
</script>
<style scoped></style>
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308041658639.png)



### 传入数组类型数据

reactive不能直接赋值，否则会破坏响应式对象。

#### 原因：

因为reactive将原对象包装成代理对象proxy，返回的也为proxy对象，直接赋值的话，修改的是proxy代理对象，而不是触发响应式改变原对象。

#### 解决：

1. 可以使用push，然后进行解构再添加进去
2. 添加一个对象，设置一个属性为数组，然后将新数组直接赋值给数组




看代码：

```Vue
<template>
    <div>
        <button @click="add">增加</button>
        <ul>
            <li v-for="item in list.arr">{{ item }}</li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

// let list = reactive<number[]>([1,2,3])

let list = reactive<{
    arr: number[]
}>({ arr: [1, 2, 3] })

const add = () => {
    // 将数据push进来
    // let value=list[list.length-1]
    // value++
    // list.push(value)

    // 直接赋值破坏了响应式对象
    // setTimeout(() => {
    //     let num = [4, 5, 6]
    //     list = num
    //     console.log(list);

    // }, 500)

    // 第一种解决方案
    // setTimeout(() => {
    //     let num = [4, 5, 6]
    //     list.push(...num)
    //     console.log(list);

    // }, 500)

    // 第二种解决方案，改HTML为 list.arr，改list为对象类型
    setTimeout(() => {
        let num = [4, 5, 6]
        list.arr = num
        console.log(list);

    }, 500)
}

</script>
<style scoped></style>
```





## reactive与readonly

可以看到此时obj和read是一样的，但read仍然是只读的，也就是进行赋值时，会报错，看代码以及输出：

```Vue

<template>
    <div>
        <button @click="add">查看</button>
    </div>
</template>

<script setup lang='ts'>
import { reactive,readonly } from 'vue'

let obj=reactive({
    name:'rarrot'
})

const read=readonly(obj)

const add = () => {
    console.log(obj,read);
}

</script>
<style scoped></style>
```



![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308041803926.png)




<br>但是当我们对obj进行赋值时，read的值也会跟着一起变，原因是obj和read指向同一个引用，如下图：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308041812208.png)



## shallowReactive

跟shallowRef是一样的，都是浅层响应，并且reactive更新依赖，shallowReactive也是会跟着变化。



让我们来看一下下面这段代码：

```Vue
<template>
    <div>
        <div>{{ state }}</div>
        <button @click="change1">test1</button>
        <button @click="change2">test2</button>
        <button @click="change3">test3</button>

    </div>
</template>
   
   
   
<script setup lang="ts">
import { shallowReactive } from 'vue'

const obj = {
    a: 1,
    first: {
        b: 2,
        second: {
            c: 3
        }
    }
}

const state = shallowReactive(obj)

function change1() {
    state.a = 7
    console.log(state)
}
function change2() {
    state.first.b = 8
    state.first.second.c = 9
    console.log(state);
}
function change3() {
state.a = 7
    state.first.b = 8
    state.first.second.c = 9
    console.log(state);
}

</script> 
   
<style></style>
```


<br>

只要**去更改了第一层级的a**，其余的也会进行依赖更新，说明只能对浅层的数据进行视图的更新，如果是深层的数据，例如first.b和first.second.c是只改变值，不更新视图：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308042028239.png)



## 源码解析

### readonly的构建过程：

```typescript
/**
 *
 * 返回响应式proxy对象。
 *
 * 响应式转换是“deep”的：它影响所有嵌套属性。 A
 * 响应式对象还会深度解开任何作为 refs 的属性，同时
 * 保持反应活性。
 * @example
 * ```js
 * const obj = reactive({ count: 0 })
 * ```
 *
 * @param target - The source object.
 * @see {@link https://vuejs.org/api/reactivity-core.html#reactive}
 */
export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}
```

以上可以看出reactive的泛型约束为只能是引用类型，判断是否为只读的引用类型，是则直接返回此引用类型，否则调用`createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap )`，此方法会返回一个proxy对象。



<br>

以下为`createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap )`的源代码：

```typescript
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
  // WeakMap 的 键值 只能是一个object类型的数据 并且 weakMap的键名所指向的对象，不计入垃圾回收机制
  // 它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
  // 因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
  // 也就是说，一旦不再需要，weakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用
) {
  // 如果传的不是引用类型，就会返回一个报错信息
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target 已经是一个 Proxy，说明已经被代理过，则直接返回它。
  // 异常：在响应式对象上调用 readonly()
// 并且还要通过检查ReactiveFlags.RAW来判断目标对象是否已经是只读的,避免重复只读代理
  if (
    target[ReactiveFlags.RAW] &&
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
   // 通过weakMap缓存已经代理过的对象，避免重复代理，从缓存(readonlyMap,reactiveMap)中查找，
   // 如果target已经有对应的Proxy对象，则直接返回查找到的proxy对象
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
   // 通过 targetType === TargetType.INVALID 来跳过代理那些不需要的静态类型的值
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
  // vue3使用了proxy进行代理
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  // 缓存新代理后的对象
  proxyMap.set(target, proxy)
  return proxy
}
```

<br>


以上代码通过Proxy进行拦截对象，实现响应式，其中使用了多个if表达式，判断是否具有合理的proxy对象，以及进行一些处理，然后还未return的话再进行创建proxy对象：

1. 使用 Proxy 构造函数**创建 Proxy 实例**。第一个参数是目标对象 target,第二个参数是 handlers。

2. 对集合类型和普通对象**使用不同的 handlers**。通过判断有没有`TargetType.COLLECTION`来确定目标对象的类型,如果是**集合映射类型**如 Map/Set/WeakMap/WeakSet，则使用 **collectionHandlers**；如果是**其他类型**，则使用 **baseHandlers**。 (看以下代码的targetTypeMap方法)
   
3. `collectionHandlers` 和 `baseHandlers` 是事先定义好的用于响应式转换的 handler 对象。这些 handler 对象会包含像 `get、set` 这样的 trap 方法来**拦截对目标对象的操作**。这里shallowReactive也会传入不同的参数，使其只能浅层响应。

4. 将新创建的 Proxy 实例 proxy **缓存到 WeakMap 中**。`proxyMap` 是一个 WeakMap,key 是原始对象 target，value 是代理对象 proxy。这样可以避免重复创建同一个对象的 Proxy。

5. 最后返回创建好的 Proxy 实例 proxy。


<br>

创建方法中有使用到的一些辅助的代码如下：

```typescript
const enum TargetType {
  INVALID = 0,
  COMMON = 1,
  COLLECTION = 2
}

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return TargetType.COMMON
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return TargetType.COLLECTION
    default:
      return TargetType.INVALID
  }
}

function getTargetType(value: Target) {
  return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)
    ? TargetType.INVALID
    : targetTypeMap(toRawType(value))
}
```

`getTargetType(value: Target)`方法的作用为：

1. 检查对象是否有标记(例如SKIP，RAW等)或不可扩展(用`Object.isExtensible(value)`检查)，不满足条件则返回无效类型INVALID
   
2. 否则根据对象的类型返回不同的TargetType枚举值


<br>


```typescript
//__v_skip会在to系列篇章中的源码解析toRaw有所讲解
export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw'
}
```


<br>



### shallowReactive

shallowReactive会通过传入不同的参数，使其只有根级的转换，可以看前面shallowReactive的例子。跟reactive使用同样的方法进行创建，看源代码：

```typescript

/**
 *
 * {@linkreactive()} 的浅版本。
 *
 * 与 {@linkreactive()} 不同，没有深度转换：只有根级转换
 * 属性对于浅反应对象是反应的。属性值为
 * 按原样存储和公开 -这也意味着具有引用值的属性将
 * 不会自动解开。
 * 
 *
 * @param target - The source object.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowreactive}
 */
export function shallowReactive<T extends object>(
  target: T
): ShallowReactive<T> {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  )
}
```

