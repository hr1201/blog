# never类型

## 介绍

在 TypeScript 中，`never` 类型表示那些永远不会出现的值的类型。它表示一个空的类型集合，即表示不存在任何值的类型。



`never` 类型可以用于描述以下两种情况：

1. 函数永远不会返回任何值，或者会抛出一个无法处理的异常：

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // 无限循环
  }
}
```

在上述示例中，函数 `throwError` 永远不会返回任何值，它抛出了一个异常并中断了程序的执行。函数 `infiniteLoop` 会无限循环，因此它也永远不会返回。

永远不可能有值的类型，如类型保护中的 `never` 类型：

2. 永远不可能有值的类型，可以作为**兜底逻辑**使用：

```typescript
type A = '唱' | '跳' | 'rap' | 666
function kun(value: A) {
    switch (value) {
        case 'rap':
            break;
        case '跳':
            break;
        case '唱':
            break;
        case 666:
            break;
        default:
            // 兜底逻辑,在这里可以判断类型
            const error: never = value
            break;
    }
}
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202307261200710.png)



需要注意的是，`never` 类型是一个底层类型，表示不包含任何值的类型。如果变量的类型为 `never`，它只能被赋值为 `never` 或 `any` 类型的值。

