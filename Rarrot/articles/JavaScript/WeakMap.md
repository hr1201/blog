# WeakMap

ECMAScript 6 新增的“**弱映射**”（WeakMap）是一种新的集合类型，为这门语言带来了**增强的键/ 值对存储机制**。WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。WeakMap 中的“weak”（弱）， 描述的是 **JavaScript 垃圾回收程序对待“弱映射”中键的方式**。



## 一、基本API

可以使用 new 关键字实例化一个空的 WeakMap：

```javascript
const wm = new WeakMap(); 
```

**弱映射中的键**只能是 **Object 或者继承自 Object 的类型**，尝试使用非对象设置键会抛出 TypeError。值的类型没有限制。

如果想在初始化时填充弱映射，则构造函数可以接收一个**可迭代对象**，其中需要包含键/值对数组。可迭代对象中的每个键/值都会**按照迭代顺序插入新实例**中：

```javascript
const key1 = {id: 1},
      key2 = {id: 2}, 
key3 = {id: 3};
// 使用嵌套数组初始化弱映射
const wm1 = new WeakMap([
 [key1, "val1"],
 [key2, "val2"],
 [key3, "val3"]
]);
alert(wm1.get(key1)); // val1
alert(wm1.get(key2)); // val2
alert(wm1.get(key3)); // val3

// 初始化是全有或全无的操作
// 只要有一个键无效就会抛出错误，导致整个初始化失败
const wm2 = new WeakMap([
 [key1, "val1"],
 ["BADKEY", "val2"],
 [key3, "val3"]
]);
// TypeError: Invalid value used as WeakMap key
typeof wm2;
// ReferenceError: wm2 is not defined

// 原始值可以先包装成对象再用作键
const stringKey = new String("key1");
const wm3 = new WeakMap([
 stringKey, "val1"
]);
alert(wm3.get(stringKey)); // "val1"
```

初始化之后可以使用 `set()`再添加键/值对，可以使用 `get()`和 `has()`查询，还可以使用 `delete()` 删除：

```javascript
const wm = new WeakMap();

const key1 = {id: 1},
key2 = {id: 2};

alert(wm.has(key1)); // false
alert(wm.get(key1)); // undefined

wm.set(key1, "Matt")
.set(key2, "Frisbie");

alert(wm.has(key1)); // true
alert(wm.get(key1)); // Matt

wm.delete(key1); // 只删除这一个键/值对

alert(wm.has(key1)); // false
alert(wm.has(key2)); // true
```

`set()`方法返回弱映射实例，因此可以把多个操作连缀起来，包括初始化声明：

```javascript
const key1 = {id: 1},
key2 = {id: 2},
key3 = {id: 3};
const wm = new WeakMap().set(key1, "val1");
wm.set(key2, "val2")
.set(key3, "val3");

alert(wm.get(key1)); // val1
alert(wm.get(key2)); // val2
alert(wm.get(key3)); // val3
```





## 二、弱键

WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，**这些键不属于正式的引用，不会阻止垃圾回收。**但要注意的是，弱映射中**值的引用**可**不是**“弱弱地拿着”的。只要**键存在**，键/值对就会存在于映射中，并**被当作对值的引用**，因此就不会被当作垃圾回收。

```javascript
const wm = new WeakMap();
wm.set({}, "val");
```

`set()`方法**初始化了一个新对象**并将它用作一个字符串的**键**。因为**没有指向这个对象的其他引用**，所以当这行代码执行完成后，这个对象键就会**被当作垃圾回收**。然后，这个**键/值对就从弱映射中消失**了，使其成为一个**空映射**。在这个例子中，因为**值也没有被引用**，所以这对键/值被破坏以后，**值本身也会成为垃圾回收的目标**。

再看一个稍微不同的例子：

```javascript
const wm = new WeakMap();

const container = {
 key: {}
};

wm.set(container.key, "val");

function removeReference() {
 container.key = null;
}
```

这一次，container 对象维护着一个对弱映射键的引用，因此这个对象键不会成为垃圾回收的目标。不过，如果调用了 `removeReference()`，就会**摧毁键对象的最后一个引用**，垃圾回收程序就可以**把这个键/值对清理**掉。



