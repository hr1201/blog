# 装饰器Decorator

在写装饰器语法前，先去`tsconfig.json`中将`"experimentalDecorators": true,`和`"emitDecoratorMetadata": true,`开启。



装饰器是一种特殊类型的声明，它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上。



## 类装饰器

```typescript
// target返回的为构造函数
const base:ClassDecorator=(target)=>{
    console.log(target)//[class Http]
    target.prototype.author='rarrot'
    target.prototype.fn=()=>{
        console.log('666')
    }
}

// @base即为装饰器的一个语法,编译阶段会自动调用base函数
// 装饰器的一个用处在于可以在不查看不破坏Http类的情况下，为其添加属性方法
@base
// 不使用@base也可以，可以使用以下形式：
// base(Http)

class Http{
    // ...... 
}

const http=new Http() as any

console.log(http.author)//rarrot
http.fn()//666
```


## 装饰器工厂

其实就是将类装饰器放入函数里面，形成闭包，而外层包裹的函数可自定义参数，这样就得到装饰器工厂，我们可以对其参数自定义，只要在里边接收的函数后面进行返回就行，例如：

```typescript
// 这样写可以称之为函数颗粒化或者闭包
const base = (str: string) => {
    const fn: ClassDecorator = (target) => {
        console.log(target)//[class Http]
        target.prototype.author = str
        target.prototype.fn = () => {
            console.log('666')
        }
    }
    return fn
}


@base('rarrots')

class Http {
    // ...... 
}

const http = new Http() as any

console.log(http.author)//rarrots
http.fn()//666

```


## 属性装饰器

会返回两个参数：

1. 对于**静态成员**来说是类的**构造函数**，对于**实例成员**是类的**原型对象**
2. 属性的名字

```typescript
const name:PropertyDecorator=(target,key) =>{
    console.log(target,key)//{} rarrot
}
class Http {
    @name
    rarrot:string
    constructor(){
       this.rarrot='rarrotsss'
    }
}


```


## 更多装饰器

以下代码中包含：

1. 方法装饰器 MethodDecorator PropertyDescriptor；MethodDecorator返回三个参数：
  - target: Object，对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  - propertyKey: string | symbol，成员的名字
  - descriptor: TypedPropertyDescriptor<T\>，成员的属性描述符




2. 参数装饰器 ParameterDecorator，返回三个参数：
  - target: Object，对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  - propertyKey: string | symbol，成员的名字
  - parameterIndex: number，参数在函数参数列表中的索引




查看代码顺序：

- 从Http类开始看，可以发现先自动调用了Get()函数，就可以查看Get()函数是通过axios库发送了一个get请求，并将数据传给了getList(data)；
- 之后在getList()中调用Result()方法，可以看到Result()方法使用第三方库reflect-metadata，进行元数据存储，可以更方便地调用到数据。



使用axios发送请求，并装饰在Http中的代码：

```typescript
// Get方法使用了装饰器工厂
const Get = (url: string) => {
    // 使用了方法装饰器
    const fn: MethodDecorator = (target, keys: any, descriptor: PropertyDescriptor) => {

        /*
            {} getList {
                value: [Function: getList],
                writable: true,
                enumerable: false,
                configurable: true
            } result
            以上为输出结果，target是{}，keys为getList，descroptor返回的是一个对象；key为result
        */
        console.log(target, keys, descriptor)
        // 通过调用第三方库axios发起get请求
        axios.get(url).then(res => {
            // 将descriptor的类型设置为PropertyDescriptor,将Http类的getList进行回传一下
            // 这样就可以把参数传给getList(data)，就可以直接在getList(data)获取到数据
            descriptor.value(res.data)
        })
    }
    return fn
}


class Http {
    // 实现Http类的Get方法，使用装饰器可以自动调用，只需要传入url
    @Get('https://api.apiopen.top/api/getMiniVideo?page=0&size=10')
    getList(data: any) {
        // 获取到接口中的total数和list内容
        console.log(data.result.list)
    }
}

const http = new Http() as any
```

以下为接口获取的数据：

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202307281152997.png)



使用第三方库reflect-metadata进行元数据存储，简化了getList中打印数据的方式：

```typescript
import axios from 'axios'
import 'reflect-metadata'//用于源数据存储

// Get方法使用了装饰器工厂
const Get = (url: string) => {
    // 使用了方法装饰器
    const fn: MethodDecorator = (target, keys: any, descriptor: PropertyDescriptor) => {
        // Reflect.getMetadata()获取目标对象或其原​​型链上提供的元数据键的元数据值
        // metadataKey 用于存储和检索元数据的密钥。
        // target 定义元数据的目标对象。
        const key = Reflect.getMetadata('key', target)

        /*
            {} getList {
                value: [Function: getList],
                writable: true,
                enumerable: false,
                configurable: true
            } result
            以上为输出结果，target是{}，keys为getList，descroptor返回的是一个对象；key为result
        */
        console.log(target, keys, descriptor, key)
        // 通过调用第三方库axios发起get请求
        axios.get(url).then(res => {
            // 将descriptor的类型设置为PropertyDescriptor,将Http类的getList进行回传一下
            // 这样就可以把参数传给getList(data)，就可以直接在getList(data)获取到数据
            // res.data[key]表示的即为res.data[result]，获取到result中的数据
            descriptor.value(key ? res.data[key] : res.data)
        })
    }
    return fn
}

// Result方法使用了装饰器工厂
const Result = () => {
    // 使用了参数装饰器
    const fn: ParameterDecorator = (target, key, index) => {
        
        // 调用第三方库reflect-metadata，在目标上定义唯一的元数据条目 
        // metadataKey 用于存储和检索元数据的密钥
        // metadataValue 包含附加元数据的值
        // target 定义元数据的目标对象
        Reflect.defineMetadata('key', 'result', target)
    }
    return fn
}

class Http {
    // 实现Http类的Get方法，使用装饰器可以自动调用，只需要传入url
    @Get('https://api.apiopen.top/api/getMiniVideo?page=0&size=10')
    getList(@Result() data: any) {
        // 获取到接口中的total数和list内容
        console.log(data)
    }
}

const http = new Http() as any
```

