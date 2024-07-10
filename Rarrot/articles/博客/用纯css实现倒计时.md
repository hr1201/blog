# 用纯css实现倒计时

## 代码

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>timer</title>
    <style>
      /* 创建一个自定义属性 */
      @property --n {
        syntax: '<integer>';
        /* 指定@property规则表示的自定义属性注册的继承标志，控制属性默认是否继承. */
        inherits: false;
        initial-value: 0;
      }
      /* 跟踪秒数,同时减少数字 */
      @keyframes count {
        from {
          --n: 10;
        }
        to {
          --n: 0;
        }
      }
      /* 执行 */
      .timer:hover::after {
        animation: 10s linear count;
        /* 阻止计时器立即恢复到初始 --n 值（零） */
        animation-fill-mode: forwards;
        /* counter-reset的值是一个计数器名称和一个整数 */
        /* 由于 counter-reset 尚未正确处理整数的 CSS 变量或自定义属性，但接受 calc() ，因此 calc() 函数成为我们的特洛伊木马，位于我们将发送其中的 –n。 */
        counter-reset: n calc(0 + var(--n));
        /* 将calc()给到counter()，再传给content */
        content: counter(n);
      }
      /* 定义timer的一些样式 */
      .timer::after {
        display: block;
        content: '';
        line-height: 200px;
        height: 1lh;
        aspect-ratio: 1 / 1;
        font-size: 92pt;
        text-align: center;
        border: 1px dashed black;
        font-weight: bold;
        background: linear-gradient(45deg, rgb(17 48 244) 50%, rgb(114 244 252));
        background-clip: text;
        color: transparent;
        font-family: verdana, arial, sans-serif;
      }
      .timer {
        place-self: center;
      }
    </style>
  </head>
  <body>
    <div class="timer"></div>
  </body>
</html>
```

## 效果展示

<style>
  @property --n {
    syntax: '<integer>';
    inherits: false;
    initial-value: 0;
  }
  @keyframes count {
    from {
      --n: 10;
    }
    to {
      --n: 0;
    }
  }
  .timer:hover::after {
    animation: 10s linear count;
    animation-fill-mode: forwards;
    counter-reset: n calc(0 + var(--n));
    content: counter(n);
  }
  .timer::after {
    display: block;
    content: '';
    line-height: 200px;
    height: 1lh;
    aspect-ratio: 1 / 1;
    font-size: 92pt;
    text-align: center;
    border: 1px dashed #3a5ccc;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(17 48 244) 50%, rgb(114 244 252));
    background-clip: text;
    color: transparent;
    font-family: verdana, arial, sans-serif;
  }
  .timer {
    place-self: center;
  }
</style>

<div class="timer"></div>

## 参考链接

https://frontendmasters.com/blog/how-to-make-a-css-timer/