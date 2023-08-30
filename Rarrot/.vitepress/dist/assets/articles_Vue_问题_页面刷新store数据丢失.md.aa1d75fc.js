import{_ as s,o as a,c as n,R as e}from"./chunks/framework.9b35f1b8.js";const C=JSON.parse('{"title":"页面刷新store数据丢失","description":"","frontmatter":{},"headers":[],"relativePath":"articles/Vue/问题/页面刷新store数据丢失.md","filePath":"articles/Vue/问题/页面刷新store数据丢失.md","lastUpdated":1693316982000}'),l={name:"articles/Vue/问题/页面刷新store数据丢失.md"},p=e(`<h1 id="页面刷新store数据丢失" tabindex="-1">页面刷新store数据丢失 <a class="header-anchor" href="#页面刷新store数据丢失" aria-label="Permalink to &quot;页面刷新store数据丢失&quot;">​</a></h1><h2 id="问题产生" tabindex="-1">问题产生 <a class="header-anchor" href="#问题产生" aria-label="Permalink to &quot;问题产生&quot;">​</a></h2><p>在登录后，由于大部分接口都需要获取到区域名，所以将区域名保存在vuex中，但是在页面<strong>刷新后，区域名的值变为underfined。</strong></p><h2 id="原因" tabindex="-1">原因 <a class="header-anchor" href="#原因" aria-label="Permalink to &quot;原因&quot;">​</a></h2><p>在页面刷新时，vue 实例重新加载，store 被重置；store 是<strong>存储组件状态</strong>的，不是用来存储本地数据库的。</p><p>所以要用本地存储方式（1.cookie；2.localStorage;3.sessionStorage;根据其存储的原理，这里使用第三种方式）来进行本地存储。</p><h2 id="解决方法" tabindex="-1">解决方法 <a class="header-anchor" href="#解决方法" aria-label="Permalink to &quot;解决方法&quot;">​</a></h2><p>在 Vue 应用中，Vuex 可以解决页面刷新后数据丢失的问题。Vuex 允许我们将应用的状态存储在一个集中的地方，这个状态可以在应用的各个组件中共享和使用。当页面刷新时，我们可以使用 Vuex 的插件来将应用的<strong>状态持久化到本地存储</strong>中，这样数据就可以在页面刷新后得到保存。</p><p>Vuex 提供了一个叫做 <strong>Vuex Persistedstate</strong> 的插件，可以将应用的状态持久化到本地存储中。使用 Vuex Persistedstate 插件非常简单，只需要在创建 Vuex store 时将其作为插件传入即可。下面是一个使用 Vuex Persistedstate 插件的示例：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> Vuex </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vuex</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> createPersistedState </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vuex-persistedstate</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> store </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Vuex</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Store</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 状态</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 修改状态的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mutations</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">increment</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 插件</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#82AAFF;">createPersistedState</span><span style="color:#A6ACCD;">()]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>在上面的示例中，我们使用了 <code>vuex-persistedstate</code> 包中的 <code>createPersistedState</code> 方法来创建一个 Vuex 插件，并将其传入 Vuex store 的 <code>plugins</code> 选项中。这样，当我们修改应用的状态时，插件会自动将状态持久化到本地存储中。在页面刷新后，我们可以使用 <code>createPersistedState</code> 方法来恢复应用的状态。</p><div class="warning custom-block"><p class="custom-block-title">注意</p><p>好用虽好用，但不能滥用。</p></div>`,12),o=[p];function t(r,c,i,D,y,F){return a(),n("div",null,o)}const d=s(l,[["render",t]]);export{C as __pageData,d as default};
