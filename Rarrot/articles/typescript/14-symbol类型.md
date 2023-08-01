# symbol类型

## 介绍

ES6新增类型。符号是原始值，且符号实例是唯一，不可变的。

## 用途

确保对象属性使用唯一标识符，不会发生属性冲突的危险。符号就是用来创建唯一记号，进而用作非字符串形式的对象属性。符号并非为提供私有属性的行为才增加的。



## 示例

```typescript
let a1: symbol = Symbol(1)//提供唯一的符号
let a2: symbol = Symbol(1)


console.log(a1, a2)//Symbol(1) Symbol(1)

console.log(a1 == a2)//false

// for Symbol for全局symbol有没有注册过key，如果有就会直接拿来用，没有就创建
console.log(Symbol.for('rarrot') === Symbol.for('rarrot'))//true

let obj = {
    name: 1,
    [a1]: 111,
    [a2]: 222
}
// { name: 1, [Symbol(1)]: 111, [Symbol(1)]: 222 }
console.log(obj)

// for in 不能读到symbol
for (let key in obj) {
    console.log(key)//name
}

// Object.keys()同样不能读到symbol
console.log(Object.keys(obj))//[ 'name' ]

// Object.getOwnPropertyNames()还是不能读到symbol
console.log(Object.getOwnPropertyNames(obj))//[ 'name' ]


// 可以只取到symbol
console.log(Object.getOwnPropertySymbols(obj))//[ Symbol(1), Symbol(1) ]

// name和symbol都可以取到
console.log(Reflect.ownKeys(obj))//[ 'name', Symbol(1), Symbol(1) ]
```

