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
setTimeout(()=>{

})
doOperation();// 结果：6