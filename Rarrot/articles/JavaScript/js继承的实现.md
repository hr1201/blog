# js继承的实现

## 原型链实现继承
主要在于父类指向构造函数的prototype，再创建子类。

```javascript
function Parent(name) {
  this.parentProperty = true;
  this.name = name
}

Parent.prototype.getParentProperty = function() {
  return this.parentProperty;
};

function Child() {
  this.childProperty = false;
}

// 继承Parent
Child.prototype = new Parent();

let Child1 = new Child('Child1');
console.log(Child1.getParentProperty())// true
console.log(Child1.name) // undefined
```

**优点**：
- 简单易懂。
- 可以实现函数复用。

**缺点**：
- 来自原型对象的所有属性被所有实例共享。
- 创建子类实例时，不能向父类构造函数传参。

## 构造函数实现继承
主要在于用call或apply将父类的构造函数绑定到子类上，使得子类可以获得父类的属性。

```javascript
function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name); // 使用call继承Parent
}

let Child1 = new Child('child1');
console.log(Child1.name); // child1
```

**优点**：
- 可以实现多继承。
- 创建子类实例时可以向父类传递参数。

**缺点**：
- 方法都在构造函数中定义，每次创建实例都会创建一遍方法。

## 组合式继承
上面两种同时使用，既通过原型链继承方法，又通过构造函数继承属性。

```javascript
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 第二次调用Parent()
  this.age = age;
}

Child.prototype = new Parent(); // 第一次调用Parent()
Child.prototype.constructor = Child; // 修正constructor指向，防止指向Parent

let Child1 = new Child('child1', 18);
Child1.colors.push('black');
console.log(Child1.colors); // ['red', 'blue', 'green', 'black']
```

**优点**：
- 结合了原型链和构造函数的优点。
- 可以向父类传递参数。
- 方法不会被重新创建。

**缺点**：
- 调用了两次父类构造函数（一次是设置子类型原型的时候，另一次是在子类型构造函数内部）。

## ES6的class类继承
ES6引入了class关键字，使得继承实现更加清晰和简单。通过extends关键字和super函数，可以轻松实现类之间的继承。

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 调用父类的constructor(name)
    this.age = age;
  }

  sayAge() {
    console.log(this.age);
  }
}

let Child1 = new Child('child1', 18);
Child1.sayName(); // child1
Child1.sayAge(); // 18
```

**优点**：
- 语法更清晰，更接近传统面向对象的写法。
- extends和super直观易懂。

**缺点**：
- ES6的class本质上还是函数，class的继承依然是基于原型的。
- 需要编译器转换代码，以便在不支持class语法的旧环境中运行。