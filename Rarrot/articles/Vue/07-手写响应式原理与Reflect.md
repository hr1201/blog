# 手写响应式原理

使用proxy和Reflect手写了vue3的响应式简易版，并且明白了一点为什么使用Reflect。

## effect.ts

```typescript
// 收集函数
let findeffect

// fn为匿名的函数，这里将fn收集起来，当依赖更新时执行effect副作用函数
export function effect (fn:Function){
    
    // 闭包
    let _effect=function (){
        findeffect=fn
        fn()
    }
    _effect()
}

let targetMap=new Map()
export function track(target:object,key:any){
    // 传入的target为原对象，key为对象的属性名
    let newMap=targetMap.get(target)
    // 先判断targetMap中是否有相应的对象，没有则需要先创建再放到targetMap中
    // 这里将相应的对象作为key，存放一个Map，而这个Map中含有这个相应的对象
    if(!newMap){
        newMap=new Map()
        // 这里也就是将对象作为key，存放newMap
        targetMap.set(target,newMap)
    }
    
    // key为属性名，从newMap中去获取相应的属性
    let newSet=newMap.get(key)
    // 当然newMap一开始是没有的，所以需要先new一个Set，再将newSet放入newMap中
    if(!newSet){
        newSet=new Set()
        newMap.set(key,newSet)
    }
    // newSet添加函数
    newSet.add(findeffect)
}

// 对newSet收集的函数进行执行
export function trigger(target:object,key:any){
    // 从targetMap用target作为key获取到含有相应对象的newMap
    const newMap=targetMap.get(target)
    // 从newMap中获取到含有相应属性的Set，Set中含有函数，并且是可迭代的
    const effects=newMap.get(key)

    // 调用effects中收集的函数
    effects.forEach(effect=>effect())
}


```

<br/>

**图片来自**[小满zs](https://xiaoman.blog.csdn.net/article/details/122792620)

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309022117316.png)


## reactive.ts

```typescript
import { track, trigger } from './effect'


function isObject(obj:object){
    if(obj!=null&&typeof obj=='object'){
        return obj
    }
}

export const reactive = ((obj: object) => {
    return new Proxy(obj, {
        // receiver通过获取代理对象，建立响应联系，在通过代理对象修改值时才会改变
        get(target, key, receiver) {

            // 而不是通过target来更改对象，target为原对象，进行修改只是修改原对象
            // 以下相当于let res=user.name
            // let res=target[key]

            track(target, key)
            let res = Reflect.get(target, key, receiver)

            // 判断是否为对象，是则递归的调用reactive，使其遍历对象
            if(isObject(res)){
                reactive(res)
            }

            return res
        },
        set(target, key, value, receiver) {
            trigger(target, key)

            // 以下相当于user.name=‘rarrot111’
            // let res=target[key]=value

            // set是需要返回一个boolean值的，而Reflect返回的即为boolean值
            let res = Reflect.set(target, key, value, receiver)
            return res
        }
    })
})

```


## 测试代码

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>手写响应式原理</title>
</head>

<body>
    <div id="student"></div>

    <script type="module">
        import { reactive } from './reactive.js'
        import { effect } from './effect.js'

        const s = reactive({
            name: 'rarrot',
            age: 66,
            foo: {
                bar: {
                    id: 123
                }
            }
        })
        
        effect(() => {
            document.querySelector('#student').innerText = `姓名：${s.name}，年龄：${s.age}，学号：${s.foo.bar.id}`
        })

        setTimeout(() => {
            s.name = 'rarrot111'
            setTimeout(() => {
                s.age = 'rarrot222'
                setTimeout(() => {
                    s.foo.bar.id = '456'
                }, 1000)
            }, 1000)
        }, 2000)

    </script>
</body>

</html>
```

## 效果
![](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3lhMmY1YW9odTJma2JmOHJkaHJnNHlpMHBpNmhiZmNpc213MzduNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0jovUfNYvR2B950eJk/giphy.gif)