# weakMap，weakSet，set，map


## set

集合是由一组**无序且唯一(即不能重复)的项**组成的，可以想象成集合是一个既没有重复元素，也没有顺序概念的数组。

内置有迭代器，可以使用entries，forEach，for of，且还有以下方法：

```typescript
let set: Set<number> = new Set([1, 2, 3, 4, 5, 6, 6])

set.add(7)

console.log(set)//Set(7) { 1, 2, 3, 4, 5, 6, 7 }

console.log(set.has(7))//true

set.delete(5)

console.log(set.has(5))//false

set.clear()

console.log(set)//Set(0) {}
```





## map

它类似于对象，也是**键值对的集**合，但是“**键**”的范围不限于字符串，**各种类型的值**（包括引用类型，即对象object，array等）都可以当作键，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```typescript
let obj={name:'rarrot'}

let map:Map<object,any>=new Map()

map.set(obj,'1')


console.log(map.get(obj))//1
```





## weakMap

ECMAScript 6 新增的“**弱映射**”（WeakMap）是一种新的集合类型，为这门语言带来了**增强的键/ 值对存储机制**。WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。WeakMap 中的“weak”（弱）， 描述的是 **JavaScript 垃圾回收程序对待“弱映射”中键的方式**。



`注意：`存储的为引用类型



```typescript
// 这里对any只有两次使用，weakmap对obj的操作不会被垃圾回收策略计数
let obj: any = { name: 'rarrot' }//1

let a1: any = obj//2

let weakmap: WeakMap<object, any> = new WeakMap()
weakmap.set(obj, a1)//2

obj = null

console.log("🚀  a1", a1)//🚀  a1 { name: 'rarrot' }

// 当设置a1也为null时，obj就没有被引用了，就会被垃圾回收掉
a1=null

// 这里就获取不到值了
console.log(weakmap)//underfined
console.log(weakmap.get(obj))//underfined
```


以下这张图展示的是obj还没有被垃圾回收时的weakmap，可以看到，即使weakmap中有值，也取不到，如下图：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308021405057.png)



把对obj的引用都给去掉后，并且进行多次刷新，就可以看到Google引擎的v8引擎是把这一个obj给回收了，weakmap中的数据也不存在了，如下图：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308021409742.png)



## weakSet

ECMAScript 6 新增的“**弱集合**”（WeakSet）是一种新的集合类型，为这门语言带来了**集合数据结构**。WeakSet 是 Set 的“兄弟”类型，其 API 也是 Set 的子集。WeakSet 中的“weak”（弱），描述的是 J**avaScript 垃圾回收程序对待“弱集合”中值的方式**。



`注意：`存储的为引用类型



具体可以前往JavaScript的[weakMap](https://www.rorrot.cc/articles/JavaScript/WeakMap.html)和[weakSet](https://www.rorrot.cc/articles/JavaScript/WeakSet.html)。



