# nextTick

Vue 3中的DOM更新是异步进行的，这意味着当你更改了某些数据时，视图不会立即更新。Vue会将这些更改放入一个队列中，在稍后的时刻一起执行，以提高效率。听起来就像把你的快递包裹塞到已经超满的卡车上，而Vue就是一个聪明的物流主管，它选择合适的时机发送出去。


## 示例
下面代码中通过一个文本框发送消息，它应该立即出现在聊天框中，并且视图要滚动到最新的消息。

在这个小案例中，就涉及到了数据更新和DOM更新。关键点来了，更新DOM时，我们常用的操作，比如`element.scrollTop = newScrollTop`，是同步进行的。但是DOM更新是异步操作，所以当更新滚动条位置时，可能新消息的DOM还没渲染出来。

这时候就可以用到`nextTick`，`nextTick`就像是一个“等一下”的信号，它告诉Vue："Hey，等你把这堆异步工作做完后，通知我一声，我还有点事要做呢！"。

代码如下：
```vue
<template>
    <div class="boxs">
        <div ref="box" class="chats">
            <div v-for="message in messages" class="chat">
                <p>{{ message }}</p>
            </div>
        </div>
        <textarea v-model="sendM" class="send">

        </textarea>
        <button @click="send">send</button>
    </div>
</template>

<script setup lang='ts'>
import { ref,nextTick } from 'vue'

const messages = ref<string[]>(['Rarrot:你好'])

const sendM = ref<string>()

const box = ref<HTMLDivElement>()

const send = async () => {
    if (sendM.value && sendM.value != '') {
        messages.value?.push('小明说:' + sendM.value)
        // sendM.value = ''
        
        // 1. 给nextTick传入一个回调函数
        // nextTick(()=>{
        //     box.value!.scrollTop = 12345678
        // })

        // 2. 将send函数变为异步函数，然后使用以下代码：
        // nextTick()返回一个Promise，
        // await关键字是用来等待一个异步操作完成的，在这里会等待异步DOM更新后再执行后面的代码，直到被等待的Promise被解决（或拒绝）。
        await nextTick()
        box.value!.scrollTop = 12345678
    }
}
</script>
<style lang="less" scoped>
.boxs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .chats {
        width: 450px;
        height: 450px;
        border: 1px solid #ccc;
        overflow: auto;
        .chat {
            padding: 8px;
            background-color: #c0bec0;
            margin-bottom: 1px;
            p {
                font-size: 18px;
            }
        }
    }
    .send {
        .chats();
        height: 80px;
        margin-top: 10px;
    }
    button {
        margin-left: 350px;
        width: 100px;
    }
}
</style>
```
`nextTick`让我们能够在Vue完成DOM更新后执行某些操作，解决数据更新和DOM更新的时间差问题。


## 源码解读
在源码中，`nextTick()`是将传入的函数放到Promise中，然后执行一个微任务：

::: code-group
```ts [nextTick()]
export function nextTick<T = void, R = void>(
  this: T,
  fn?: (this: T) => R
): Promise<Awaited<R>> {
  const p = currentFlushPromise || resolvedPromise

  // 1. 若函数 fn 存在：
  // 1.1 若 this 存在（即 nextTick 函数被一个对象调用），则将 fn 绑定到 this 上，这样在 fn 中使用 this 时，它将引用调用 nextTick 的对象。
  // 1.2 若 this 不存在（即 nextTick 函数被直接调用），则不需要绑定 fn，直接使用原始的 fn。

  // 2. 若函数 fn 不存在：
  // 2.1 则直接返回 p 这个已解析的 Promise。 
  return fn ? p.then(this ? fn.bind(this) : fn) : p
}
```

```ts [currentFlushPromise]
let currentFlushPromise: Promise<void> | null = null
```

```ts [resolvedPromise]
const resolvedPromise = /*#__PURE__*/ Promise.resolve() as Promise<any>
```
:::


<!-- 更新队列：。。。实力不足，待定 -->