用例子看一下weakmap和map的区别：

```javascript
const m=new Map();
let v2={name:"Mary"};
m.set(v2,"top");
v2=null;
console.log(...m.values());//top，v2的引用仍然存在于映射中
console.log(m.keys());//[Map Iterator] { { name: 'Mary' } }

const wm = new WeakMap(); 
let v={name: "John"};
wm.set(v, "val");
//v的引用将会在内存中消失，也不会被保存弱映射中，这也是为什么说弱映射的键是"弱弱地拿着的"，
//因为WeakMap的键是对对象的弱引用，但在设置为null后，并不会阻止对其的垃圾回收
v=null;
console.log(wm.size);//underfined
```



为什么对对象的弱引用会被垃圾回收所清理，而强引用不会？

`答：`强引用和弱引用之间的区别在于它们对对象的生命周期的影响。强引用会使对象一直存在于内存中，而弱引用则不会，它允许对象在不再被使用时被垃圾回收。如果使用的垃圾回收策略为引用计数，那么弱引用是不会增加对象引用计数的一种引用；占用空间上，强引用会比弱引用相对多一点，除了指向所引用对象的指针外，还有可能包括其他元数据，如引用计数等。



用node的`--expose-gc`可进行手动执行垃圾回收机制，可明显看出，将b置空后，所使用的`headUsed`(用到的"堆"的部分)也与原来的类似，说明在weakmap中的引用也被清理，并没有内存溢出。

  ![image-20230418220526777](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/image-20230418220526777.png)


由下图可知道，Map对键的引用为强引用，在将a置空后，只清除了一半的内存空间，仍然保留了a的引用，造成了内存泄露。也可以说明Map中保留的为原始对象的引用。

  ![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308021419714.png)




## 三、不可迭代键

因为 WeakMap 中的键/值对任何时候都可能被销毁，所以没必要提供迭代其键/值对的能力。当然，也用不着像 `clear()`这样一次性销毁所有键/值的方法。WeakMap 确实没有这个方法。因为**不可能迭代**，所以**也不可能在不知道对象引用的情况下从弱映射中取得值**。即便代码可以访问 WeakMap 实例，也没办法看到其中的内容。 WeakMap 实例之所以限制**只能用对象作为键**，是为了**保证只有通过键对象的引用才能取得值**。如果允许原始值，那就没办法区分初始化时使用的字符串字面量和初始化之后使用的一个相等的字符串了。

```javascript
const wm=new WeakMap();
const a = {};
// 在创建对象时，在堆中分配了一块内存，并把这块内存的地址传给 a
wm.set(a, 1);
// 执行 set 操作时，实际上是将 a 指向的内存地址作为键和值 1 关联起来

const a = "ab";
// 由于基本数据类型在内存中是直接存储的，而不是在堆中分配内存，在传递时，传递的是值，而不是堆内存中值的地址。
wm.set(a, 1);
// 所以执行 set 操作时，实际上是将新的键 "ab" 和值 1 关联起来，而不是原来 a 变量指向的那个"ab"
// "ab"为新键，且对其为弱引用，那这样就会有问题，wm 里存储的永远是没有被引用的键，随时都会被回收。
```

