# WeakSet

ECMAScript 6 新增的“**弱集合**”（WeakSet）是一种新的集合类型，为这门语言带来了集合数据结构。**WeakSet 是 Set 的“兄弟”类型，其 API 也是 Set 的子集**。WeakSet 中的“weak”（弱），描述的是 JavaScript 垃圾回收程序对待“弱集合”中**值**的方式。



## 一、基本API

可以使用 new 关键字实例化一个空的 WeakSet：

```javascript
const ws = new WeakSet(); 
```

弱集合中的**值只能是 Object 或者继承自 Object 的类型**，尝试使用非对象设置值会抛出 TypeError。

如果想在初始化时填充弱集合，则构造函数可以**接收一个可迭代对象**，其中需要包含有效的值。可迭代对象中的每个值都会按照迭代**顺序**插入到新实例中：

```javascript
const val1 = {id: 1},
val2 = {id: 2},
val3 = {id: 3};
// 使用数组初始化弱集合
const ws1 = new WeakSet([val1, val2, val3]);

alert(ws1.has(val1)); // true
alert(ws1.has(val2)); // true
alert(ws1.has(val3)); // true

// 初始化是全有或全无的操作
// 只要有一个值无效就会抛出错误，导致整个初始化失败
const ws2 = new WeakSet([val1, "BADVAL", val3]);
// TypeError: Invalid value used in WeakSet
typeof ws2;
// ReferenceError: ws2 is not defined

// 原始值可以先包装成对象再用作值
const stringVal = new String("val1");
const ws3 = new WeakSet([stringVal]);
alert(ws3.has(stringVal)); // true 
```

初始化之后可以使用 `add()`再添加新值，可以使用 `has()`查询，还可以使用 `delete()`删除：

```javascript
const ws = new WeakSet();

const val1 = {id: 1},
val2 = {id: 2};

alert(ws.has(val1)); // false

ws.add(val1)
.add(val2);
alert(ws.has(val1)); // true
alert(ws.has(val2)); // true

ws.delete(val1); // 只删除这一个值

alert(ws.has(val1)); // false
alert(ws.has(val2)); // true
```

`add()`方法返回**弱集合实例**，因此可以把多个操作连缀起来，包括初始化声明：

```javascript
const val1 = {id: 1},
      val2 = {id: 2},
      val3 = {id: 3};

const ws = new WeakSet().add(val1);

ws.add(val2)
  .add(val3);

alert(ws.has(val1)); // true
alert(ws.has(val2)); // true
alert(ws.has(val3)); // true
```





## 二、弱值

WeakSet 中“weak”表示弱集合的值是“弱弱地拿着”的。意思就是，**这些值不属于正式的引用**，**不会阻止垃圾回收**。来看下面的例子：

```javascript
const ws = new WeakSet();

ws.add({});
```

`add()`方法初始化了一个新对象，并将它用作一个值。因为**没有指向这个对象的其他引用**，所以当这行代码执行完成后，这个对象值就会**被当作垃圾回收**。然后，这个值就从弱集合中消失了，使其成为 一个空集合。 再看一个稍微不同的例子：

```javascript
const ws = new WeakSet();

const container = {
 val: {}
};

ws.add(container.val);

function removeReference() {
 container.val = null;
} 
```

这一次，**container 对象维护着一个对弱集合值的引用**，因此这个对象值不会成为垃圾回收的目标。不过，如果调用了 `removeReference()`，就会摧毁值对象的最后一个引用，垃圾回收程序就可以把这个值清理掉。





## 三、不可迭代值

因为 WeakSet 中的值**任何时候都可能被销毁**，所以**没必要提供迭代其值的能力**。当然，也用不着像` clear()`这样一次性销毁所有值的方法。WeakSet 确实没有这个方法。因为不可能迭代，所以也不可能在不知道对象引用的情况下从弱集合中取得值。即便代码可以访问 WeakSet 实例，也没办法看到其中的内容。

WeakSet 之所以限制**只能用对象作为值**，是为了保证**只有通过值对象的引用才能取得值**。如果允许原始值，那就没办法区分初始化时使用的字符串字面量(原始值)和初始化之后使用的一个相等的字符串了。

```javascript
//字符串字面量
const str="hello"; 

//初始化后的字符串
const str=new String("hello");

const ws=new WeakSet();
const a={name:"abc"}
ws.add(a);
// 创建对象时，会在堆中创建一块内存，a保存的为指向这一块内存的引用，并且a对这一内存为强引用

const a = "abc";
// 由于基本数据类型在内存中是直接存储的，而不是在堆中分配内存，在传递时，传递的是值，而不是堆内存中值的地址。
ws.add(a);
// 所以执行 add 操作时，实际上保存的是新的值 "abc" ，而不是原来 a 变量保存的那个"abc"，
// 在ws中为弱引用，那这样就会有问题，wm 里存储的永远是没有被引用的值，随时都会被回收。
```





## 四、使用弱集合

相比于 WeakMap 实例，WeakSet 实例的用处没有那么大。不过，弱集合在**给对象打标签**时还是有价值的。

来看下面的例子，这里使用了一个普通 Set：

```javascript
const disabledElements = new Set();

const loginButton = document.querySelector('#login');

// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton); 
```

这样，**通过查询元素在不在 disabledElements 中**，就可以知道它**是不是被禁用**了。不过，假如元素从 DOM 树中**被删除**了，它的**引用却仍然保存**在 Set 中，因此垃圾回收程序也不能回收它。



为了让垃圾回收程序回收元素的内存，可以在这里使用 WeakSet：

```javascript
const disabledElements = new WeakSet();

const loginButton = document.querySelector('#login');

// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton); 
```

这样，只要 WeakSet 中任何元素从 DOM 树中被删除，垃圾回收程序就可以忽略其存在，而立即释放其内存（假设没有其他地方引用这个对象）。



