# Class类

## 1.class的基本用法 继承 和 类型约束 implements

这是一个学习继承、类型约束和implements的例子，实现了一个**简单的虚拟Dom操作**：

```typescript
interface Options{
    el:string | HTMLElement
}
interface VueCls{
    options:Options
    init():void
}

interface Vnode{
    tag:string   //div section header
    text?:string //123
    children?:Vnode[]
}
// 虚拟DOM 简单版
class Dom{
    createElement(el:string){
        // 创建节点的方法
        return document.createElement(el)
    }
    // 填充文本的方法
    setText(el:HTMLElement,text:string|null){
        // el.textContent为文本内容
        el.textContent=text;
    }
    // 渲染函数
    render(data:Vnode){
        // 调用createElement方法，创建dom节点，传入节点tag，赋值给根节点root
        let root=this.createElement(data.tag)
        // 当存在子节点就调用进行if条件
        if(data.children && Array.isArray(data.children)){
            // children为数组，进行遍历
            data.children.forEach(item=>{
                // 进行递归，要是有子节点的子节点，则继续调用
                let child=this.render(item)
                // 根节点添加子节点
                root.appendChild(child)
            })
        }else{
            // 若没有子节点了，即进行文本内容的添加，这里似乎只能对最里面的子节点进行添加文本内容
            this.setText(root,data.text)
        }
        // 返回根节点
        return root

    }   
}

class Vue extends Dom implements VueCls{
    options: Options
    // 一个有参的构造方法，参数为Options，其属性el可为字符串类型或者HTMLElement类型
    // 初始化Vue即会调用这个有参构造方法
    constructor(options: Options){
// 父类的prototype.constructor.call，父类有一个无参的构造方法，父类的构造方法不能被继承
  // 父类的prototype.constructor.call，父类有一个无参的构造方法，父类的构造方法不能被继承


        // 使用super()可以调用父类的无参构造方法，使父类中属性和方法得到正确的初始化
super()
        this.options=options
        this.init()
    }
    init(): void {
        // 虚拟dom就是通过js去渲染真实dom
        console.log(this.options)
        // Vnode为虚拟节点，在里面实现想要在挂载元素上显示的内容，tag属性为必要，text和children可选
        let data:Vnode={
            // 父节点
            tag:'div',
            text:'rarrotdsacf',
            // 子节点
            children:[
                {
                    tag:'div',
                    // 子节点的子节点
                    children:[
                        {
                            tag:'p',
                            text:'rarr ot'
                        }
                    ]
                },
                {
                    tag:'section',
                    text:'我是子节点2'
                }
            ]
        }
        // 判断传入的el是字符串类型还是HTMLElement类型；若为字符串类型，则需要匹配元素，否则直接赋值给app
        let app=typeof this.options.el=='string' ? document.querySelector(this.options.el) : this.options.el
        // 将data传入render，进行渲染；app再进行添加
        app.appendChild(this.render(data))
    }
}

//Options接口只有一个属性el，用户在传入options时，仅对el赋值即可
new Vue({
    el:'#app'
}) 
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202307251627477.png)



## 2.class的修饰符 readonly private protected public

```typescript
readonly options: Options//设置options属性不可修改，只能读取


//设置为private，则createElement只有实现这个方法的类可用
//设置为protected，则子类可以访问，但外部类还是不可以访问
//默认设置为public，则都可以访问
private createElement(el:string){
 `  // 创建节点的方法
 `  return document.createElement(el)
}
```





## 静态方法

可以在属性或方法前面加上`static`，添加之后，可以直接用类名调用`static方法`，**static属性只能由static方法调用**，原因为`static属性`和`static方法`在类加载时就存在于内存中，而不需要实例化类，`static`初始化的时候别的属性方法还不存在。同样地，**静态成员也不能访问实例成员**。

```typescript
class Ref{
    static num=666
    static getNum(){
       `        return this.num
    }
}
//🚀 ~ file: index.ts:118 ~ ref: 666
console.log("🚀 ~ file: index.ts:118 ~ ref:", Ref.num)      
//🚀 ~ file: index.ts:118 ~ ref: 666
console.log("🚀 ~ file: index.ts:118 ~ ref:", Ref.getNum())
```



## get set

```typescript
class Ref{
    private _value:any
    constructor(value:any){
        this._value=value;
    }
    get value():any{
        return this._value+'000'
    }
    set value(newVal:any){
        this._value=newVal+'666'
    }
}

const ref=new Ref('哈哈哈')
// 🚀 ~ file: index.ts:117 ~ ref: 哈哈哈
console.log("🚀 ~ file: index.ts:117 ~ ref:", ref.value)


ref.value='rarrot'// 调用set，所以此时为rarrot666

// 🚀 ~ file: index.ts:117 ~ ref: rarrot666000，调用了get，所以为rarrot666000
console.log("🚀 ~ file: index.ts:117 ~ ref:", ref.value)
```