参考博客： [https://jishuin.proginn.com/p/763bfbd6b694](https://jishuin.proginn.com/p/763bfbd6b694)





## 四、使用弱映射

WeakMap 实例与现有 JavaScript 对象有着很大不同，可能一时不容易说清楚应该怎么使用它。这个问题没有唯一的答案，但已经出现了很多相关策略。

### 1.私有变量

**弱映射**造就了在 JavaScript 中**实现真正私有变量的一种新方式**。前提很明确：**私有变量**会存储在弱映射中，以对象**实例为键**，以私有成员的**字典为值**。

下面是一个示例实现：

```javascript
const wm=new WeakMap(); 
const a = {};
// 在创建对象时，在堆中分配了一块内存，并把这块内存的地址传给 a
wm.set(a, 1);
// 执行 set 操作时，实际上是将 a 指向的内存地址作为键和值 1 关联起来

const a = "ab";
// 由于基本数据类型在内存中是直接存储的，而不是在堆中分配内存，在传递时，传递的是值，而不是堆内存中值的地址。
wm.set(a, 1);
// 所以执行 set 操作时，实际上是将新的键 "ab" 和值 1 关联起来，而不是原来 a 变量指向的那个"ab"
// "ab"为新键，且对其为弱引用，那这样就会有问题，wm 里存储的永远是没有被引用的键，随时都会被回收。
```


对于上面的实现，外部代码只需要拿到对象实例的引用和弱映射，就可以取得“私有”变量了。为了避免这种访问，可以用一个**闭包**把 WeakMap 包装起来，这样就可以**把弱映射与外界完全隔离开**了：

```javascript
const wm3 = new WeakMap();
class User {
 constructor(id) {
  //创建独一无二的id标识符，作用是用来作为对象的属性名，以避免属性名冲突的问题，
  // 同时Symbol类型的值是不可变的，因此它可以用作对象的私有属性名
   this.idProperty = Symbol('id');
   this.setId(id);
 }

//  设置私有属性
 setPrivate(property, value) {
   //wm3.get(this) 用来获取存储在wm3中的以this为键的值，即当前对象的私有属性。
//如果该值不存在，则返回一个空对象 {}。
   const privateMembers = wm3.get(this) || {};
   console.log(privateMembers);
   
   privateMembers[property] = value;

  //  以当前对象为键，私有成员为值
   wm3.set(this, privateMembers);
 }
// 获取私有属性
 getPrivate(property) {
   return wm3.get(this)[property];
 }

 setId(id) {
   this.setPrivate(this.idProperty, id);
 }

 getId() {
   return this.getPrivate(this.idProperty);
 }
}

const user = new User(123);//调用构造函数，构造函数里面调用了setId，进而调用了setPrivate，返回{}
console.log(user.getId()); // 123
user.setId(456);//setId中调用了setPrivate，所以返回{ [Symbol(id)]: 123 }
console.log(user.getId()); // 456

// 并不是真正私有的
console.log(wm3.get(user)[user.idProperty]); // 456
```

对于以上实现，外部代码只需要拿到对象实例的引用和弱映射，就可以取得“私有”变量了。为了避免这种访问，可以**用一个闭包(在User中的箭头函数里面定义了User类，且引用了wm，即形成闭包)把 WeakMap 包装起来**，这样就可以把弱映射与外界完全隔离开了：

```javascript
const User = (() => {
  const wm = new WeakMap();
  class User {
    constructor(id) {
      this.idProperty = Symbol('id');
      this.setId(id);
    }
    setPrivate(property, value) {
      const privateMembers = wm.get(this) || {};
      privateMembers[property] = value;
      wm.set(this, privateMembers);
    }
    getPrivate(property) {
      return wm.get(this)[property];
    }
    setId(id) {
      this.setPrivate(this.idProperty, id);
    }
    getId(id) {
      return this.getPrivate(this.idProperty);
    }
  }
  return User;
})();
const user = new User(123);
alert(user.getId()); // 123
user.setId(456);
alert(user.getId()); // 456
```

这样，拿不到弱映射中的健，也就无法取得弱映射中对应的值。虽然这防止了前面提到的访问，但整个代码也完全**陷入了 ES6 之前的闭包私有变量模式**。





### 2.DOM节点元数据

因为**WeakMap**实例不会妨碍垃圾回收，所以**非常适合保存关联元数据**。例如：

```javascript
const m = new Map();

const loginButton = document.querySelector('#login');
// 给这个节点关联一些元数据
m.set(loginButton, {disabled: true});
```

假设在上面的代码执行后，页面被 JavaScript 改变了，原来的登录按钮从 DOM 树中被删掉了。但**由于映射中还保存着按钮的引用，所以对应的 DOM 节点仍然会逗留在内存中**，除非明确将其从映射中删除或者等到映射本身被销毁。



如果这里使用的是弱映射，如以下代码所示，那么当节点从 DOM 树中被删除后，垃圾回收程序就可以立即释放其内存（假设没有其他地方引用这个对象）：

```javascript
const wm = new WeakMap();

const loginButton = document.querySelector('#login');
// 给这个节点关联一些元数据
wm.set(loginButton, {disabled: true});
```

