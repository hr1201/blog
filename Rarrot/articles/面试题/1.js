const promiseAll = (functions) => {
  let len = functions.length;
  let arr = new Array(len);
  return new Promise((resolve, reject) => {
    let count = 0;
    functions.forEach(async (fn, index) => {
      try {
        const val = await fn();
        arr[index] = val;
        count++;
        if (count === len) {
          resolve(arr);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
};

// 传入promise数组，返回其输出值
let arr = [
  () => new Promise((resolve) => setTimeout(() => resolve(5), 100)),
  () => new Promise((resolve) => setTimeout(() => resolve(1), 50)),
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Error1")), 50)
    ),
  () => new Promise((resolve) => setTimeout(() => resolve(10), 200)),
];

// const result = promiseAll(arr);
// result.then((val) => console.log(val)); // [ 5, 1, 10 ]
Promise.all(arr)
  .then((responses) => {
    for (const response of responses) {
      console.log(response);
    }
  })
  .catch((error) => {
    console.error(`获取失败：${error}`);
  });
