# object
为什么在Object 参考页，会发现左侧列出许多属性和方法——大大超过我们在自己定义的对象中看到的继承成员的数量。

原因在于，继承的属性和方法是定义在 prototype 属性之上的（你可以称之为子命名空间 (sub namespace) ）——那些以 Object.prototype. 开头的属性，而非仅仅以 Object. 开头的属性。

prototype 属性的值是一个对象，我们希望被原型链下游的对象继承的属性和方法，都被储存在其中，而不希望被继承的则放于Object自身，记住每一个对象都有一个原型(prototype)属性，其指向另一个对象。由下图可以看出，prototype内部存在有许多的属性和方法，原因即为以上所述

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202402291750719.png)

于是 Object.prototype.watch()、[Object.prototype.valueOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) 等等成员，适用于任何继承自 Object() 的对象类型，包括使用构造器创建的新的对象实例。

[Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)、[Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)，以及其他不在 prototype 对象内的成员，不会被“对象实例”或“继承自 Object() 的对象类型”所继承。这些方法/属性仅能被 Object() 构造器自身使用。