import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.29896bad.js";const F=JSON.parse('{"title":"symbol类型","description":"","frontmatter":{},"headers":[],"relativePath":"articles/typescript/14-symbol类型.md","filePath":"articles/typescript/14-symbol类型.md","lastUpdated":1690859668000}'),p={name:"articles/typescript/14-symbol类型.md"},o=l(`<h1 id="symbol类型" tabindex="-1">symbol类型 <a class="header-anchor" href="#symbol类型" aria-label="Permalink to &quot;symbol类型&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>ES6新增类型。符号是原始值，且符号实例是唯一，不可变的。</p><h2 id="用途" tabindex="-1">用途 <a class="header-anchor" href="#用途" aria-label="Permalink to &quot;用途&quot;">​</a></h2><p>确保对象属性使用唯一标识符，不会发生属性冲突的危险。符号就是用来创建唯一记号，进而用作非字符串形式的对象属性。符号并非为提供私有属性的行为才增加的。</p><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">symbol</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span><span style="color:#6A737D;">//提供唯一的符号</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> a2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">symbol</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(a1, a2)</span><span style="color:#6A737D;">//Symbol(1) Symbol(1)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(a1 </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> a2)</span><span style="color:#6A737D;">//false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// for Symbol for全局symbol有没有注册过key，如果有就会直接拿来用，没有就创建</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Symbol.</span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;rarrot&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> Symbol.</span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;rarrot&#39;</span><span style="color:#E1E4E8;">))</span><span style="color:#6A737D;">//true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    [a1]: </span><span style="color:#79B8FF;">111</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    [a2]: </span><span style="color:#79B8FF;">222</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// { name: 1, [Symbol(1)]: 111, [Symbol(1)]: 222 }</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// for in 不能读到symbol</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> obj) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(key)</span><span style="color:#6A737D;">//name</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Object.keys()同样不能读到symbol</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Object.</span><span style="color:#B392F0;">keys</span><span style="color:#E1E4E8;">(obj))</span><span style="color:#6A737D;">//[ &#39;name&#39; ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Object.getOwnPropertyNames()还是不能读到symbol</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Object.</span><span style="color:#B392F0;">getOwnPropertyNames</span><span style="color:#E1E4E8;">(obj))</span><span style="color:#6A737D;">//[ &#39;name&#39; ]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 可以只取到symbol</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Object.</span><span style="color:#B392F0;">getOwnPropertySymbols</span><span style="color:#E1E4E8;">(obj))</span><span style="color:#6A737D;">//[ Symbol(1), Symbol(1) ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// name和symbol都可以取到</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Reflect.</span><span style="color:#B392F0;">ownKeys</span><span style="color:#E1E4E8;">(obj))</span><span style="color:#6A737D;">//[ &#39;name&#39;, Symbol(1), Symbol(1) ]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">symbol</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span><span style="color:#6A737D;">//提供唯一的符号</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">symbol</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(a1, a2)</span><span style="color:#6A737D;">//Symbol(1) Symbol(1)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(a1 </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> a2)</span><span style="color:#6A737D;">//false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// for Symbol for全局symbol有没有注册过key，如果有就会直接拿来用，没有就创建</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Symbol.</span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;rarrot&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> Symbol.</span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;rarrot&#39;</span><span style="color:#24292E;">))</span><span style="color:#6A737D;">//true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    [a1]: </span><span style="color:#005CC5;">111</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    [a2]: </span><span style="color:#005CC5;">222</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// { name: 1, [Symbol(1)]: 111, [Symbol(1)]: 222 }</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// for in 不能读到symbol</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> obj) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(key)</span><span style="color:#6A737D;">//name</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Object.keys()同样不能读到symbol</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Object.</span><span style="color:#6F42C1;">keys</span><span style="color:#24292E;">(obj))</span><span style="color:#6A737D;">//[ &#39;name&#39; ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Object.getOwnPropertyNames()还是不能读到symbol</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Object.</span><span style="color:#6F42C1;">getOwnPropertyNames</span><span style="color:#24292E;">(obj))</span><span style="color:#6A737D;">//[ &#39;name&#39; ]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 可以只取到symbol</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Object.</span><span style="color:#6F42C1;">getOwnPropertySymbols</span><span style="color:#24292E;">(obj))</span><span style="color:#6A737D;">//[ Symbol(1), Symbol(1) ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// name和symbol都可以取到</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Reflect.</span><span style="color:#6F42C1;">ownKeys</span><span style="color:#24292E;">(obj))</span><span style="color:#6A737D;">//[ &#39;name&#39;, Symbol(1), Symbol(1) ]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div>`,7),e=[o];function c(r,t,y,E,i,b){return n(),a("div",null,e)}const u=s(p,[["render",c]]);export{F as __pageData,u as default};
