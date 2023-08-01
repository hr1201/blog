# namespace命名空间

## 介绍

可用于**避免全局变量造成的污染**。

- 内部模块，主要用于组织代码，避免命名冲突。
- 命名空间内的类默认私有
- 通过 export 暴露，不通过export暴露，是无法读取的
- 通过 namespace 关键字定义



## 示例

```typescript
// 设置一个命名空间
export namespace B{
    // 需要使用export暴露出去
    export const a=1
}
console.log(B.a)
```

编译后的js文件为：

```javascript
"use strict";
// 设置一个命名空间
var A;
(function (A) {
    A.a = 1;
})(A || (A = {}));

// 🚀 ~ file: index.js:9 ~ A.a: 1
console.log("🚀 ~ file: index.js:9 ~ A.a:", A.a)
```

可以看到，实际上是给变量套了一层function。



若不设置为export，编译后的js文件中的变量a用const定义，在外部不可读取其值：

```javascript
"use strict";
// 设置一个命名空间
var A;
(function (A) {
    const a = 1;
})(A || (A = {}));

// 🚀 ~ file: index.js:9 ~ A.a: underfined
console.log("🚀 ~ file: index.js:9 ~ A.a:", A.a)
```





## 嵌套命名空间

```typescript
// 设置一个命名空间
namespace A{
    export const a=1
    export namespace B{
        export const D=5
    }
}
console.log(A.B.D)//5
```

编译后的JavaScript文件为：

```javascript
"use strict";
// 设置一个命名空间
var A;
(function (A) {
    A.a = 1;
    let B;
    (function (B) {
        B.D = 5;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
console.log(A.B.D); //5
```





## 抽离命名空间

现在index2.ts文件中写入以下代码：

```typescript
// export const a=1
export namespace B{
    // 需要使用export暴露出去
    export const a=1
}
console.log(B.a) // 1
```



在index.ts中引入B为：

```typescript
import { B } from './index2'

// 设置一个命名空间
namespace A {
    export const a = 1
    export namespace B {
        export const D = 5
    }
}

console.log(A.B.D, B) // 5 { a: 1 }
```





## 简化命名空间

```typescript
import { B } from './index2'

// 设置一个命名空间
namespace A {
    export const a = 1
    export namespace B {
        export const D = 5
    }
}
console.log(A.B.D, B)//5 { a: 1 }

import AB=A.B
// 🚀 ~ file: index.ts:13 ~ AB: 5
console.log("🚀 ~ file: index.ts:13 ~ AB:", AB.D)
```





## 命名空间的合并

跟interface一样，遇到重名的就合并起来：

```typescript
namespace A{
    export const a=1
}

namespace A{
    export const b=2
}

console.log(A.a)//1
console.log(A.b)//2
```



