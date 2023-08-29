import{_ as s,o as n,c as a,R as l}from"./chunks/framework.9b35f1b8.js";const C=JSON.parse('{"title":"this","description":"","frontmatter":{},"headers":[],"relativePath":"articles/JavaScript/问题/this.md","filePath":"articles/JavaScript/问题/this.md","lastUpdated":null}'),p={name:"articles/JavaScript/问题/this.md"},e=l(`<h1 id="this" tabindex="-1">this <a class="header-anchor" href="#this" aria-label="Permalink to &quot;this&quot;">​</a></h1><h3 id="以下为什么在浏览器中输出为underfined和6" tabindex="-1">以下为什么在浏览器中输出为underfined和6？ <a class="header-anchor" href="#以下为什么在浏览器中输出为underfined和6" aria-label="Permalink to &quot;以下为什么在浏览器中输出为underfined和6？&quot;">​</a></h3><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// &#39;use strict&#39;，在严格模式下，x为underfined，不能进行设置值</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">a</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">xx</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">xx</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">//this指向全局对象，而不是函数内部的作用域。</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//a(5)表示对this指向的全局对象的属性x赋值，x赋值为5，</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//所以由打印此全局对象的x属性为5。</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">a</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//相当于a(5).x</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(x</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> y </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">a</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//返回的x为全局对象,前面由于调用了a(6)，所以此时this指向的全局对象的属性x值为6</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(x</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//相当于a(6).x，可得出a(6)返回的对象的属性x=6。</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(y</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div>`,3),o=[e];function t(r,c,i,y,A,D){return n(),a("div",null,o)}const b=s(p,[["render",t]]);export{C as __pageData,b as default};
