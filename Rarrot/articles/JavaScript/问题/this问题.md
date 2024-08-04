# this问题

问题一：
  
  ```javascript
  function Fun(){
    getName = function(){
      console.log(1);
    }
    return this;
  }

  Fun.getName = function(){
    console.log(2);
  }

  Fun.prototype.getName = function(){
    console.log(3);
  }

  var getName = function(){
    console.log(4);
  }

  function getName(){
    console.log(5);
  }

  Fun.getName();       // 2 不是Fun()
  getName();           // 4 声明的getName优先
  Fun().getName();     // 1 
  getName();           // 1 上一行执行了Fun()，对getName重新赋值
  new Fun().getName(); // 3 Fun()中的getName()没有用this进行指向，所以根据原型链，调用到Fun原型上的getName()
  ```

问题二：

  ```javascript
  var o = {
    a: 10,
    b: {
      fn: function () {
        console.log(this.a); // undefined
        console.log(this); // {fn: ƒ}, this指向b对象
      },
    },
  };
  o.b.fn();
  ```

问题三：

  ```javascript
  window.name = "Rarrot";
  function A() {
    this.name = "A";
  }
  A.prototype.say = function () {
    console.log(this);
    return this.name + 1;
  };

  let a = new A();
  let funa = a.say;
  /* 相当于
  let funa = function () {
    console.log(this); // window
    return this.name + 1;
  };
  */

  console.log(funa()) // Rarrot1
  ```

问题四：

  ```javascript
  var length = 16; // Number
  function fn() {
    return this.length + 1; // this指向全局对象window
  }

  var obj = {
    length: 5,
    method1: function () {
      return fn();
    },
  };

  obj.method2 = fn;
  /* 相当于：
  var obj = {
    length: 5,
    method1: function (fn) {
      return fn();
    },
    method2 = function () {
      return this.lenght + 1;
    }
  };
  */

  console.log(obj.method1()); // 17
  console.log(fn() === obj.method2()); // false 17 !== 6
  console.log(obj.method1() === obj.method2()); // false 17 !== 6
  ```