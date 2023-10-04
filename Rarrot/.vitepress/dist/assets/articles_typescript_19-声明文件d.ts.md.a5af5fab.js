import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.ee3d195b.js";const u=JSON.parse('{"title":"声明文件d.ts","description":"","frontmatter":{},"headers":[],"relativePath":"articles/typescript/19-声明文件d.ts.md","filePath":"articles/typescript/19-声明文件d.ts.md","lastUpdated":1690859668000}'),l={name:"articles/typescript/19-声明文件d.ts.md"},o=p(`<h1 id="声明文件d-ts" tabindex="-1">声明文件d.ts <a class="header-anchor" href="#声明文件d-ts" aria-label="Permalink to &quot;声明文件d.ts&quot;">​</a></h1><p>要学习手写声明文件原因在代码的前五行：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ctrl+点击axios会发现进入的是axios的声明文件</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> axios </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;axios&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// express这里报错原因为缺少声明文件，ctrl+点击进入的为express的源码</span></span>
<span class="line"><span style="color:#6A737D;">// 这也是ts现如今的缺点，想使用第三方库，但是缺少声明文件，社区也缺少他人编写的声明文件</span></span>
<span class="line"><span style="color:#6A737D;">// 这时候就需要我们自行编写声明文件</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> express </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;express&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">app</span><span style="color:#F97583;">=</span><span style="color:#B392F0;">express</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">router</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">express.</span><span style="color:#B392F0;">Router</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/api&#39;</span><span style="color:#E1E4E8;">,router)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/api&#39;</span><span style="color:#E1E4E8;">,(</span><span style="color:#FFAB70;">req</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">res</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    res.</span><span style="color:#B392F0;">json</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        code:</span><span style="color:#79B8FF;">200</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">9001</span><span style="color:#E1E4E8;">,()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;9001&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 在express中扩充的内容</span></span>
<span class="line"><span style="color:#E1E4E8;">a</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">xxxx</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;number&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Vue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">C</span><span style="color:#E1E4E8;">.a</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">A</span><span style="color:#E1E4E8;">.a</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ctrl+点击axios会发现进入的是axios的声明文件</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> axios </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;axios&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// express这里报错原因为缺少声明文件，ctrl+点击进入的为express的源码</span></span>
<span class="line"><span style="color:#6A737D;">// 这也是ts现如今的缺点，想使用第三方库，但是缺少声明文件，社区也缺少他人编写的声明文件</span></span>
<span class="line"><span style="color:#6A737D;">// 这时候就需要我们自行编写声明文件</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> express </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;express&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">app</span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;">express</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">router</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">express.</span><span style="color:#6F42C1;">Router</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/api&#39;</span><span style="color:#24292E;">,router)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/api&#39;</span><span style="color:#24292E;">,(</span><span style="color:#E36209;">req</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">,</span><span style="color:#E36209;">res</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    res.</span><span style="color:#6F42C1;">json</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        code:</span><span style="color:#005CC5;">200</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">9001</span><span style="color:#24292E;">,()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;9001&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 在express中扩充的内容</span></span>
<span class="line"><span style="color:#24292E;">a</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">xxxx</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;number&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Vue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">C</span><span style="color:#24292E;">.a</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">A</span><span style="color:#24292E;">.a</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>自定义的声明文件，注意命名为express.d.ts，代码如下：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 为express的声明文件声明一个模块，为&#39;express&#39;</span></span>
<span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">module</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;express&#39;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Router</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">path</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">router</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">Router</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">path</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span><span style="color:#B392F0;">cb</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">req</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">res</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">void</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">path</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">router</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">void</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">port</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">,</span><span style="color:#B392F0;">cb</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">=&gt;</span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Express</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        ()</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">App</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">Router</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">Router</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">express</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">Express</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> express;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 扩充一个变量</span></span>
<span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">number</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 扩充一个函数</span></span>
<span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">xxxx</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">params</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 扩充一个类</span></span>
<span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 扩充枚举类型</span></span>
<span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">enum</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">C</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">a</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 声明(含有子属性的)全局对象</span></span>
<span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">namespace</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">A</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">a</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// interface 和 type 声明全局类型</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/// &lt;reference /&gt; 三斜线指令</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 为express的声明文件声明一个模块，为&#39;express&#39;</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">module</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;express&#39;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Router</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#E36209;">path</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span><span style="color:#E36209;">router</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">Router</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">path</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span><span style="color:#6F42C1;">cb</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;">(</span><span style="color:#E36209;">req</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">,</span><span style="color:#E36209;">res</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#005CC5;">void</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">void</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#E36209;">path</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span><span style="color:#E36209;">router</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">void</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(</span><span style="color:#E36209;">port</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">number</span><span style="color:#24292E;">,</span><span style="color:#6F42C1;">cb</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#005CC5;">void</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Express</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        ()</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">App</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">Router</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">Router</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">express</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">Express</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> express;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 扩充一个变量</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">number</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 扩充一个函数</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">xxxx</span><span style="color:#24292E;">(</span><span style="color:#E36209;">params</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">){</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 扩充一个类</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 扩充枚举类型</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">C</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">a</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 声明(含有子属性的)全局对象</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">namespace</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">A</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">a</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// interface 和 type 声明全局类型</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/// &lt;reference /&gt; 三斜线指令</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div>`,5),e=[o];function c(r,t,y,E,i,F){return n(),a("div",null,e)}const m=s(l,[["render",c]]);export{u as __pageData,m as default};
