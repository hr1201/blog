import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.fe0df64f.js";const u=JSON.parse('{"title":"Class类","description":"","frontmatter":{},"headers":[],"relativePath":"articles/typescript/08-Class类.md","filePath":"articles/typescript/08-Class类.md","lastUpdated":1695433746000}'),p={name:"articles/typescript/08-Class类.md"},o=l(`<h1 id="class类" tabindex="-1">Class类 <a class="header-anchor" href="#class类" aria-label="Permalink to &quot;Class类&quot;">​</a></h1><h2 id="_1-class的基本用法-继承-和-类型约束-implements" tabindex="-1">1.class的基本用法 继承 和 类型约束 implements <a class="header-anchor" href="#_1-class的基本用法-继承-和-类型约束-implements" aria-label="Permalink to &quot;1.class的基本用法 继承 和 类型约束 implements&quot;">​</a></h2><p>这是一个学习继承、类型约束和implements的例子，实现了一个<strong>简单的虚拟Dom操作</strong>：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Options</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">el</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLElement</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueCls</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">Options</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">void</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vnode</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">tag</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">//div section header</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">text</span><span style="color:#F97583;">?:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//123</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">children</span><span style="color:#F97583;">?:</span><span style="color:#B392F0;">Vnode</span><span style="color:#E1E4E8;">[]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 虚拟DOM 简单版</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Dom</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 创建节点的方法</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(el)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 填充文本的方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setText</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">HTMLElement</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">text</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#F97583;">|</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// el.textContent为文本内容</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.textContent</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">text;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 渲染函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">Vnode</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 调用createElement方法，创建dom节点，传入节点tag，赋值给根节点root</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> root</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(data.tag)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 当存在子节点就调用进行if条件</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(data.children </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> Array.</span><span style="color:#B392F0;">isArray</span><span style="color:#E1E4E8;">(data.children)){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// children为数组，进行遍历</span></span>
<span class="line"><span style="color:#E1E4E8;">            data.children.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">item</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 进行递归，要是有子节点的子节点，则继续调用</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> child</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(item)</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 根节点添加子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">                root.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">            })</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 若没有子节点了，即进行文本内容的添加，这里似乎只能对最里面的子节点进行添加文本内容</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">setText</span><span style="color:#E1E4E8;">(root,data.text)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 返回根节点</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> root</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    }   </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Dom</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">VueCls</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Options</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 一个有参的构造方法，参数为Options，其属性el可为字符串类型或者HTMLElement类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 初始化Vue即会调用这个有参构造方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Options</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#6A737D;">// 父类的prototype.constructor.call，父类有一个无参的构造方法，父类的构造方法不能被继承</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 父类的prototype.constructor.call，父类有一个无参的构造方法，父类的构造方法不能被继承</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 使用super()可以调用父类的无参构造方法，使父类中属性和方法得到正确的初始化</span></span>
<span class="line"><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.options</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">options</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 虚拟dom就是通过js去渲染真实dom</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.options)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Vnode为虚拟节点，在里面实现想要在挂载元素上显示的内容，tag属性为必要，text和children可选</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> data</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">Vnode</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 父节点</span></span>
<span class="line"><span style="color:#E1E4E8;">            tag:</span><span style="color:#9ECBFF;">&#39;div&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            text:</span><span style="color:#9ECBFF;">&#39;rarrotdsacf&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">            children:[</span></span>
<span class="line"><span style="color:#E1E4E8;">                {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    tag:</span><span style="color:#9ECBFF;">&#39;div&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#6A737D;">// 子节点的子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">                    children:[</span></span>
<span class="line"><span style="color:#E1E4E8;">                        {</span></span>
<span class="line"><span style="color:#E1E4E8;">                            tag:</span><span style="color:#9ECBFF;">&#39;p&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                            text:</span><span style="color:#9ECBFF;">&#39;rarr ot&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">                },</span></span>
<span class="line"><span style="color:#E1E4E8;">                {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    tag:</span><span style="color:#9ECBFF;">&#39;section&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                    text:</span><span style="color:#9ECBFF;">&#39;我是子节点2&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            ]</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 判断传入的el是字符串类型还是HTMLElement类型；若为字符串类型，则需要匹配元素，否则直接赋值给app</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> app</span><span style="color:#F97583;">=typeof</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.options.el</span><span style="color:#F97583;">==</span><span style="color:#9ECBFF;">&#39;string&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.options.el) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.options.el</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 将data传入render，进行渲染；app再进行添加</span></span>
<span class="line"><span style="color:#E1E4E8;">        app.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(data))</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//Options接口只有一个属性el，用户在传入options时，仅对el赋值即可</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    el:</span><span style="color:#9ECBFF;">&#39;#app&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Options</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">el</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLElement</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueCls</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">options</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">Options</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">void</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vnode</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">tag</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">   </span><span style="color:#6A737D;">//div section header</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">text</span><span style="color:#D73A49;">?:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//123</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">children</span><span style="color:#D73A49;">?:</span><span style="color:#6F42C1;">Vnode</span><span style="color:#24292E;">[]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 虚拟DOM 简单版</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Dom</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 创建节点的方法</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(el)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 填充文本的方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setText</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">HTMLElement</span><span style="color:#24292E;">,</span><span style="color:#E36209;">text</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#D73A49;">|</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// el.textContent为文本内容</span></span>
<span class="line"><span style="color:#24292E;">        el.textContent</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">text;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 渲染函数</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">Vnode</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 调用createElement方法，创建dom节点，传入节点tag，赋值给根节点root</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> root</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(data.tag)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 当存在子节点就调用进行if条件</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(data.children </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> Array.</span><span style="color:#6F42C1;">isArray</span><span style="color:#24292E;">(data.children)){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// children为数组，进行遍历</span></span>
<span class="line"><span style="color:#24292E;">            data.children.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">item</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 进行递归，要是有子节点的子节点，则继续调用</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> child</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(item)</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 根节点添加子节点</span></span>
<span class="line"><span style="color:#24292E;">                root.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">            })</span></span>
<span class="line"><span style="color:#24292E;">        }</span><span style="color:#D73A49;">else</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 若没有子节点了，即进行文本内容的添加，这里似乎只能对最里面的子节点进行添加文本内容</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">setText</span><span style="color:#24292E;">(root,data.text)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 返回根节点</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> root</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    }   </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Dom</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">VueCls</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">options</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Options</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 一个有参的构造方法，参数为Options，其属性el可为字符串类型或者HTMLElement类型</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 初始化Vue即会调用这个有参构造方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">options</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Options</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#6A737D;">// 父类的prototype.constructor.call，父类有一个无参的构造方法，父类的构造方法不能被继承</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 父类的prototype.constructor.call，父类有一个无参的构造方法，父类的构造方法不能被继承</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 使用super()可以调用父类的无参构造方法，使父类中属性和方法得到正确的初始化</span></span>
<span class="line"><span style="color:#005CC5;">super</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.options</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">options</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 虚拟dom就是通过js去渲染真实dom</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.options)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Vnode为虚拟节点，在里面实现想要在挂载元素上显示的内容，tag属性为必要，text和children可选</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> data</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">Vnode</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 父节点</span></span>
<span class="line"><span style="color:#24292E;">            tag:</span><span style="color:#032F62;">&#39;div&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            text:</span><span style="color:#032F62;">&#39;rarrotdsacf&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 子节点</span></span>
<span class="line"><span style="color:#24292E;">            children:[</span></span>
<span class="line"><span style="color:#24292E;">                {</span></span>
<span class="line"><span style="color:#24292E;">                    tag:</span><span style="color:#032F62;">&#39;div&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6A737D;">// 子节点的子节点</span></span>
<span class="line"><span style="color:#24292E;">                    children:[</span></span>
<span class="line"><span style="color:#24292E;">                        {</span></span>
<span class="line"><span style="color:#24292E;">                            tag:</span><span style="color:#032F62;">&#39;p&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                            text:</span><span style="color:#032F62;">&#39;rarr ot&#39;</span></span>
<span class="line"><span style="color:#24292E;">                        }</span></span>
<span class="line"><span style="color:#24292E;">                    ]</span></span>
<span class="line"><span style="color:#24292E;">                },</span></span>
<span class="line"><span style="color:#24292E;">                {</span></span>
<span class="line"><span style="color:#24292E;">                    tag:</span><span style="color:#032F62;">&#39;section&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                    text:</span><span style="color:#032F62;">&#39;我是子节点2&#39;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            ]</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 判断传入的el是字符串类型还是HTMLElement类型；若为字符串类型，则需要匹配元素，否则直接赋值给app</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> app</span><span style="color:#D73A49;">=typeof</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.options.el</span><span style="color:#D73A49;">==</span><span style="color:#032F62;">&#39;string&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.options.el) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.options.el</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 将data传入render，进行渲染；app再进行添加</span></span>
<span class="line"><span style="color:#24292E;">        app.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(data))</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//Options接口只有一个属性el，用户在传入options时，仅对el赋值即可</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    el:</span><span style="color:#032F62;">&#39;#app&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br></div></div><p><img src="https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202307251627477.png" alt=""></p><h2 id="_2-class的修饰符-readonly-private-protected-public" tabindex="-1">2.class的修饰符 readonly private protected public <a class="header-anchor" href="#_2-class的修饰符-readonly-private-protected-public" aria-label="Permalink to &quot;2.class的修饰符 readonly private protected public&quot;">​</a></h2><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">readonly </span><span style="color:#B392F0;">options</span><span style="color:#E1E4E8;">: Options</span><span style="color:#6A737D;">//设置options属性不可修改，只能读取</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//设置为private，则createElement只有实现这个方法的类可用</span></span>
<span class="line"><span style="color:#6A737D;">//设置为protected，则子类可以访问，但外部类还是不可以访问</span></span>
<span class="line"><span style="color:#6A737D;">//默认设置为public，则都可以访问</span></span>
<span class="line"><span style="color:#E1E4E8;">private </span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(el:string){</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`  // 创建节点的方法</span></span>
<span class="line"><span style="color:#9ECBFF;"> \`</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(el)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">readonly </span><span style="color:#6F42C1;">options</span><span style="color:#24292E;">: Options</span><span style="color:#6A737D;">//设置options属性不可修改，只能读取</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//设置为private，则createElement只有实现这个方法的类可用</span></span>
<span class="line"><span style="color:#6A737D;">//设置为protected，则子类可以访问，但外部类还是不可以访问</span></span>
<span class="line"><span style="color:#6A737D;">//默认设置为public，则都可以访问</span></span>
<span class="line"><span style="color:#24292E;">private </span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(el:string){</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">\`  // 创建节点的方法</span></span>
<span class="line"><span style="color:#032F62;"> \`</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(el)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="静态方法" tabindex="-1">静态方法 <a class="header-anchor" href="#静态方法" aria-label="Permalink to &quot;静态方法&quot;">​</a></h2><p>可以在属性或方法前面加上<code>static</code>，添加之后，可以直接用类名调用<code>static方法</code>，<strong>static属性只能由static方法调用</strong>，原因为<code>static属性</code>和<code>static方法</code>在类加载时就存在于内存中，而不需要实例化类，<code>static</code>初始化的时候别的属性方法还不存在。同样地，<strong>静态成员也不能访问实例成员</strong>。</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Ref</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">num</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">666</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getNum</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">\`        return this.num</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">//🚀 ~ file: index.ts:118 ~ ref: 666</span></span>
<span class="line"><span style="color:#9ECBFF;">console.log(&quot;🚀 ~ file: index.ts:118 ~ ref:&quot;, Ref.num)      </span></span>
<span class="line"><span style="color:#9ECBFF;">//🚀 ~ file: index.ts:118 ~ ref: 666</span></span>
<span class="line"><span style="color:#9ECBFF;">console.log(&quot;🚀 ~ file: index.ts:118 ~ ref:&quot;, Ref.getNum())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Ref</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#E36209;">num</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">666</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getNum</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#032F62;">\`        return this.num</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">//🚀 ~ file: index.ts:118 ~ ref: 666</span></span>
<span class="line"><span style="color:#032F62;">console.log(&quot;🚀 ~ file: index.ts:118 ~ ref:&quot;, Ref.num)      </span></span>
<span class="line"><span style="color:#032F62;">//🚀 ~ file: index.ts:118 ~ ref: 666</span></span>
<span class="line"><span style="color:#032F62;">console.log(&quot;🚀 ~ file: index.ts:118 ~ ref:&quot;, Ref.getNum())</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="get-set" tabindex="-1">get set <a class="header-anchor" href="#get-set" aria-label="Permalink to &quot;get set&quot;">​</a></h2><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Ref</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">_value</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">any</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._value</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">value;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._value</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&#39;000&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">newVal</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._value</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">newVal</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&#39;666&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ref</span><span style="color:#F97583;">=new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;哈哈哈&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 🚀 ~ file: index.ts:117 ~ ref: 哈哈哈</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀 ~ file: index.ts:117 ~ ref:&quot;</span><span style="color:#E1E4E8;">, ref.value)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ref.value</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;rarrot&#39;</span><span style="color:#6A737D;">// 调用set，所以此时为rarrot666</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 🚀 ~ file: index.ts:117 ~ ref: rarrot666000，调用了get，所以为rarrot666000</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;🚀 ~ file: index.ts:117 ~ ref:&quot;</span><span style="color:#E1E4E8;">, ref.value)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Ref</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#E36209;">_value</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">any</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._value</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">value;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">get</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._value</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&#39;000&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">(</span><span style="color:#E36209;">newVal</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._value</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">newVal</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&#39;666&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ref</span><span style="color:#D73A49;">=new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;哈哈哈&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 🚀 ~ file: index.ts:117 ~ ref: 哈哈哈</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀 ~ file: index.ts:117 ~ ref:&quot;</span><span style="color:#24292E;">, ref.value)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ref.value</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;rarrot&#39;</span><span style="color:#6A737D;">// 调用set，所以此时为rarrot666</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 🚀 ~ file: index.ts:117 ~ ref: rarrot666000，调用了get，所以为rarrot666000</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;🚀 ~ file: index.ts:117 ~ ref:&quot;</span><span style="color:#24292E;">, ref.value)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div>`,12),e=[o];function c(r,t,E,y,i,b){return n(),a("div",null,e)}const m=s(p,[["render",c]]);export{u as __pageData,m as default};
