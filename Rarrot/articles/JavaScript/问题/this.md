# this

### 以下为什么在浏览器中输出为underfined和6？

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

