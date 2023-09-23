import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.29896bad.js";const F=JSON.parse('{"title":"10-侦听器watch","description":"","frontmatter":{},"headers":[],"relativePath":"articles/Vue/10-侦听器watch.md","filePath":"articles/Vue/10-侦听器watch.md","lastUpdated":null}'),p={name:"articles/Vue/10-侦听器watch.md"},o=l(`<h1 id="_10-侦听器watch" tabindex="-1">10-侦听器watch <a class="header-anchor" href="#_10-侦听器watch" aria-label="Permalink to &quot;10-侦听器watch&quot;">​</a></h1><p>侦听器用于观察和响应 Vue 实例上的数据变化，当侦听的数据源发生变化时，侦听器会执行一个回调函数。</p><p>侦听器适合用来处理需要在数据发生变化时执行异步操作或较复杂逻辑的场景，例如：数据验证、向服务器发送请求等。</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><div class="language-Vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">Vue</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    rarrot：&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;message1&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">hr</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    rorrot：&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;message2&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">hr</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    666：&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;message3&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">hr</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    age：&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;message4.foo.bar.age&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">hr</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    like：&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;message5.foo.bar.like&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">hr</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    career：&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;message5.foo.bar.career&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&#39;ts&#39;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref,reactive, watch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 1. 对单变量进行侦听</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> message1</span><span style="color:#F97583;">=</span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#9ECBFF;">&#39;rarrot&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">([message1],(</span><span style="color:#FFAB70;">newval</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">oldval</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 输出新值和旧值</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newval,oldval)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 2. 对多变量进行侦听</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> message2</span><span style="color:#F97583;">=</span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#9ECBFF;">&#39;rorrot&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> message3</span><span style="color:#F97583;">=</span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#9ECBFF;">&#39;666&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">([message2,message3],(</span><span style="color:#FFAB70;">newval</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">oldval</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newval,oldval)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 3. 对深层次对象进行侦听,需要开启watch的第三个属性deep进行深度监听</span></span>
<span class="line"><span style="color:#6A737D;">//    但是仍然会出现一个问题，新newval旧oldval的值一样</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> message4</span><span style="color:#F97583;">=</span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    foo:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        bar:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            age:</span><span style="color:#79B8FF;">66</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(message4,(</span><span style="color:#FFAB70;">newval</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">oldval</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newval,oldval)</span></span>
<span class="line"><span style="color:#E1E4E8;">},{</span></span>
<span class="line"><span style="color:#E1E4E8;">    deep:</span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 4. 侦听reactive数据，不用添加第三个属性deep也可以进行深度监听</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> message5</span><span style="color:#F97583;">=</span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    foo:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        bar:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            like:</span><span style="color:#9ECBFF;">&#39;ping-pong&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            career:</span><span style="color:#9ECBFF;">&#39;quanduan&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// watch(message5,(newval,oldval)=&gt;{</span></span>
<span class="line"><span style="color:#6A737D;">//     console.log(newval,oldval)</span></span>
<span class="line"><span style="color:#6A737D;">// })</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 5. 侦听reactive的单一属性</span></span>
<span class="line highlighted"><span style="color:#6A737D;">// 6. 侦听ref的单一属性时，需要用message5.value去获取值</span></span>
<span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">message5.foo.bar.career,(</span><span style="color:#FFAB70;">newval</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">oldval</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newval,</span><span style="color:#9ECBFF;">&#39;oldval &#39;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">oldval)</span></span>
<span class="line"><span style="color:#E1E4E8;">},{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//用于在执行之前先处理一次,以上这段会先输出quanduan oldval undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">    immediate:</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// pre 组件更新之前调用  sync 同步执行  post 组件更新之后执行</span></span>
<span class="line"><span style="color:#E1E4E8;">    flush:</span><span style="color:#9ECBFF;">&quot;pre&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scoped</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    rarrot：&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;message1&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">hr</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    rorrot：&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;message2&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">hr</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    666：&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;message3&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">hr</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    age：&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;message4.foo.bar.age&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">hr</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    like：&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;message5.foo.bar.like&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">hr</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    career：&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-model</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;message5.foo.bar.career&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&#39;ts&#39;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref,reactive, watch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 1. 对单变量进行侦听</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> message1</span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">&gt;(</span><span style="color:#032F62;">&#39;rarrot&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">([message1],(</span><span style="color:#E36209;">newval</span><span style="color:#24292E;">,</span><span style="color:#E36209;">oldval</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 输出新值和旧值</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newval,oldval)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 2. 对多变量进行侦听</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> message2</span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">&gt;(</span><span style="color:#032F62;">&#39;rorrot&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> message3</span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">&gt;(</span><span style="color:#032F62;">&#39;666&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">([message2,message3],(</span><span style="color:#E36209;">newval</span><span style="color:#24292E;">,</span><span style="color:#E36209;">oldval</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newval,oldval)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 3. 对深层次对象进行侦听,需要开启watch的第三个属性deep进行深度监听</span></span>
<span class="line"><span style="color:#6A737D;">//    但是仍然会出现一个问题，新newval旧oldval的值一样</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> message4</span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    foo:{</span></span>
<span class="line"><span style="color:#24292E;">        bar:{</span></span>
<span class="line"><span style="color:#24292E;">            age:</span><span style="color:#005CC5;">66</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(message4,(</span><span style="color:#E36209;">newval</span><span style="color:#24292E;">,</span><span style="color:#E36209;">oldval</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newval,oldval)</span></span>
<span class="line"><span style="color:#24292E;">},{</span></span>
<span class="line"><span style="color:#24292E;">    deep:</span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 4. 侦听reactive数据，不用添加第三个属性deep也可以进行深度监听</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> message5</span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    foo:{</span></span>
<span class="line"><span style="color:#24292E;">        bar:{</span></span>
<span class="line"><span style="color:#24292E;">            like:</span><span style="color:#032F62;">&#39;ping-pong&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            career:</span><span style="color:#032F62;">&#39;quanduan&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// watch(message5,(newval,oldval)=&gt;{</span></span>
<span class="line"><span style="color:#6A737D;">//     console.log(newval,oldval)</span></span>
<span class="line"><span style="color:#6A737D;">// })</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#6A737D;">// 5. 侦听reactive的单一属性</span></span>
<span class="line highlighted"><span style="color:#6A737D;">// 6. 侦听ref的单一属性时，需要用message5.value去获取值</span></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">message5.foo.bar.career,(</span><span style="color:#E36209;">newval</span><span style="color:#24292E;">,</span><span style="color:#E36209;">oldval</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newval,</span><span style="color:#032F62;">&#39;oldval &#39;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">oldval)</span></span>
<span class="line"><span style="color:#24292E;">},{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//用于在执行之前先处理一次,以上这段会先输出quanduan oldval undefined</span></span>
<span class="line"><span style="color:#24292E;">    immediate:</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// pre 组件更新之前调用  sync 同步执行  post 组件更新之后执行</span></span>
<span class="line"><span style="color:#24292E;">    flush:</span><span style="color:#032F62;">&quot;pre&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scoped</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br></div></div><br><p><img src="https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202309122123111.png" alt=""></p><br>`,8),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{F as __pageData,g as default};
