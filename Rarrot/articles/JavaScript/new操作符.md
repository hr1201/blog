# new操作符

new操作符会进行四步：
1. 创建一个空对象
2. 把空对象和构造函数的prototype关联起来
3. 把构造函数的this绑定到空对象上
4. 根据构造函数的返回值类型返回结果，如果是基础类型就返回空对象，如果是引用类型就返回引用类型

```JavaScript
function newFn(Fun, ...args) {
  // 1. 创建一个空对象
  let obj = {};
  // 2. 把空对象和构造函数的prototype关联起来
  obj.__proto__ = Fun.prototype;
  // 3. 把构造函数的this绑定到空对象上，当构造函数有返回值时，result为返回值，否则为undefined
  const result = Fun.apply(obj,args)
  // 4. 根据构造函数的返回值类型返回结果，如果是基础类型就返回空对象，如果是引用类型就返回引用类型
  return result instanceof Object ? result : obj;
}

function person(name) {
  this.name = name;
}

person.prototype.say = () => {
  console.log('说话');
};

let obj = newFn(person, "Rarrot");
obj.say(); // 说话
console.log(obj) // person {name: 'Rarrot'}
```

为什么要这么写呢？
```js
function Person() {
  this.name = 'Rarrot';

  // 检验第三步时打开下面这行代码
  // return { name: 'new Rarrot' };
}

let person = new Person();

// 检验第一步，原型的指向
person.__proto__ === Person.prototype; // true

// 检验第二步，this的指向
console.log(person); // Person {name: 'Rarrot'}

// 检验第三步，为什么要返回引用类型
// 当Person中返回基础类型，不会变化；当返回引用类型，会返回引用类型
console.log(person); // {name: 'new Rarrot'}
```


## 注意

1. 引用类型之间通过new操作符创建的对象是不相等的，例如：

    ```JavaScript
    function Person() {
      this.name = 'Rarrot';
    }

    let person1 = new Person();
    let person2 = new Person();

    console.log(person1 === person2); // false
    console.log([ 1 ] === [ 1 ]); // false
    ```

2. 对象的key都是**字符串**，如果是引用类型也会自动转换为字符串，例如：
  
    ```JavaScript
    let obj = {};
    let arr1 = { a: 1 };
    let arr2 = { b: 2 };
    
    obj[arr1] = 1;
    obj[arr2] = 2;// arr1.toString() === arr2.toString()，所以会覆盖掉arr1

    for (let key in obj) {
      console.log(key + ':' + obj[key]); // [object Object]:2
    }
    ```

3. 对象找属性|方法的顺序：
   
    在对象本身找 ==> 在构造函数上找 ==> 在对象原型上找 ==> 构造函数原型上找 ==> 对象上一级找 ==> Object.prototype找

    ```JavaScript
    function Person() {
      this.name = 'Rarrot';
      this.age = 777; // 在构造函数中添加
    }
    Person.prototype.age = '999'; // 在构造函数原型上添加

    let person = new Person();
    person.age = '666'; // 在对象本身添加
    person.__proto__.age = '888'; // 在对象原型上添加

    Object.prototype.age = '000'; // 在Object上添加

    console.log(person.age); // 666

    console.log(person.__proto__ === Person.prototype); // true
    console.log(Person.prototype.__proto__ === Object.prototype); // true
    console.log(Object.prototype.__proto__); // null
    ```

##  object

为什么在Object 参考页，会发现左侧列出许多属性和方法——大大超过我们在自己定义的对象中看到的继承成员的数量。

原因在于，继承的属性和方法是定义在 prototype 属性之上的（你可以称之为子命名空间 (sub namespace) ）——那些以 Object.prototype. 开头的属性，而非仅仅以 Object. 开头的属性。

prototype 属性的值是一个对象，我们希望被原型链下游的对象继承的属性和方法，都被储存在其中，而不希望被继承的则放于Object自身，记住每一个对象都有一个原型(prototype)属性，其指向另一个对象。由下图可以看出，prototype内部存在有许多的属性和方法，原因即为以上所述

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202402291750719.png)

于是 Object.prototype.watch()、[Object.prototype.valueOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) 等等成员，适用于任何继承自 Object() 的对象类型，包括使用构造器创建的新的对象实例。

[Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)、[Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)，以及其他不在 prototype 对象内的成员，不会被“对象实例”或“继承自 Object() 的对象类型”所继承。这些方法/属性仅能被 Object() 构造器自身使用。