# Teleport传送组件

使用`to`属性可以将组件传送至任何存在的选择器下，例如可以使其不受原先的父选择器影响使用`disaled`属性可以动态设置Teleport是否起作用，true为不起作用，例如：

::: code-group
```vue [A.vue]
<template>
    <div class="dialog">
        <header class="header">
            <div>我是弹框</div>
            <el-icon>
                <CloseBold />
            </el-icon>
        </header>
        <main class="main">
            我是内容12321321321
        </main>
        <footer class="footer">
            <button size="small">取消</button>
            <button size="small" type="primary">确定</button>
        </footer>
    </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>
<style lang="less" scoped>
.dialog {
    width: 400px;
    height: 400px;
    background: #141414;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -200px;

    .header {
        display: flex;
        color: #CFD3DC;
        border-bottom: 1px solid #636466;
        padding: 10px;
        justify-content: space-between;
    }

    .main {
        flex: 1;
        color: #CFD3DC;
        padding: 10px;
    }

    .footer {
        border-top: 1px solid #636466;
        padding: 10px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
```

```vue [use.vue]
<template>
    <div class="parent">
        <Teleport :disabled="false" to="body">
            <A></A>
        </Teleport>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive, watch, defineAsyncComponent } from 'vue'
import A from './A.vue'

</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.parent {
    background-color: skyblue;
    height: 50vh;
    /* 设置position为relative时，A组件设置了绝对定位，会相对父级元素进行移动*/
    position: relative;
}
</style>
```
:::
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202311121542391.png)

这时候，A组件将不受parent选择器影响，而是受body样式影响。


## 源码解读
1. `Teleport`通过`querySelector`读取`to`属性中的值(选择器)，然后返回这个元素，没有这个选择器就返回报错；
```typescript
const target = (n2.target = resolveTarget(n2.props, querySelector))
```

2. 通过判断`disabled`调用`mount()`进行子节点的挂载，源码：
   ```typescript
    if (disabled) {
        // 当disabled为true则在原先位置进行挂载
        mount(container, mainAnchor)
    } else if (target) {
        // 不是的话,就将其挂载至target中,也就是to属性的值中
        mount(target, targetAnchor)
    }
   ```

3. 进行子节点的挂载:
   ```typescript
    const mount = (container: RendererElement, anchor: RendererNode) => {
        // Teleport *always* has Array children. This is enforced in both the
        // compiler and vnode children normalization.
        // 挂载子节点
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(
                children as VNodeArrayChildren,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                isSVG,
                slotScopeIds,
                optimized
            )
        }
    }
   ```


4. 如果`disabled`为true，则将挂载的元素移动回原先位置，否则移动至目标位置：
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202311121617500.png)

5. 当子节点没有进行挂载时，会将其删除：
```typescript
  remove(
    vnode: VNode,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    optimized: boolean,
    { um: unmount, o: { remove: hostRemove } }: RendererInternals,
    doRemove: Boolean
  ) {
    const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode

    if (target) {
      hostRemove(targetAnchor!)
    }

    // an unmounted teleport should always remove its children if not disabled
    if (doRemove || !isTeleportDisabled(props)) {
      hostRemove(anchor!)
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        for (let i = 0; i < (children as VNode[]).length; i++) {
          const child = (children as VNode[])[i]
          unmount(
            child,
            parentComponent,
            parentSuspense,
            true,
            !!child.dynamicChildren
          )
        }
      }
    }
  },
```