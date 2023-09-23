# css是如何工作的？（简单说明）

1. 浏览器加载 HTML（例如从网络接收它）。
   
2. 它将 [HTML ](https://developer.mozilla.org/en-US/docs/Glossary/HTML)转换为 [DOM ](https://developer.mozilla.org/en-US/docs/Glossary/DOM)（ **文档对象模型**）。 DOM 代表计算机内存中的文档。 下一节将更详细地解释 DOM。
   
3. 然后，浏览器会获取 HTML 文档链接的大部分资源，例如嵌入的图像、视频，甚至链接的 CSS！ 
   
4. 浏览器解析获取的 CSS，并根据它们的选择器类型将不同的规则分类到不同的“桶”中，例如元素、类、ID 等。 基于它找到的选择器，它计算出哪些规则应该应用于 DOM 中的哪些节点，并根据需要将样式附加到它们（这个中间步骤称为渲染树）。
   
5. 渲染树在规则应用到它之后应该出现在它的结构中。
   
6. 页面的视觉显示显示在屏幕上（这个阶段称为绘画）。


![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202308282106723.png)
