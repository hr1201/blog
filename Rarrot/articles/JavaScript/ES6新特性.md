# ES6新特性

## 1. 新增块级作用域(let, const)
`let`和`const`引入了块级作用域，`let`用于声明变量，`const`用于声明常量。

```javascript
{
  let x = 10;
  const y = 20;
  console.log(x); // 10
  console.log(y); // 20
}
// console.log(x); // ReferenceError: x is not defined
// console.log(y); // ReferenceError: y is not defined
```

`let`，`const`不具备变量提升，若提前调用，将会报错，称为"暂时性死区"(temporal dead zone，简称 TDZ)；而`var`是函数作用域，且具备变量提升。

```javascript
console.log(a); // undefined
var a = 1;

// TDZ开始
tmp = 3; // ReferenceError
console.log(b); // ReferenceError: b is not defined
let b = 2;// TDZ结束
console.log(b); // 2
```
参考文章：[ES6 let、const、var、暂时性死区](https://juejin.cn/post/6844903753015885831)

## 2. 新增定义类的语法糖(class)
`class`关键字提供了更清晰的语法来定义类。

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

const person = new Person('John');
person.sayName(); // John
```

## 3. 新增一种基本数据类型(Symbol)
`Symbol`是一种新的基本数据类型，表示独一无二的值。

```javascript
const sym1 = Symbol('foo');
const sym2 = Symbol('foo');
console.log(sym1 === sym2); // false
```

## 4. 新增解构赋值
解构赋值允许从数组或对象中提取值，并将其赋值给变量。

```javascript
const [a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

const {name, age} = {name: 'John', age: 30};
console.log(name); // John
console.log(age); // 30
```

## 5. 新增函数参数的默认值
函数参数可以有默认值。

```javascript
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}

greet(); // Hello, Guest!
greet('John'); // Hello, John!
```

## 6. 给数组新增API
ES6为数组新增了许多API，如`find`、`findIndex`、`includes`等。

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.find(x => x > 3)); // 4
console.log(arr.findIndex(x => x > 3)); // 3
console.log(arr.includes(3)); // true
```

## 7. 对象和数组新增扩展运算符
扩展运算符`...`可以用于数组和对象的展开和合并。

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

const obj1 = {a: 1, b: 2};
const obj2 = {...obj1, c: 3};
console.log(obj2); // {a: 1, b: 2, c: 3}
```

> **Q**：如果将展开运算符作为参数进行传递，要怎么获取这些参数呢？

**A**: 可以使用以下方式：
```javascript
// 1. 可以通过arguments对象获取
function sum() {
  return [...arguments].reduce((acc, val) => acc + val, 0);
}

console.log(sum(1, 2, 3)); // 6

// 2. 使用rest参数
function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}

console.log(sum(1, 2, 3)); // 6

// 3. 使用箭头函数
const sum = (...args) => args.reduce((acc, val) => acc + val, 0);

console.log(sum(1, 2, 3)); // 6

// 4. 使用解构赋值
const person = {
  name: 'Rarrot',
  age: 66
};

function printPersonDetails({ name, age, country = 'China' }) {
  console.log(`Name: ${name}`); // Name: Rarrot
  console.log(`Age: ${age}`); // Age: 66
  console.log(`Country: ${city}`); // Country: China
}

printPersonDetails({ ...person });
```

## 8. Promise
[`Promise`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2Fd%3A%2F%E7%AC%94%E8%AE%B0%2Fblog%2FRarrot%2Farticles%2FJavaScript%2FES6%E6%96%B0%E7%89%B9%E6%80%A7.md%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A16%2C%22character%22%3A0%7D%5D "Rarrot/articles/JavaScript/ES6新特性.md")用于处理异步操作。

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Success'), 1000);
});

promise.then(result => console.log(result)); // Success
```

## 9. 新增模块化(import, export)
ES6引入了模块化语法`import`和`export`。

```javascript
// module.js
export const name = 'John';
export function greet() {
  console.log('Hello');
}

// main.js
import {name, greet} from './module.js';
console.log(name); // John
greet(); // Hello
```

## 10. 新增set和map数据结构
`Set`和`Map`是新的数据结构，`Set`用于存储唯一值，`Map`用于存储键值对。

```javascript
const set = new Set([1, 2, 3, 3]);
console.log(set); // Set { 1, 2, 3 }

const map = new Map();
map.set('a', 1);
map.set('b', 2);
console.log(map.get('a')); // 1
```

## 11. 新增generator和iterator
`Generator`函数可以生成一个迭代器对象。

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

## 12. 新增箭头函数
箭头函数提供了更简洁的函数定义语法，并且不绑定`this`。

```javascript
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
```

## 13. 新增模板字符串
模板字符串使用反引号`` ` ``，可以嵌入变量和表达式。

```javascript
const name = 'John';
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, John!
```

## 14. 新增for of循环
`for...of`循环用于遍历可迭代对象。

```javascript
const arr = [1, 2, 3];
for (const value of arr) {
  console.log(value); // 1, 2, 3
}
```

## 15. 新增代理Proxy
`Proxy`用于创建一个对象的代理，可以拦截和自定义基本操作。

```javascript
const target = {
  message: "Hello"
};

const handler = {
  get: function(target, prop, receiver) {
    return prop in target ? target[prop] : "Not Found";
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.message); // Hello
console.log(proxy.nonExistent); // Not Found
```

## 16. async
[`async`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2Fd%3A%2F%E7%AC%94%E8%AE%B0%2Fblog%2FRarrot%2Farticles%2FJavaScript%2FES6%E6%96%B0%E7%89%B9%E6%80%A7.md%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A32%2C%22character%22%3A0%7D%5D "Rarrot/articles/JavaScript/ES6新特性.md")函数使得异步代码更易于编写和理解。

```javascript
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
}

fetchData();
```