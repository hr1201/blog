# keep-alive组件

通过设置keep-alive可以缓存组件的状态，当再次访问组件时就不会被重新渲染影响使用体验。

```vue
<template>
    <div class="btn-position">
        <div @click="select(item, index)" :class="active == index ? 'active' : ''" class="btn-style" v-for="(item, index) in data"
            :key="index">
            <div>{{ item.name }}</div>
        </div>
    </div>

    <!-- 设置include属性代表只缓存table组件，例如：:include="['table']" -->
    <!-- 设置exclude属性代表不缓存table组件，例如：:exclude="['table']" -->
    <keep-alive :exclude="['table']">
        <component :is="selectCpn"></component>
    </keep-alive>
</template>

<script setup lang='ts'>
import { reactive, ref, markRaw, shallowRef } from 'vue'
import table from '../table.vue'
import recursionCard from '../递归组件/recursionCard.vue'

const selectCpn = shallowRef(table)

const active = ref()

const data = reactive([
    {
        name: 'table组件',
        cpn: markRaw(table)
    },
    {
        name: '多选按钮组件',
        cpn: markRaw(recursionCard)
    },

])

active.value = 0

const select = (item: any, index: any) => {
    active.value = index
    selectCpn.value = item.cpn
}
</script>
<style scoped></style>
```

在使用组件时，初次进入会触发`onMounted`和`onActivated`钩子，而`onMounted`只有在第一次使用组件会启用，而`onActivated`在第一次使用组件和缓存之后再切换回来都会调用。

在卸载keep-alive组件，也就是缓存的组件切换至另一个组件时，缓存的组件会调用`deactivated`钩子，**钩子是在子组件中生效的**。

::: warning 注意
keep-alive中只能有一个组件。
:::

## 示例

<uses />

<script setup lang='ts'>
import uses from './components/keep-alive组件/A.vue'
</script>

## 源码解读

keep-alive其实缓存的是vnode(虚拟节点)的key，当读取缓存的组件时，会根据vnode的key去缓存中查找是否有这个key，有的话就继承组件实例，并将用于描述组件的 vnode 对象标记为 `COMPONENT_KEPT_ALIVE`，而不是重新创建；如果key不存在，就会将vnode对象的key添加到keys集合中。
```typescript
// #1513 it's possible for the returned vnode to be cloned due to attr
// fallthrough or scopeId, so the vnode here may not be the final vnode
// that is mounted. Instead of caching it directly, we store the pending
// key and cache `instance.subTree` (the normalized vnode) in
// beforeMount/beforeUpdate hooks.
pendingCacheKey = key

if (cachedVNode) {
    // copy over mounted state
    vnode.el = cachedVNode.el
    vnode.component = cachedVNode.component
    if (vnode.transition) {
        // recursively update transition hooks on subTree
        setTransitionHooks(vnode, vnode.transition!)
    }
    // avoid vnode being mounted as fresh
    vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE
    // make this key the freshest
    keys.delete(key)
    keys.add(key)
} else {
    keys.add(key)
    // prune oldest entry
    if (max && keys.size > parseInt(max as string, 10)) {
        pruneCacheEntry(keys.values().next().value)
    }
}
```

在切换至另一个组件时，会将组件搬运到一个隐藏的容器中。
```typescript
sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
    const instance = vnode.component!
    move(vnode, container, anchor, MoveType.ENTER, parentSuspense)
    // in case props have changed
    patch(
        instance.vnode,
        vnode,
        container,
        anchor,
        instance,
        parentSuspense,
        isSVG,
        vnode.slotScopeIds,
        optimized
    )
    queuePostRenderEffect(() => {
        instance.isDeactivated = false
        if (instance.a) {
            invokeArrayFns(instance.a)
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted
        if (vnodeHook) {
            invokeVNodeHook(vnodeHook, instance.parent, vnode)
        }
    }, parentSuspense)

    if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
        // Update components tree
        devtoolsComponentAdded(instance)
    }
}
```