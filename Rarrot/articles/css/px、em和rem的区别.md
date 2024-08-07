# px、em和rem的区别

font-size默认是16px，设为62.5%，代表16px的0.625倍

**px**是像素，显示器上给我们呈现画面的像素，每个像素的大小是一样，绝对单位长度

**rem**,相对单位，**相对于html根节点**的`font-size`的值，直接给html节点的`font-size:62.5%;`，则1rem=10px;

`font-size`默认是16px，设为62.5%，代表16px的0.625倍，所以这时1rem=10px。

## 示例
`rem`和`em`的区别
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html{
        font-size: 16px;
      }
      .box1{
       font-size: 32px;
      }
      .box2{
        font-size: 64px;
      }
      .box3{ 
        /* 此时width为192px，相对于父元素box2 */
        /* width: 3em;  */
        /* 此时width为48px，相对于html */
        width: 3rem;
        background: #d2e9da;
      }
    </style>
  </head>
  <body>
    <div class="box1">
      第一层
      <div class="box2">
        第二层
        <div class="box3">
          第三层
        </div>
      </div>
    </div>
  </body>
</html>
```