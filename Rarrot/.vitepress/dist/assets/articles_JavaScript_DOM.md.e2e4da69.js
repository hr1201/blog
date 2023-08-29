import{_ as a,o as e,c as t,R as o}from"./chunks/framework.9b35f1b8.js";const m=JSON.parse('{"title":"DOM","description":"","frontmatter":{},"headers":[],"relativePath":"articles/JavaScript/DOM.md","filePath":"articles/JavaScript/DOM.md","lastUpdated":null}'),l={name:"articles/JavaScript/DOM.md"},r=o('<h1 id="dom" tabindex="-1">DOM <a class="header-anchor" href="#dom" aria-label="Permalink to &quot;DOM&quot;">​</a></h1><p>文档对象模型(DOM,Document Object Model)是一个应用编程接口（API），用于在HTML中使用扩展的XML。</p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>为什么需要DOM？</p><p>在IE4和Netscape Navigator4支持不同形式的<strong>动态HTML</strong>(DHTML，有些资料也称此为DOM Level 0，不过真实并没有此标准)的情况下，开发者可以不刷新页面修改页面外观和内容；由于两家公司对其的设计思路不一致，就会造成开发者要面向浏览器编程，需要写多个功能相同的HTML页面去适配浏览器，这时，W3C(World Wide Web Consortium)就开始了制定DOM标准的进程。</p><p>DOM定义了HTML文档和XML文档的逻辑结构(DOM树)，给出访问和处理这两种文档的方法。</p><p>DOM将整个页面抽象为一组分层节点。<strong>HTML</strong>或<strong>XML</strong>页面的每个组成部分都是一种节点，包含不同的数据，每个节点组成了DOM树。</p><p><img src="https://cdn.staticaly.com/gh/hr1201/img@main/imgs/image-20221204184444437.png" alt="image-20221204184444437"></p><h2 id="dom级别" tabindex="-1">DOM级别 <a class="header-anchor" href="#dom级别" aria-label="Permalink to &quot;DOM级别&quot;">​</a></h2><h3 id="dom-level-1" tabindex="-1">DOM Level 1 <a class="header-anchor" href="#dom-level-1" aria-label="Permalink to &quot;DOM Level 1&quot;">​</a></h3><p>为W3C的推荐标准,目标为<strong>映射文档结构</strong>，由两个模块构成:<strong>DOM Core</strong>(提供<strong>映射XML文档</strong>，从而方便访问和操作文档任意部分的方式)和<strong>DOM HTML</strong>(对前者进行扩展，并增加了特定于HTML的对象和方法)。DOM由ECMAScript实现。</p><h3 id="dom-level-2" tabindex="-1">DOM Level 2 <a class="header-anchor" href="#dom-level-2" aria-label="Permalink to &quot;DOM Level 2&quot;">​</a></h3><ol><li>目标为对最初的DOM增加(DHTML早就支持的)鼠标和用户界面事件，范围，遍历(迭代DOM节点的方法)的支持，而且通过对象接口支持了层叠样式表(CSS)。</li><li>也扩展了DOM Core ，以包含对XML命名空间的支持。</li><li>增加了以下模块，以支持新接口：</li></ol><ul><li>DOM视图：描述追踪文档<strong>不同视图</strong>的接口，例如：应用css样式前后文档的不同。</li><li>DOM事件：描述事件及<strong>事件</strong>处理的接口。</li><li>DOM样式：描述处理元素<strong>CSS样式</strong>的接口。</li><li>DOM遍历和范围：描述<strong>遍历和操作DOM树</strong>的接口。</li></ul><h3 id="dom-level-3" tabindex="-1">DOM Level 3 <a class="header-anchor" href="#dom-level-3" aria-label="Permalink to &quot;DOM Level 3&quot;">​</a></h3><ol><li>进一步扩展DOM，增加了以统一的方式加载和保存文档的方法(包含在一个叫DOM Load and Save的新模块)，还有验证文档的方法(DOM Validation)。</li><li>DOM Core经过扩展支持了所有XML1.0的特性，包括XML Infoset，XPath和XML Base。XML是用SGML精简制作，并依照HTML的发展经验而产生的一套使用上规则严谨，但是简单的描述资料语言。</li></ol><p>到现在，W3C作为DOM Living Standard（快照称为DOM4）进行维护DOM，而不是Level。DOM4包括替代Mutation Events的Mutation Observers。</p><h2 id="其他dom" tabindex="-1">其他DOM <a class="header-anchor" href="#其他dom" aria-label="Permalink to &quot;其他DOM&quot;">​</a></h2><p>除了DOM Core和DOM HTML接口，其他语言也发布了自身的DOM标准，以下为基于XML的语言：</p><ol><li>可伸缩矢量图(SVG)</li><li>数学标记语言(MathML)</li><li>同步多媒体集成语言(SMIL)</li></ol>',20),i=[r];function M(n,s,d,D,O,c){return e(),t("div",null,i)}const p=a(l,[["render",M]]);export{m as __pageData,p as default};
