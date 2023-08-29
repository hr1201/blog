# proxy和Reflect

ES6 中的 Proxy 和 Reflect 是两个新的内置对象，它们都是用于拦截并改变对象行为。



## Proxy

proxy 支持对象 数组 函数 set map



### target

要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。



### handler

一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 **p** 的行为。

`handler.get()` 属性读取操作的捕捉器。

`handler.set()` 属性设置操作的捕捉器。



Proxy 对象可以用来创建一个代理，用于控制对**目标对象(target)**的访问。通过在代理对象上定义**特定的处理程序（handler）**，可以对目标对象的读取、赋值、函数调用等操作进行**拦截和自定义处理**。这种方式可以实现很多高级的功能，比如：数据绑定、属性校验、缓存、远程数据访问等等。vue3的响应式原理也是用Proxy实现的。

```typescript
interface person {
    name: string,
    age: number
}
const target: person = { name: "rarrot", age: 66 };

const handler = {
    get(target:any, prop:any) {
        console.log(`获取${prop}`);
        return target[prop];
    },
    set(target:any, prop:any, value:any) {
        console.log(`设置${prop}为${value}`);
        target[prop] = value;
        return true;
    },
};

const proxy = new Proxy(target, handler);

console.log(proxy.name) // 获取name  rarrot
console.log(proxy.age = 100) // 设置age为100  100
```





## Reflect

Reflect 对象提供了一组与 Proxy 对象方法**相对应的方法(方法名和参数一样)**，用于在**处理**程序中显式调用目标**对象的默认行为**。

可以方便地实现对目标对象行为的增强或修改，同时保留目标对象的原始行为。

```typescript
interface person {
    name: string,
    age: number
}
const target: person = { name: "rarrot", age: 66 };
const handler = {
    get(target: person, prop: keyof person) {
        console.log(`获取${prop}`);
        return Reflect.get(target, prop);
    },
    set(target: person, prop: keyof person, value: any) {
        console.log(`设置${prop}为${value}`);
        return Reflect.set(target, prop, value);
    },
};

const proxy = new Proxy(target, handler);

console.log(proxy.name) // 获取name  rarrot
console.log(proxy.age = 100) // 设置age为100  100
```





## 实现proxy版的观察者模式

```typescript
// 初始化一个可以接收函数的Set
const list:Set<Function>=new Set()

const autorun=(cb:Function)=>{
        // 用于添加函数
        list.add(cb)
}

const observable = <T extends object>(params: T) => {
    return new Proxy(params, {
        // receiver也类似于target，适用于一个箭头函数里边再嵌套有箭头函数
        set(target, key, value, receiver) {
            const result=Reflect.set(target, key, value, receiver)
            // 依次调用list中存储的函数
            list.forEach(fn=>fn())
            return result 
        }
    })
}

const personProxy = observable({name:'rarrot',attr:'666'})

autorun(()=>{
    console.log('有变化了')
})

personProxy.attr='你又6 ?'
personProxy.name='rorrot'

console.log(list)//Set(1) { [Function (anonymous)] }
```

