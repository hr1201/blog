# Vue核心虚拟DOM和diff算法

## 虚拟DOM

### 原因
之所以需要虚拟dom，是因为一个元素**含有许多的属性（如下图）**且每次更新需要**重新计算布局**(计算每个元素的位置和大小)和**绘制**(将元素绘制在屏幕上)，直接操作DOM的话性能会偏低，这时候我们就可以用**js的计算性能**(也就是通过diff算法)来换取操作DOM所消耗的性能，操作js是非常快的。

![img-230715122](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202307171905274.png)


### 工作流程
  1. 创建虚拟DOM节点：Vue使用JavaScript对象来表示虚拟DOM节点，**每个虚拟DOM节点都代表一个真实的DOM节点**。
  2.  构建虚拟DOM树：将所有虚拟DOM节点组合成一个虚拟DOM树。
  3.  渲染虚拟DOM：将虚拟DOM树渲染到屏幕上。
  4.  更新虚拟DOM：当应用程序的状态发生变化时，Vue会创建一个新的虚拟DOM树。
  5.  比较新旧虚拟DOM树：Vue会将新的虚拟DOM树与旧的虚拟DOM树进行比较，以找出需要更新的部分。这个过程被**称为“diff” 算法**。
  6.  更新真实的DOM：Vue会将需要更新的**部分**转换为真实的DOM操作，并且应用到真实的DOM节点上，从而更新应用程序的UI。


### vnode节点
Vue3中用于创建VNode的函数`createVNode`接受三个参数：标签名、属性对象和子节点。通过调用此函数，我们可以创建一个虚拟DOM节点。

例如，如果我们想创建一个`<div>`标签的虚拟DOM节点，可以使用如下代码:

```typescript
const vnode = createVNode('div', { class: 'container' }, 'Hello, Vue 3!'); 
``` 

在这个例子中，函数的第一个参数是'div'，表示要创建一个`<div>`标签的**虚拟DOM节点**。第二个参数是一个**属性对象**，用于设置class属性为'container'。第三个参数是子节点，这里是一个**文本节点**‘Hello, Vue 3!’。


## 没有key 的diff算法

看Vue3源码：

```typescript

  // 没有key的diff算法
  const patchUnkeyedChildren = (
    c1: VNode[],//旧的虚拟DOM
    c2: VNodeArrayChildren,//新的虚拟DOM
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    c1 = c1 || EMPTY_ARR
    c2 = c2 || EMPTY_ARR
    const oldLength = c1.length
    const newLength = c2.length
    const commonLength = Math.min(oldLength, newLength)
    let i
    //通过下面这个for循环进行生成Patch树，Patch树的每个节点表示一次DOM操作
    for (i = 0; i < commonLength; i++) {
      const nextChild = (c2[i] = optimized
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]))
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
    }
    if (oldLength > newLength) {
      // 当旧节点数大于新节点数时，就把旧节点给删除
      // remove old，删除旧节点
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      )
    } else {
      // 当旧节点数小于新节点数时，就新增节点
      // mount new，增加新节点
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      )
    }
  }
```

![img](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202307181638923.png)



## 有key 的diff算法
看vue3源代码：

