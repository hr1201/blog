# Mixins混入

## 对象混入

使用es6的Object.assign 合并多个对象。

此时 people 会被推断成一个交差类型 Name & Age & sex;

```typescript
interface Name {
    name: string
}
interface Age {
    age: number
}
interface Sex {
    sex: number
}

let a: Name = {
    name: 'rarrot'
}
let b: Age = {
    age: 66
}
let c: Sex = {
    sex: 0
}

let obj = Object.assign(a, b, c)
```





## 类的混入

代码里有详细的解释

```typescript
class A {
    type: boolean
    changeType() {
        this.type = !this.type
    }
}

class B {
    // name 是一个类的实例属性，它会直接绑定到类的实例。也就是只赋予类型，并不会以属性的形式存在
    // 但js中是没有实例属性概念的，所以编译为js后name不存在，不过name会绑定在this这个对象中
    name: string
    getName(): string {
        return this.name
    }
}

// 将类当成接口，为将要mixin进来的属性方法创建出占位属性。 
// 这会告诉编译器这些成员在运行时是可用的。 这样就能使用mixin带来的便利，虽说需要提前定义一些占位属性
class C implements A, B {
    type: boolean = false;
    name: string = "rarrot";
    changeType: () => void
    getName: () => string
}


// 遍历mixins上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码
mixins(C,[A,B])
function mixins(curClas:any,itemCls:any[]){
    itemCls.forEach(item=>{
        // Object.getOwnPropertyNames(item.prototype)
        // 可以获取对象自身的属性，除去他继承来的属性，对它所有的属性遍历，返回数组
        Object.getOwnPropertyNames(item.prototype).forEach(name=>{
            /*
                constructor
                changeType
                constructor
                getName
            */
            console.log(name)
            
            // 将A和B类的原型方法changeType和getName 复制到curClas类的原型上
            // [name]是用来在item原型链上找到相关方法的钥匙，找到后即复制到curClas的原型上
            curClas.prototype[name]=item.prototype[name]
        })
    })
}

let ccc=new C()
console.log(ccc.type)//false

// 改变type，由原来的false改为true
ccc.changeType();

console.log(ccc.type)//true，说明已经将A，B中的方法混入进了C中
```

