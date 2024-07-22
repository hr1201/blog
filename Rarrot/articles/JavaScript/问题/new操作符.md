# new操作符

new操作符会进行四步：
1. 创建一个空对象
2. 把空对象和构造函数的prototype关联起来
3. 把构造函数的this绑定到空对象上
4. 根据构造函数的返回值类型返回结果，如果是值类型就返回空对象，如果是引用类型就返回引用类型

```JavaScript
function newFn(Fun, ...args) {
  // 1. 创建一个空对象
  let obj = {};
  // 2. 把空对象和构造函数的prototype关联起来
  obj.__proto__ = Fun.prototype;
  // 3. 把构造函数的this绑定到空对象上
  const result=Fun.apply(obj,args)
  // 4. 根据构造函数的返回值类型返回结果，如果是值类型就返回空对象，如果是引用类型就返回引用类型
  return result instanceof Object ? result : obj;
}

function person(name) {
  this.name = name;
}

person.prototype.say = () => {
  console.log('说话');
};

let obj = newFn(person, "Rarrot");
obj.say();
console.log(obj)
```