```typescript

// 有key的diff算法
  // can be all-keyed or mixed
  const patchKeyedChildren = (
    c1: VNode[],//旧的虚拟DOM
    c2: VNodeArrayChildren,//新的虚拟DOM
    container: RendererElement,
    parentAnchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    let i = 0
    const l2 = c2.length
    let e1 = c1.length - 1 // prev ending index
    let e2 = l2 - 1 // next ending index

    // 前序对比算法，新旧虚拟DOM（n1和n2）进行头和头对比
    // 1. sync from start
    // (a b) c
    // (a b) d e
    while (i <= e1 && i <= e2) {
      const n1 = c1[i]//将c1按序赋值给n1

      //将c2赋值给n2，
      // 如果optimized为真，它会使用VNode对象强制转换c2[i]作为参数调用cloneIfMounted函数，这个函数会进而调用cloneVNode函数，并将结果赋值给c2[i]。
      // 如果optimized为假，则使用c2[i]作为参数调用normalizeVNode函数，这个函数会进而调用createVNode函数，并将结果赋值给c2[i]。
      const n2 = (c2[i] = optimized
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]))

      // 比对两个VNode的类型以及key，Type指的是标签名，key指的是唯一标识，不相同的话直接break，
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else {
        break
      }
      i++
    }

    // 尾序对比算法，尾和尾对比，跟vue2双端diff算法的区别在于vue2还会进行头尾交叉对比
    // 2. sync from end
    // a (b c)
    // d e (b c)
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = (c2[e2] = optimized
        ? cloneIfMounted(c2[e2] as VNode)
        : normalizeVNode(c2[e2]))
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else {
        break
      }
      e1--
      e2--
    }

    // 前面对比完后，发现有多余的节点，就进行新增
    // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1
        const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor
        while (i <= e2) {
          patch(
            null,
            (c2[i] = optimized
              ? cloneIfMounted(c2[i] as VNode)
              : normalizeVNode(c2[i])),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
          i++
        }
      }
    }

    // 发现少了，就进行删除
    // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true)
        i++
      }
    }

    // 乱序情况下的比对
    // 5. unknown sequence
    // [i ... e1 + 1]: a b [c d e] f g
    // [i ... e2 + 1]: a b [e d c h] f g
    // i = 2, e1 = 4, e2 = 5
    // i即为乱序数组([c d e]或[e d c h])第一个值在原数组(a b [c d e] f g或a b [e d c h] f g)的索引，
    // 这里的e1(旧虚拟节点)为乱序数组最后一个值在原数组的索引，e2(新虚拟节点)为为乱序数组最后一个值在原数组的索引
    else {
      const s1 = i // prev starting index
      const s2 = i // next starting index

      // 5.1 build key:index map for newChildren
      const keyToNewIndexMap: Map<string | number | symbol, number> = new Map()
      for (i = s2; i <= e2; i++) {
        const nextChild = (c2[i] = optimized
          ? cloneIfMounted(c2[i] as VNode)
          : normalizeVNode(c2[i]))
        if (nextChild.key != null) {
          if (__DEV__ && keyToNewIndexMap.has(nextChild.key)) {
            warn(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            )
          }
          keyToNewIndexMap.set(nextChild.key, i)
        }
      }

      // 5.2 loop through old children left to be patched and try to patch
      // matching nodes & remove nodes that are no longer present
      let j
      let patched = 0
      const toBePatched = e2 - s2 + 1
      let moved = false
      // used to track whether any node has moved
      let maxNewIndexSoFar = 0
      // works as Map<newIndex, oldIndex>
      // Note that oldIndex is offset by +1
      // and oldIndex = 0 is a special value indicating the new node has
      // no corresponding old node.
      // used for determining longest stable subsequence
      // 记录新节点在旧节点中的位置数组
      const newIndexToOldIndexMap = new Array(toBePatched)
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i]
        if (patched >= toBePatched) {
          // all new children have been patched so this can only be a removal
          // 有多余旧节点就进行删除
          unmount(prevChild, parentComponent, parentSuspense, true)
          continue
        }
        let newIndex
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key)
        } else {
          // key-less node, try to locate a key-less node of the same type
          for (j = s2; j <= e2; j++) {
            if (
              newIndexToOldIndexMap[j - s2] === 0 &&
              isSameVNodeType(prevChild, c2[j] as VNode)
            ) {
              newIndex = j
              break
            }
          }
        }
        // 新节点不包含在旧节点中也进行删除
        if (newIndex === undefined) {
          unmount(prevChild, parentComponent, parentSuspense, true)
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex
          } else {
// 节点出现交叉，moved为true，说明是要移动的，去求新旧子树的最长递增子序列，在5.3中，根据moved的值，调用getSequence函数
            moved = true
          }
          patch(
            prevChild,
            c2[newIndex] as VNode,
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
          patched++
        }
      }

      // 5.3 move and mount
      // generate longest stable subsequence only when nodes have moved
      // 求最长递增子序列升序
      const   increasingNewIndexSequence = moved
        ? getSequence(newIndexToOldIndexMap)
        : EMPTY_ARR
      j = increasingNewIndexSequence.length - 1
      // looping backwards so that we can use last patched node as anchor
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i
        const nextChild = c2[nextIndex] as VNode
        const anchor =
          nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor
        if (newIndexToOldIndexMap[i] === 0) {
          // mount new
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        } else if (moved) {
          // move if:
          // There is no stable subsequence (e.g. a reverse)
          // OR current node is not among the stable sequence
// 如果当前遍历的这个节点 不在 子序列说明要进行移动
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, MoveType.REORDER)
          } else {
            // 如果节点在序列中直接跳过
            j--
          }
        }
      }
    }
  }
```



## 赋值给**新虚拟节点**时使用的函数
看vue3源代码：

```typescript
export function normalizeVNode(child: VNodeChild): VNode {
  if (child == null || typeof child === 'boolean') {
    // empty placeholder
    return createVNode(Comment)
  } else if (isArray(child)) {
    // fragment
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    )
  } else if (typeof child === 'object') {
    // already vnode, this should be the most common since compiled templates
    // always produce all-vnode children arrays
    return cloneIfMounted(child)
  } else {
    // strings and numbers
    return createVNode(Text, null, String(child))
  }
}

// optimized normalization for template-compiled render fns
export function cloneIfMounted(child: VNode): VNode {
  return (child.el === null && child.patchFlag !== PatchFlags.HOISTED) ||
    child.memo
    ? child
    : cloneVNode(child)
}
```


## 最长递增子序列
最长递增子序列目的是在一个给定的数值序列中，找到一个子序列，使得这个子序列元素的数值**依次递增**，并且这个子序列的**长度尽可能地大**，[算法示例执行过程](https://www.wikiwand.com/en/File:LISDemo.gif)，在vue3中传入新节点在旧节点的位置数组至以下函数，获取到升序的递增子序列(由乱序转为有序)，看vue3源代码：

```typescript
// [https://en.wikipedia.org/wiki/Longest_increasing_subsequence](https://en.wikipedia.org/wiki/Longest_increasing_subsequence)
// 贪心+二分，最长递增子序列算法，即找到最长的升序子序列
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
```

## 练习最长递增子序列
可以前往LeetCode练习用代码怎么写出最长递增子序列:

[最长连续递增序列\[简单\]](https://leetcode.cn/problems/longest-continuous-increasing-subsequence)

[最长递增子序列\[中等\]](https://leetcode.cn/problems/longest-increasing-subsequence/)