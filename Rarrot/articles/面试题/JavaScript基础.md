# JavaScript基础

* JavaScript 中函数返回对象或其他函数是什么意思？

  指的是返回对象或其他函数时，使用高阶函数和工厂函数。

  高阶函数是通过接受其他函数作为参数或返回它们来操作其他函数的函数。

  工厂函数是返回对象实例的函数。

  有助于封装和重用代码。

* 方法链在 JavaScript 中是如何工作的，什么时候使用它可能会更有效？
  
  方法链指的是单个语句中调用多个方法，例如：

    ```js
    let arr = [1,6,8,5]
    arr.sort().reverse().join('-') // 调用多个方法
    console.log(arr) // [ 8, 6, 5, 1 ]
    ```

  原因是因为每个方法都会返回一个**对象**，该对象可以是原始对象(对于可变对象)或新对象(对于不可变对象)。
  
  方法链在执行多个转换或操作时很有用，提高可读性，使代码更加简洁。

* 在 JavaScript 中，== 和 === 有什么区别？
  
  `==`是抽象相等运算符，在相比较的两个数之间类型不同时，会尝试转换类型在进行比较；`===`是严格相等运算符，只有当类型和值都相同时才返回true。

* 如何在 JavaScript 函数中处理错误？

  可以使用`try...catch...finally`块进行处理错误，`try`块可用于包裹住可能发生错误的代码，`catch`块会在发生错误时执行，`finally`块在最后执行，且无论如何都会执行。

  还有一种就是错误优先的回调，在Node.js中更加常见，其中回调函数的第一个参数保留给错误对象。

* 为什么我们要抛出错误，而不是在错误方法中直接返回 false？

  抛出错误原因可以在`try...catch...finally`块中进行捕获，对开发者起到更好的提示作用。而仅返回false只会说明值不相等，对于上下文还有其余信息没有进一步提供。

* 什么是Proxy?

  Proxy也就是代理，允许用它来覆盖对象的默认行为。用法如下：

  ```js
  const target = { name: "Rarrot", age: 66 };
  const handler = {
    get(target, prop) {
      return `获取${prop}：`+target.name;
    },
    set(target, prop, value) {
      // 这里仅仅是创建新属性，属性名相同会替换原来那个
      // 不可以设置target中的属性值，因为是只读属性
      return target[prop] = value;
    },
  };

  const proxy = new Proxy(target, handler);

  console.log(proxy.name); // 获取name：Rarrot
  proxy.age = 100
  proxy.n=1
  console.log(proxy); //{ name: 'Rarrot', age: 100 }
  ```

* js常用函数`forEach`，`map`，`reduce`，`filter`分别是什么?

  `forEach`用于数组循环，会修改原数组。

  `map`用于数组循环的方法，不同在于

  `reduce`遍历数组中的每个值，并以某种方式将每个值合并到一个**累加器**变量中。第一个参数是一个回调函数，它接受当前的 `accumulator` 值和每个数组元素，并返回一个新的 `accumulator` 值。第二个参数是 `accumulator` 的初始值。在遍历整个数组后，将返回 `accumulator` 的最终值。例如：

  ```js
  // 将数组所有值相加
  const nums = [1, 2, 3];
  const sum = nums.reduce((accumulator, val) => accumulator + val, 0);
  console.log(sum); // 6
  ```

`filter`用于过滤数组

* 有哪些值是不被认为真值的?

  `false`，
  所有形式的零，包括 `0`、`-0`（`0/-1` 的输出）和 `0n`（`BigInt(0)` 的输出），
  `NaN`（"Not a Number”，可以通过 `0/0` 获得），
  `""`（空字符串），
  `null`，
  `undefined`。

* For..in循环和For...of循环有什么不同?

  For...in 循环更常用于遍历`对象的键`，也可以用于遍历`数组的索引`。但是，它们也可以用于遍历数组的索引。并且会优先稀疏数组，省略空索引。

For...of 循环用来遍历**可迭代**对象的每个`元素`。

* 节流是什么，怎么实现？
  例如你在实现一个搜索框时，想实现输入时即开始搜索，但又不希望太频繁的发送请求，就可以使用节流来限制每秒发送请求的数量，从而优化系统性能。或者也可以使用记忆化`memoize()`来缓存以前的结果避免重复请求。


