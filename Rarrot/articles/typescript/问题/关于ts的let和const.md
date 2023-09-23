# 关于ts的let和const

## 用let声明
在 TypeScript 中，当你使用 `let` 声明一个变量时，TypeScript 会尝试推断该变量的类型。在这个例子中，_effect 是一个函数，所以 TypeScript 推断它的类型为 `() => any`。这个类型没有 options 属性，所以当你尝试给 _effect.options 赋值时，TypeScript 会报错，因为它不知道这个属性存在。
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309121717407.png)

<br/>

## 用const声明
当你使用 const 声明一个变量时，TypeScript 会将该变量视为一个**常量**，它的值是不可更改的。在这个例子中，_effect 是一个函数，但是因为它是用 const 声明的，TypeScript 会将其类型**推断为一个具有 options 属性的函数**。所以，当你给 _effect.options 赋值时，TypeScript 不会报错。
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309121726413.png)

<br/>

## 解决
可以显式地为 _effect 指定一个类型，这个类型包含了 options 属性。例如：

```typescript
type EffectFunction = {
    (): any;
    options?: Options;
};

export function effect(fn: Function, options: Options) {
    // 闭包
    const _effect: EffectFunction = function () {
        findeffect = _effect;
        let res = fn();
        return res
    }
    // 给_effect增添一个属性，这样在才知道依赖是否有改变
    _effect.options = options
    _effect()
    return _effect
}
```
以上代码，无论使用 const 还是 let 声明 _effect，都可以正常地给 _effect.options 赋值，而不会出现类型错误。