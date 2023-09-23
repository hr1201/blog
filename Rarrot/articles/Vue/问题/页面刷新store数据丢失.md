# 页面刷新store数据丢失

## Vuex页面刷新状态丢失
### 问题产生
在登录后，由于大部分接口都需要获取到区域名，所以将区域名保存在vuex中，但是在页面**刷新后，区域名的值变为underfined。**

### 原因
在页面刷新时，vue 实例重新加载，store 被重置；store 是**存储组件状态**的，不是用来存储本地数据库的。

所以要用本地存储方式（1.cookie；2.localStorage;3.sessionStorage;根据其存储的原理，这里使用第三种方式）来进行本地存储。


### 解决方法

在 Vue 应用中，Vuex 可以解决页面刷新后数据丢失的问题。Vuex 允许我们将应用的状态存储在一个集中的地方，这个状态可以在应用的各个组件中共享和使用。当页面刷新时，我们可以使用 Vuex 的插件来将应用的**状态持久化到本地存储**中，这样数据就可以在页面刷新后得到保存。

Vuex 提供了一个叫做 **Vuex Persistedstate** 的插件，可以将应用的状态持久化到本地存储中。使用 Vuex Persistedstate 插件非常简单，只需要在创建 Vuex store 时将其作为插件传入即可。下面是一个使用 Vuex Persistedstate 插件的示例：

```js
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
  // 状态
  state: {
    count: 0
  },
  // 修改状态的方法
  mutations: {
    increment(state) {
      state.count++
    }
  },
  // 插件
  plugins: [createPersistedState()]
})
```

在上面的示例中，我们使用了 `vuex-persistedstate` 包中的 `createPersistedState` 方法来创建一个 Vuex 插件，并将其传入 Vuex store 的 `plugins` 选项中。这样，当我们修改应用的状态时，插件会自动将状态持久化到本地存储中。在页面刷新后，我们可以使用 `createPersistedState` 方法来恢复应用的状态。


::: warning 注意
好用虽好用，但不能滥用。
::: 
