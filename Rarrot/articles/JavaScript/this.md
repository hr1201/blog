# this
JavaScript中的`this`的值取决于函数调用的上下文。
  
## 全局上下文

在全局执行上下文中(在任何函数之外)，`this`无论是严格模式还是非严格模式下，都引用全局对象。
在web浏览器中，`this`引用的是`window`对象，可以在浏览器中打印`console.log(this)`；而在Node.js中，引用的是`global`。

## 函数上下文

在普通函数内部，`this` 的值取决于函数的调用方式。如果函数在全局上下文中调用，`this` 在严格模式下将为 undefined，在非严格模式下将引用全局对象。
```js
function func() {
  console.log(this);
}

func(); // 在非严格模式的浏览器上下文中记录 "[object Window]"，在严格模式下会记录 "undefined"
```

当函数充当对象的方法时，`this`将引用调用该方法的对象。这展示了`this`的值不绑定于函数本身，而是由函数被调用的方式和位置决定，这个概念称为执行上下文：

```js
let obj = {
  prop: "Hello World!",
  func: function() {
    console.log(this.prop);
  }
}

obj.func(); // "Hello World!"
```
要注意的是，箭头函数没有自己的`this`，箭头函数内部的`this`不由它的调用方式决定，而是由定义时的外部词法上下文决定。
```js
let obj = {
  prop: "Hello World!",
  func: ()=> {
    console.log(this.prop);
  }
}

obj.func(); // "undefined"，this不指向到obj，而是其外部词法上下文
```

## 事件处理程序
在事件处理程序的上下文中，`this`引用附加了事件监听器的元素，与`event.currentTarget`相同。

在此之前，先要了解`event.target`与`event.currentTarget`的区别：
* `event.target`：该属性引用引发事件的实际DOM元素。对于会冒泡的事件特别重要。如果你点击内部元素，事件将冒泡到外部元素，触发它们的事件监听器。

* `event.currentTarget`：该属性引用附加了事件处理程序(如：addEventListener)的元素。这是在事件处理程序函数的上下文中`this`引用的内容。

例如：
```html
<div id="outer">外部元素
  <div id="inner">内部元素</div>
</div>

<script>
document.getElementById('outer').addEventListener('click', function(event) {
  console.log("currentTarget: ", event.currentTarget.id);
  console.log("this: ", event.currentTarget.id);
  console.log("target: ", event.target.id);
});
</script>
```
当点击外部元素时，三个都打印为`outer`。

当点击内部元素时，`event.target.id`将打印为`inner`，这是当前点击的元素；而e`vent.currentTarget.id`和`event.currentTarget.id`将仍然打印为`outer`，因为这是事件处理程序附加的元素。


## 构造函数上下文和类上下文
在这两种上下文中，跟其他的面向对象语言相似，构造函数上下文中会根据new关键字来变更this指向为新对象；类上下文中也同样会引用类的实例。

## 显示/隐式绑定
可以使用***函数***上的 `.call()`、`.apply()` 或 `.bind()` 方法来明确设置 this 的上下文：
```js
function logThis(age, name) {
  console.log(this, age, name);
}

const people = { number: 1 };

logThis.call(people, "18", "小红"); // {number: 1} '18' '小红'

logThis.apply(people, ["25", "小华"]); // {number: 1} '25' '小华'，apply 与 call 的区别在于参数的传递方式

const boundLogThis = logThis.bind(people, "55", "老徐");
boundLogThis(); // {number: 1} '55' '老徐'，返回新函数，非立即执行

boundLogThis.call(people, "18", "小徐"); // {number: 1} '55' '老徐'，bind 之后无法再改变 this 的指向
```
`.call()`、`.apply()` 和 `.bind()` 的区别在于：
* `.call()` 和 `.apply()` **立即调用**函数，`.call()` 接受参数**列表**，`.apply()`接受参数**数组**。
* `.call()` 比 `.apply()`的性能要好，尤其是传入参数超过三个以上的时候。
* `.bind()` 不会立即执行，返回一个**新函数**，它的 `this` 值永久绑定到指定的对象。

### 使用场景
场景1: apply
```js
let arr = [1, 2, 3, 4, 5];
console.log(Math.max.apply(null, arr)); // 5
```

场景2: bind
```html
<!DOCTYPE html>
<html>
<body>
  <button id="btn">点击</button>
  <button id="chuo">戳一戳</button>
  <script>
    var btn = document.getElementById('btn');
    var chuo = document.getElementById('chuo');
    
    // onclick需要一个函数，而不是一个对象，所以使用bind
    btn.onclick = function() {
      console.log(this); // <button id="chuo">戳一戳</button>
    }.bind(chuo);
  </script>
</body>
</html>
```

### 绑定方法和永久`this`上下文
`bind` 方法创建一个新函数，当调用时，将其 `this` 关键字设置为提供的值，以及在调用新函数时提供的一系列参数。

`bind` 方法的独特之处在于它创建了一个永久绑定的 `this` 值，无论后来如何调用该函数，都不会更改 `this` 的值。例如：
```js
function greet() {
  return `你好，我是 ${this.name}`;
}

let person1 = { name: 'Rarrot' };
let person2 = { name: '666' };

// 创建一个与 `person1` 绑定的函数
let greetPerson1 = greet.bind(person1);

console.log(greetPerson1()); // 你好，我是 Rarrot

// 尝试使用 `call` 方法更改上下文；但是，它仍然使用 `person1` 作为 `this` 上下文
console.log(greetPerson1.call(person2)); // 你好，我是 Rarrot

// 相比之下，正常函数调用允许使用 `call` 方法设置 `this` 上下文
console.log(greet.call(person2)); // 你好，我是 666
``` 

## 以下为什么在浏览器中输出为underfined和6？

```javascript
// 'use strict'，在严格模式下，x为underfined，不能进行设置值
function a(xx) {
  this.x = xx;//this指向全局对象，而不是函数内部的作用域。
  return this
};
//a(5)表示对this指向的全局对象的属性x赋值，x赋值为5，
//所以由打印此全局对象的x属性为5。
var x = a(5);
//相当于a(5).x
console.log(x.x)

var y = a(6);
//返回的x为全局对象,前面由于调用了a(6)，所以此时this指向的全局对象的属性x值为6
console.log(x.x)

//相当于a(6).x，可得出a(6)返回的对象的属性x=6。
console.log(y.x) 
```

## 总结

1. 全局对象中的`this`指向
   
   指向的是`window`

2. 全局作用域或者普通函数中的`this`
   
   指向全局`window`

3. `this`永远指向最后调用它的那个对象
   
   在不是箭头函数的情况下

4. **new操作符**改变了`this`的指向
   
5. **apply，call，bind**改变`this`指向
   
   在不是箭头函数的情况下

6. 箭头函数的`this`
   
   它的指向在定义的时候已经确定了
   箭头函数它没有`this`，看外层是否有函数，有就是外层函数的`this`，没有就是`window`
   
7. 匿名函数中的`this`
   
   永远指向了`window`，匿名函数的执行环境具有全局性，因此`this`指向`window`