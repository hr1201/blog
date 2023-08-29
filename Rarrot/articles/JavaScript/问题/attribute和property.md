# attribute和property

## 介绍
**attribute**是HTML代码中看到的**键值对**（HTML中的属性），例如：

```html
 <input id="the-input" type="text" value="Name:" />
```

有三个attribute：

```javascript
id:the-input
type:text
value:Name：
```

<br/>

**property** 是 __attribute 对应的 DOM 节点的 __**__对象属性__** (Object field), 例如:

```javascript
HTMLInputElement.id=== 'the-input'
HTMLInputElement.type=== 'text'
HTMLInputElement.value=== 'Name:'
```



## 区别

1. 当我们进行获取值时，在input框中输入值hr：

`attribute`仍然保持原始值。 始终保持html代码中的初始值
```javascript
input.getAttribute('id') // the-input
input.getAttribute('type') // typo，并不是input支持的类型
input.getAttribute('value') // Name:

```

<br/>

`property`的text，value是修改后的值。 **可变的**
```javascript
input.id// the-input
input.type// text，可以看到type的值typo被修正为text
input.value// hr
```

<br/>

2. `atribute`支持自定义的属性，而`property`不能获取到自定义属性的值

```html
 <input value="自定义属性" customeAttr="custome attribute value"/>

<script>
    input.getAttribute('customeAttr'); //custome attribute value
    input.customeAttr; //underfined
</script>
```

原因为：

DOM 节点在初始化的时候会将**html 规范**中定义的 attribute 赋值到 property 上, 

而自定义的 attribute 并不属于这个范围内, 自然生成的 DOM 节点就没有这个 property。

