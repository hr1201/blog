# DOM
文档对象模型(DOM,Document Object Model)是一个应用编程接口（API），用于在HTML中使用扩展的XML。


## 介绍
为什么需要DOM？

在IE4和Netscape Navigator4支持不同形式的**动态HTML**(DHTML，有些资料也称此为DOM Level 0，不过真实并没有此标准)的情况下，开发者可以不刷新页面修改页面外观和内容；由于两家公司对其的设计思路不一致，就会造成开发者要面向浏览器编程，需要写多个功能相同的HTML页面去适配浏览器，这时，W3C(World Wide Web Consortium)就开始了制定DOM标准的进程。



DOM定义了HTML文档和XML文档的逻辑结构(DOM树)，给出访问和处理这两种文档的方法。



DOM将整个页面抽象为一组分层节点。**HTML**或**XML**页面的每个组成部分都是一种节点，包含不同的数据，每个节点组成了DOM树。

![image-20221204184444437](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/image-20221204184444437.png)



## DOM级别

### DOM Level 1

为W3C的推荐标准,目标为**映射文档结构**，由两个模块构成:**DOM Core**(提供**映射XML文档**，从而方便访问和操作文档任意部分的方式)和**DOM HTML**(对前者进行扩展，并增加了特定于HTML的对象和方法)。DOM由ECMAScript实现。



### DOM Level 2

1. 目标为对最初的DOM增加(DHTML早就支持的)鼠标和用户界面事件，范围，遍历(迭代DOM节点的方法)的支持，而且通过对象接口支持了层叠样式表(CSS)。
2. 也扩展了DOM Core ，以包含对XML命名空间的支持。
3. 增加了以下模块，以支持新接口：
  - DOM视图：描述追踪文档**不同视图**的接口，例如：应用css样式前后文档的不同。
  - DOM事件：描述事件及**事件**处理的接口。
  - DOM样式：描述处理元素**CSS样式**的接口。
  - DOM遍历和范围：描述**遍历和操作DOM树**的接口。




### DOM Level 3

1. 进一步扩展DOM，增加了以统一的方式加载和保存文档的方法(包含在一个叫DOM Load and Save的新模块)，还有验证文档的方法(DOM Validation)。
2. DOM Core经过扩展支持了所有XML1.0的特性，包括XML Infoset，XPath和XML Base。XML是用SGML精简制作，并依照HTML的发展经验而产生的一套使用上规则严谨，但是简单的描述资料语言。



到现在，W3C作为DOM Living Standard（快照称为DOM4）进行维护DOM，而不是Level。DOM4包括替代Mutation Events的Mutation Observers。



## 其他DOM

除了DOM Core和DOM HTML接口，其他语言也发布了自身的DOM标准，以下为基于XML的语言：

1. 可伸缩矢量图(SVG)
2. 数学标记语言(MathML)
3. 同步多媒体集成语言(SMIL)





