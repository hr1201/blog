# css的选择器
css的特性：继承性，层叠性，优先级。

继承与层叠：子标记会继承父标记的样式，子标记可以在父标记上设置新的样式元素

## 介绍
**通配符选择器：** 用*定义，表示选取页面中所有的元素。


**标记选择器：** 直接使用HTML的标签名称作为选择器

**类选择器：** 使用class属性定义HTML元素标记，类选择器可以使用“.”+类名称；
也可以用，联合选择器：标记选择器与类选择器直接相连，语法：标记名（HTML标签名）.类名{}；且可以设置多个类名，类名称之间用空格隔开；
多用于对样式可重用性要求较高处。

**id选择器：** 在标签里使用id属性，与class属性类似，使用方式：’#‘+id属性值；
但限制较多，①取值必须唯一，只能用于指定的一个标记，因为在使用时是直接对id属性值进行样式的修改，②id属性值必须以字母开头，由字母，数字，下划线，连字符组成；
多用于需要唯一标识的页面元素。

**伪类选择器：** 使用方式:标记名+伪类名{}  多用于段落第一行，超链接访问前，后

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202407102216137.png)

::: warning 注意：
`a:hover`必须置于`a:link`和`a:visited`之后,才是有效的.`a:active`必须被置于`a:hover`之后,才是有效的；可以是class选择器`:hover`;
:::

**属性选择器：** 通过标记的属性来选择元素，使用方式：标记名[属性名=属性值]{}；
多用于对特定属性的标记进行样式的设置。
代码示例：
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 选择所有title属性的标记 */
      img[title] {
        border: 5px solid #ccc;
      }

      /* 选择所有title属性值为"pic"的标记 */
      img[title="pic"] {
        border: 5px solid #f00;
      }
    </style>
  </head>
  <body>
    <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" title="pic" alt="">
    <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" title="pic1" alt="">  
  </body>
</html>
```

**相邻选择器：** 用于选择紧接在另一元素后的元素，使用方式：标记名+标记名{}；
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* item4 的背景颜色为red */
      .current + li {
        background-color: red;
      }

      /* 还有加边框时不给第一个加 */
      ul li + li {
        border-top: 5px solid #ccc;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>item1</li>
      <li>item2</li>
      <li class="current">item3</li>
      <li>item4</li>
    </ul>
  </body>
</html>
```

**子元素选择器：** 用于选择某个元素的子元素，使用方式：标记名>标记名{}；
```html 
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 选择ul下的p */
      ul>p {
        background-color: red;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
      <li>item4</li>
      <p>item5</p>
    </ul>
  </body>
</html>
```

## 优先级
选择器优先级为：

!important ==> 行内样式 ==> id选择器 ==> 类/伪类/属性选择器 ==> 标签选择器 ==> 相邻选择器 (+) ==> 子元素选择器 (>) ==> 后代选择器 ==> 通配符选择器 (*) ==> 继承样式 ==> 浏览器默认样式