* 防抖是什么，怎么实现？
  防抖用于确保耗时的任务不会频繁触发，防抖核心概念是在执行函数之前设置延迟，然后在延迟到期之前每次请求函数时重置该延迟。
  ```js
  // 示例：t = 50
  // calls = [
  //   {"t": 50, inputs: [1]},
  //   {"t": 75, inputs: [2]}
  // ]
  var debounce = function (fn, t) {
    // 如果在t秒内，计时器还存在，就取消调用；示例1解释：
    // 在50ms的时候调用，计时器开始计时，还没有执行函数；
    // 到了75ms的时候再次调用，发现有一个计时器，所以取消此计时器，同时也不执行50ms的输出了，
    // 转而添加上75ms这个计时器，并在时间到时执行75ms时的输出。
    let delay = null;
    return function (...args) {
      if (delay) {
        clearTimeout(delay);
      }
      delay = setTimeout(() => {
        fn.apply(null, args);
      }, t);
    };
  };

  let start = Date.now();
  function log(...inputs) {
    console.log([Date.now() - start, inputs]);
  }

  const dlog1 = debounce(log, 50);
  setTimeout(() => dlog1(1), 50);
  setTimeout(() => dlog1(2), 75); // 理想状态下，输出：[ 125, [ 2 ] ]
  ```

* JavaScript 中回调函数和 Promise 之间有什么区别？什么时候更喜欢使用 Promise 而不是回调？另外，回调地狱是什么，如何缓解它？

  **回调**是 JavaScript 中处理异步操作的传统方式，它们是作为参数传递给其他函数的函数，并在异步操作完成时调用。Promise 是表示异步操作最终完成（或失败）的对象。与回调相比，**Promise 提供了更结构化和可读的代码**。通常，当处理复杂的异步操作、错误处理和代码可读性时，更倾向于使用 Promise 而不是回调。

  **回调地狱**是指代码结构变得嵌套层次很深，每个回调都作为另一个回调的参数传递。这种嵌套会很快变得复杂，使代码难以理解，导致问题，如代码重复、错误处理问题以及难以维护和调试的困难。为了缓解回调地狱，可以使用几种方法，例如使用命名函数、使用控制流库（如 async.js 或 Promises）或使用现代 JavaScript 特性如 async/await。这些方法有助于扁平化代码结构，使其更可读和可维护，避免过多的回调嵌套。例如：
  ```js
  //在调用异步函数时同时传入回调函数，异步函数立即返回，并在操作完成后调用传入的回调
  function doStep1(init, callback) {
    const result = init + 1;
    callback(result);//传入回调函数
  }
  function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
  }
  function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
  }
  function doOperation() {
    doStep1(0, result1 => {
      doStep2(result1, result2 => {
        doStep3(result2, result3 => {
          console.log(`结果：${result3}`);
        });
      });
    });
  }
  doOperation();// 结果：6
  ```


* `Promise.resolve` 和 `Promise.reject()` 的区别是什么？

  `Promise.resolve`：它返回用给定值解析的 promises。如果提供的值已经是 Promise，则按原样返回。如果该值不是 Promise，Promise.Resolve() 将创建一个新的 Promise，该新 Promise 将立即使用提供的值进行解析。

  `Promise.reject()`：它返回因给定原因或错误而被拒绝的 promises。所提供的原因或错误被视为拒绝 promises 的原因。

  例子：
  ```js
  const rejectedPromise = Promise.reject(new Error('Something went wrong'));
  ```
  当您想要创建一个立即用特定值解析的 promises 时，通常使用 `Promise.Resolve()`；而当您想要创建一个由于特定错误或原因而立即拒绝的 promises 时，则使用 `Promise.reject()`。


* 如何处理延迟函数需要特定上下文（`this 值`）的执行情况？

  在延迟函数依赖特定上下文（`this 值`）的情况下，可以使用 `bind` 方法将所需的上下文绑定到 `fn`。这会创建一个具有指定上下文的新函数，然后可以将绑定的函数传递给 `setTimeout` 以进行延迟执行。

