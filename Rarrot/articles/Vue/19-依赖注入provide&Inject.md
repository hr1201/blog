# 依赖注入provide&Inject
在 Vue 3 中，`provide` 和 `inject` 是一种非常强大的依赖注入机制，它允许组件之间进行数据和方法的共享，尤其是在父子组件间或者跨多层级的组件间。

`provide` 和 `inject` 主要用于解决**prop drilling**问题，即在 Vue 应用中，如果有一些数据需要在多层嵌套的组件间传递，通常的做法是通过 props 一层一层地传递。这种方式在组件层级较深或者需要跨级传递数据时，会变得非常繁琐和难以维护。这时，`provide` 和 `inject` 就能派上用场。

## 使用方式
祖先组件：
```vue
<template>
    <div class="box">
    </div>
    <provideAvue></provideAvue>
</template>
<script setup lang='ts'>
import { provide, ref, readonly } from 'vue'
import provideAvue from '../依赖注入provide和inject/provideA.vue'

const colorVal = ref<string>('red')

// 在以下情况，子组件可以更改父组件的boxy，可以用readonly(colorVaal)就不会被修改
provide('color', colorVal)
</script>
<style scoped>
.box {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    background: v-bind(colorVal);
}
</style>
```

子孙组件：
```vue
<template>
    <div class="box">
    </div>
</template>

<script setup lang='ts'>
import { inject, ref } from 'vue'
import type {Ref} from 'vue'

const color=inject<Ref<string>>('color')
</script>
<style scoped>
.box {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    background: v-bind(color);
}
</style>
```

在这个例子中，父组件通过 `provide` 提供了一个 `color` 属性，然后子组件通过 `inject` 注入了这个 `color` 属性，并在模板中使用它。


## 使用场景

1. 当你需要在多层嵌套的组件间共享数据或方法时，可以使用 `provide` 和 `inject`，而不是通过 props 一层一层地传递。

2. 当你需要在一个组件树中的多个组件间共享一些公共的状态或行为时，可以使用 `provide` 和 `inject`。

3. 当你需要实现一些高阶组件或者插件时，可以使用 `provide` 和 `inject`。

::: warning 注意
`provide` 和 `inject` 虽然强大，但它们破坏了组件的封装性，使得组件的耦合度增加，需要谨慎使用。
:::

## 源码解读
看代码以及注释：
::: code-group

```typescript [provide]
export function provide<T, K = InjectionKey<T> | string | number>(
  key: K,
  value: K extends InjectionKey<infer V> ? V : T
) {
  if (!currentInstance) {
    if (__DEV__) {
      warn(`provide() can only be used inside setup().`)
    }
  } else {
    // currentInstance当前组件的实例
    let provides = currentInstance.provides
    // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.
    // provides，默认情况下，实例继承其父级的provides对象，如果当前组件有自己的provide，它使用 父provides 对象
    // 作为原型来创建自己的Provideos对象，在“inject”中，我们可以直接从父级并让原型链完成工作。
    const parentProvides =
      currentInstance.parent && currentInstance.parent.provides
    if (parentProvides === provides) {
      // 从父组件的provides基础上去创建一个新的对象
      // 可以用let a={name:'Rarrot'};let b=object.create(a)去测试一下，看一下b的原型链
      provides = currentInstance.provides = Object.create(parentProvides)
    }
    // TS doesn't allow symbol as index type
    // 在新的对象上增加了这次provide的值
    provides[key as string] = value
  }
}
```

```typescript [inject]
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T,
  treatDefaultAsFactory?: false
): T
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T | (() => T),
  treatDefaultAsFactory: true
): T
export function inject(
  key: InjectionKey<any> | string,
  defaultValue?: unknown,
  treatDefaultAsFactory = false
) {
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  const instance = currentInstance || currentRenderingInstance

  // also support looking up from app-level provides w/ `app.runWithContext()`
  if (instance || currentApp) {
    // #2400
    // to support `app.use` plugins,
    // fallback to appContext's `provides` if the instance is at root
    // inject，查询父级的provide，如果实例是在根目录，回退到appContext的provides中
    const provides = instance
      ? instance.parent == null
        ? instance.vnode.appContext && instance.vnode.appContext.provides
        : instance.parent.provides
      : currentApp!._context.provides

    if (provides && (key as string | symbol) in provides) {
      // TS doesn't allow symbol as index type
      return provides[key as string]
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue)
        ? defaultValue.call(instance && instance.proxy)
        : defaultValue
    } else if (__DEV__) {
      warn(`injection "${String(key)}" not found.`)
    }
  } else if (__DEV__) {
    warn(`inject() can only be used inside setup() or functional components.`)
  }
}

```

::: 