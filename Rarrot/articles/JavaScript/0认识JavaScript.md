# 认识JavaScript

## 导入js脚本


使用<script\>元素，有8个属性：

1. async：可选。异步执行脚本。表示应该立即开始下载脚本，但不能阻止其他页面动作，也就是并不保证能按照脚本出现的次序执行，如下载资源或等待其他脚本加载。只对外部脚本文件有效。



2. charset：可选。使用src指定代码字符集，很少使用。



3. crossorigin:可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志，crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。



4. defer：可选。表示脚本可以延迟到文档完全被解析和显示之后在执行。只对外部脚本文件有效。相当于告诉浏览器，立即下载，延迟执行。



5. integrity： 可选。允许**比对接收到的资源的签名**和指定的加密签名以**验证子资源完整性**(SRI ，Subresource Integrity)。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络(CDN，Content Delivery Network)，不会提供恶意内容。



6. language:废弃。



7. src：可选。表示包含要执行的代码的外部文件。



8. type：可选。代表language，表示代码块中脚本语言的内容类型(也称MIME类型)。按照惯例，这个值为 **"text/JavaScript"** ，尽管"text/JavaScript"和"text/ecmascript"都已经废弃了。JavaScript文件的MIME类型通常是 **"application/x-javascript"**(易被浏览器忽略)。如果这个值为module，代码会被当成ES6模块，只有这时才可以使用import和export关键字。





## 文档模式

使用 doctype 切换文档模式。最初的文档模式有两种：**混杂模式**（quirks mode）和**标准模式**（standards mode）。前者让 IE 像 IE5 一样（支持一些**非标准**的特性），后者让 IE 具有兼容**标准**的行为。虽然这两种模式的主要区别只体现在通过 CSS 渲染的内容方面，但对JavaScript 也有一些关联影响，或称为副作用。

<br/>

### 准标准模式

**准标准模式**（almost standards mode）,这种模式下的浏览器支持很多标准的特性，但是没有标准规定得那么严格。主要区别在于如何**对待图片元素**周围的空白（在表格中使用图片时最明显）。与标准模式很相似，很少需要区分。

### 混杂模式

**混杂模式**在所有浏览器中都以省略文档开头的 doctype 声明作为开关。但是并不合理，在不同浏览器中差异仍然很大。

### 标准模式

**标准模式**通过下列几种文档类型声明开启：

```html
<!-- HTML 4.01 Strict -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"[http://www.w3.org/TR/html4/strict.dtd](http://www.w3.org/TR/html4/strict.dtd)">

<!-- XHTML 1.0 Strict -->
<!DOCTYPE html PUBLIC
"-//W3C//DTD XHTML 1.0 Strict//EN"
"[http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd](http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)">

<!-- HTML5 -->
<!DOCTYPE html>
```

### 准标准模式

**准标准模式**通过过渡性文档类型（Transitional）和框架集文档类型（Frameset）来触发：

```html
<!-- HTML 4.01 Transitional -->
<!DOCTYPE HTML PUBLIC
"-//W3C//DTD HTML 4.01 Transitional//EN"
"[http://www.w3.org/TR/html4/loose.dtd](http://www.w3.org/TR/html4/loose.dtd)">

<!-- HTML 4.01 Frameset -->
<!DOCTYPE HTML PUBLIC
"-//W3C//DTD HTML 4.01 Frameset//EN"
"[http://www.w3.org/TR/html4/frameset.dtd](http://www.w3.org/TR/html4/frameset.dtd)">

<!-- XHTML 1.0 Transitional -->
<!DOCTYPE html PUBLIC
"-//W3C//DTD XHTML 1.0 Transitional//EN"
"[http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd](http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd)">

<!-- XHTML 1.0 Frameset -->
<!DOCTYPE html PUBLIC
"-//W3C//DTD XHTML 1.0 Frameset//EN"
"[http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd](http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd)">
```





## <noscript\>元素

可以包含任何可以出现在`<body\>`中的 HTML 元素，`<script\>`除外。在下列两种

情况下，浏览器将显示包含在`<noscript\>`中的内容：

1. 浏览器不支持脚本；

2. 浏览器对脚本的支持被关闭。

任何一个条件被满足，包含在`<noscript\>`中的内容就会被渲染。否则，浏览器不会渲染`<noscript\>`中的内容。





