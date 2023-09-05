import{_ as s,o as e,c as t,Q as a}from"./chunks/framework.fe0df64f.js";const f=JSON.parse('{"title":"css是如何工作的？（简单说明）","description":"","frontmatter":{},"headers":[],"relativePath":"articles/css/css工作流程.md","filePath":"articles/css/css工作流程.md","lastUpdated":1693315179000}'),r={name:"articles/css/css工作流程.md"},l=a('<h1 id="css是如何工作的-简单说明" tabindex="-1">css是如何工作的？（简单说明） <a class="header-anchor" href="#css是如何工作的-简单说明" aria-label="Permalink to &quot;css是如何工作的？（简单说明）&quot;">​</a></h1><ol><li><p>浏览器加载 HTML（例如从网络接收它）。</p></li><li><p>它将 <a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML" target="_blank" rel="noreferrer">HTML </a>转换为 <a href="https://developer.mozilla.org/en-US/docs/Glossary/DOM" target="_blank" rel="noreferrer">DOM </a>（ <strong>文档对象模型</strong>）。 DOM 代表计算机内存中的文档。 下一节将更详细地解释 DOM。</p></li><li><p>然后，浏览器会获取 HTML 文档链接的大部分资源，例如嵌入的图像、视频，甚至链接的 CSS！</p></li><li><p>浏览器解析获取的 CSS，并根据它们的选择器类型将不同的规则分类到不同的“桶”中，例如元素、类、ID 等。 基于它找到的选择器，它计算出哪些规则应该应用于 DOM 中的哪些节点，并根据需要将样式附加到它们（这个中间步骤称为渲染树）。</p></li><li><p>渲染树在规则应用到它之后应该出现在它的结构中。</p></li><li><p>页面的视觉显示显示在屏幕上（这个阶段称为绘画）。</p></li></ol><p><img src="https://cdn.staticaly.com/gh/hr1201/img@main/imgs/202308282106723.png" alt=""></p>',3),o=[l];function c(i,_,n,p,d,h){return e(),t("div",null,o)}const g=s(r,[["render",c]]);export{f as __pageData,g as default};
