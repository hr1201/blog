# 侦听器watch

侦听器用于观察和响应 Vue 实例上的数据变化，当侦听的数据源发生变化时，侦听器会执行一个回调函数。

侦听器适合用来处理需要在数据发生变化时执行异步操作或较复杂逻辑的场景，例如：数据验证、向服务器发送请求等。



## 基本用法
```Vue{20,27,36,52,66,67}
<template>
<div>
    rarrot：<input v-model="message1" type="text">
    <hr>
    rorrot：<input v-model="message2" type="text">
    <hr>
    666：<input v-model="message3" type="text">
    <hr>
    age：<input v-model="message4.foo.bar.age" type="text">
    <hr>
    like：<input v-model="message5.foo.bar.like" type="text">
    <hr>
    career：<input v-model="message5.foo.bar.career" type="text">
</div>
</template>

<script setup lang='ts'>
import { ref,reactive, watch } from 'vue'

// 1. 对单变量进行侦听
let message1=ref<string>('rarrot')
watch([message1],(newval,oldval)=>{
    // 输出新值和旧值
    console.log(newval,oldval)
})

// 2. 对多变量进行侦听
let message2=ref<string>('rorrot')

let message3=ref<string>('666')

watch([message2,message3],(newval,oldval)=>{
    console.log(newval,oldval)
})

// 3. 对深层次对象进行侦听,需要开启watch的第三个属性deep进行深度监听
//    但是仍然会出现一个问题，新newval旧oldval的值一样
let message4=ref({
    foo:{
        bar:{
            age:66,
        }
    }
})

watch(message4,(newval,oldval)=>{
    console.log(newval,oldval)
},{
    deep:true
})

// 4. 侦听reactive数据，不用添加第三个属性deep也可以进行深度监听
let message5=reactive({
    foo:{
        bar:{
            like:'ping-pong',
            career:'quanduan'
        }
    }
})

// watch(message5,(newval,oldval)=>{
//     console.log(newval,oldval)
// })

// 5. 侦听reactive的单一属性
// 6. 侦听ref的单一属性时，需要用message5.value去获取值
watch(()=>message5.foo.bar.career,(newval,oldval)=>{
    console.log(newval,'oldval '+oldval)
},{
    //用于在执行之前先处理一次,以上这段会先输出quanduan oldval undefined
    immediate:true,
    // pre 组件更新之前调用  sync 同步执行  post 组件更新之后执行
    flush:"pre"

})
</script>
<style scoped></style>
```

<br/>

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309122123111.png)

<br/>

## 源码解读
在使用watch观察和响应Vue实例上的数据变化时，用户会传入两个必选的参数：`source`和`cb`，`source`为需要侦听的数据，`cb`为侦听到变化后执行的回调函数；还有一个可选的参数`options`，也就是immediate(执行之前先处理一次)或deep(是否开启深度监听)。

在函数体中，判断cb是否为一个函数，不是就会传回来一个警告，返回`doWatch`函数，源码中是这样写的：
::: code-group

```typescript [apiWatch.ts]
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: any,
  options?: WatchOptions<Immediate>
): WatchStopHandle {
  // __DEV__代表在开发环境下，判断cb是否为一个函数，不是就会传回来一个警告
  if (__DEV__ && !isFunction(cb)) {
    warn(
      `\`watch(fn, options?)\` signature has been moved to a separate API. ` +
        `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
        `supports \`watch(source, cb, options?) signature.`
    )
  }
  // 返回doWatch函数，doWatch会对其进行一些封装
  return doWatch(source as any, cb, options)
}
```

```typescript [source类型WatchSource]
export type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T)
```

```typescript [options类型WatchOptions]
export interface WatchOptions<Immediate = boolean> extends WatchOptionsBase {
  immediate?: Immediate
  deep?: boolean
}
```

```typescript [类型WatchStopHandle]
export type WatchStopHandle = () => void
```

:::


### doWatch函数解答

首先doWatch中先判断了cb是否存在，不存在就发出警告，源码：
:::details 展开代码
```typescript
function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect | object,
  cb: WatchCallback | null,
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = EMPTY_OBJ
): WatchStopHandle {
  if (__DEV__ && !cb) {
    // 在开发环境下，如果没有提供回调函数cb，函数会发出警告，
    // 指出immediate和deep选项仅在使用watch(source, callback, options?)签名时有效。
    if (immediate !== undefined) {
      warn(
        `watch() "immediate" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
    if (deep !== undefined) {
      warn(
        `watch() "deep" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
  }

  // 用于在提供无效的观察源时发出警告。
  // 观察源只能是getter/effect函数、ref、响应式对象或这些类型的数组。
  const warnInvalidSource = (s: unknown) => {
    warn(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, ` +
        `a reactive object, or an array of these types.`
    )
  }
```
:::

然后再判断了source是否为ref、reactive对象、数组类型、函数以及其他，并做相应的处理，源码以及注释如下：
:::details 展开代码

::: code-group

```typescript [doWatch函数]
  // 跟踪与该组件相关的反应效果（例如观察者） 以便它们可以在组件卸载时自动停止
  const instance =
    getCurrentScope() === currentInstance?.scope ? currentInstance : null
  // const instance = currentInstance
  let getter: () => any
  let forceTrigger = false
  let isMultiSource = false

  // 判断是否为ref对象
  if (isRef(source)) {
    // 创建getter函数，source此时为ref对象，通过.value取值
    getter = () => source.value
    forceTrigger = isShallow(source)
  } else if (isReactive(source)) {
    // source为Reactive对象，取值赋值不需要.value，则直接返回；
    // reactive仅支持引用类型，所以直接开启了深度监听
    getter = () => source
    deep = true
  } else if (isArray(source)) {
    isMultiSource = true
    // source为数组类型，判断数组的元素是否都为响应式对象，是就设置forceTrigger为true
    forceTrigger = source.some(s => isReactive(s) || isShallow(s))
    getter = () =>
      source.map(s => {
        if (isRef(s)) {
          return s.value
        } else if (isReactive(s)) {
          // 若为Reactive对象，则调用traverse函数
          return traverse(s)
        } else if (isFunction(s)) {
          // 如果s为函数，就会调用callWithErrorHandling函数，
          // 此函数内容调用了s函数，如果s函数有返回值的话就进行返回，否则为undefined
          // s函数有异常，会用instance和ErrorCodes.WATCH_GETTER进行错误处理
          return callWithErrorHandling(s, instance, ErrorCodes.WATCH_GETTER)
        } else {
          // 在开发环境下发出无效源警告
          __DEV__ && warnInvalidSource(s)
        }
      })
  } else if (isFunction(source)) {
    // 回调函数cb存在,就会执行函数source
    if (cb) {
      // getter with cb
      getter = () =>
        // 调用函数source
        callWithErrorHandling(source, instance, ErrorCodes.WATCH_GETTER)
    } else {
      // no cb -> simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return
        }
        if (cleanup) {
          cleanup()
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          ErrorCodes.WATCH_CALLBACK,
          [onCleanup]
        )
      }
    }
  } else {
    getter = NOOP
    __DEV__ && warnInvalidSource(source)
  }

```

```typescript [callWithErrorHandling函数]
// 对setup / render / watch / event的错误处理
export function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    // 当没有传入args时，res为fn函数的返回值
    res = args ? fn(...args) : fn()
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}
```

```typescript [callWithAsyncErrorHandling函数]
// 处理异步watchEffect中的错误
export function callWithAsyncErrorHandling(
  fn: Function | Function[],
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
): any[] {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args)
    if (res && isPromise(res)) {
      res.catch(err => {
        handleError(err, instance, type)
      })
    }
    return res
  }

  const values = []
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args))
  }
  return values
}
```
:::

之后进行判断是否开启深度监听，开启深度监听会调用traverse函数进行递归，源码如下：

:::details 展开代码

::: code-group

```typescript [doWatch函数]
  // 判断开启深度监听
  if (cb && deep) {
    const baseGetter = getter
    // traverse进行递归，深度监听值
    getter = () => traverse(baseGetter())
  }
```

```typescript [traverse函数]
export function traverse(value: unknown, seen?: Set<unknown>) {
  // 非对象或者有ReactiveFlags.SKIP的标志就直接返回value
  if (!isObject(value) || (value as any)[ReactiveFlags.SKIP]) {
    return value
  }
  seen = seen || new Set()
  // seen中如果已经有value，则直接返回value，避免无限递归
  if (seen.has(value)) {
    return value
  }
  // 没有就添加
  seen.add(value)
  // value为ref对象，就通过value的.value取值，然后递归
  if (isRef(value)) {
    traverse(value.value, seen)
  } else if (isArray(value)) {
    // 数组遍历
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen)
    }
  } else if (isSet(value) || isMap(value)) {
    // set或map也遍历
    value.forEach((v: any) => {
      traverse(v, seen)
    })
  } else if (isPlainObject(value)) {
    // 普通对象
    for (const key in value) {
      traverse(value[key], seen)
    }
  }
  return value
}
```
:::


最后就是判断options是否有flush，有`sync`和`post`，都分别做了处理；还有最主要的**依赖更新**，在依赖更新后就会调用`job`函数，这里仅粘贴一部分源码：
::: details 展开代码

::: code-group

```typescript [flush的处理，收集依赖]
// important: mark the job as a watcher callback so that scheduler knows
  // it is allowed to self-trigger (#1727)
  job.allowRecurse = !!cb

  let scheduler: EffectScheduler
  if (flush === 'sync') {
    // 如果为sync，则同步执行，直接调用调度程序函数
    scheduler = job as any 
  } else if (flush === 'post') {
    // 如果是post，queuePostRenderEffect意味着是组件更新之后才执行
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense)
  } else {
    // default: 'pre'
    job.pre = true
    if (instance) job.id = instance.uid
    scheduler = () => queueJob(job)
  }

  const effect = new ReactiveEffect(getter, scheduler)

  if (__DEV__) {
    effect.onTrack = onTrack
    effect.onTrigger = onTrigger
  }

  // initial run
  if (cb) {
    if (immediate) {
      // 设置了immediate，会先调用一下job()
      job()
    } else {
      // 没有设置immediate，就给旧值进行初始化，
      // 例如let message2=ref<string>('rorrot')，旧值就会初始化为rorrot
      oldValue = effect.run()
    }
  } else if (flush === 'post') {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    )
  } else {
    effect.run()
  }

  const unwatch = () => {
    effect.stop()
    if (instance && instance.scope) {
      remove(instance.scope.effects!, effect)
    }
  }

  if (__SSR__ && ssrCleanup) ssrCleanup.push(unwatch)
  return unwatch
}

```

```typescript [job函数]
let oldValue: any = isMultiSource
    ? new Array((source as []).length).fill(INITIAL_WATCHER_VALUE)
    : INITIAL_WATCHER_VALUE//初始化旧值
  const job: SchedulerJob = () => {
    if (!effect.active) {
      return
    }
    if (cb) {
      // watch(source, cb)，为watch的话就获取一下新值
      const newValue = effect.run()
      if (
        deep ||
        forceTrigger ||
        (isMultiSource
          ? (newValue as any[]).some((v, i) => hasChanged(v, oldValue[i]))
          : hasChanged(newValue, oldValue)) ||
        (__COMPAT__ &&
          isArray(newValue) &&
          isCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance))
      ) {
        // cleanup before running cb again
        if (cleanup) {
          cleanup()
        }
        callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          // 第一次执行旧值，判断是undefined或者是空数组
          // 设置了immediate的话，就会将旧值以undefined传递
          oldValue === INITIAL_WATCHER_VALUE
            ? undefined
            : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE
            ? []
            : oldValue,
          onCleanup
        ])
        // 直接赋值
        // 这也是对象的话新值和旧值都是一样，因为这里新值直接赋值给旧值，导致旧值的引用也跟着改变了
        oldValue = newValue
      }
    } else {
      // watchEffect
      effect.run()
    }
  }

```
:::