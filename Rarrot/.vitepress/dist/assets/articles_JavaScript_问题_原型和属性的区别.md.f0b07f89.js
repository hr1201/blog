import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.fe0df64f.js";const b=JSON.parse('{"title":"原型和属性的区别","description":"","frontmatter":{},"headers":[],"relativePath":"articles/JavaScript/问题/原型和属性的区别.md","filePath":"articles/JavaScript/问题/原型和属性的区别.md","lastUpdated":1693315179000}'),o={name:"articles/JavaScript/问题/原型和属性的区别.md"},l=p(`<h1 id="原型和属性的区别" tabindex="-1">原型和属性的区别 <a class="header-anchor" href="#原型和属性的区别" aria-label="Permalink to &quot;原型和属性的区别&quot;">​</a></h1><p>前置：来自 &lt;<a href="https://zhuanlan.zhihu.com/p/35458229" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/35458229</a>&gt;</p><p>JavaScript在设计之初，作为一种网页脚本语言，没有设计得很复杂，这种语言只要能够完成一些简单操作就够了。Javascript里面所有的数据类型都是对象（object）。在ES6之前，js中是没有Class的概念的（ES6中的类也是语法糖，本质还是基于原型），<strong>为了实现实例对象的属性和方法共享</strong>，就给function设计了一个prototype的概念。<strong>每个对象都有一个原型属性，原型属性指向另一个对象，而原型属性中的对象是会被其他对象所继承的，也就是共用的，对象自身的有些属性和方法则不可以。原型对象(prototype)也有一个自己的原型对象(_proto_)，普通属性并非为对象</strong>。</p><h2 id="关于jquery框架" tabindex="-1">关于jQuery框架 <a class="header-anchor" href="#关于jquery框架" aria-label="Permalink to &quot;关于jQuery框架&quot;">​</a></h2><p>在前端入门时必须掌握的一个框架就是jQuery，其实你每次调用$(“…”)时，都会返回一个实例化的新的jQuery对象出来（内部帮你执行了new方法，关于jQuery初始化这一段也是jQuery的精髓之一，实现的相当巧妙，有兴趣可以去看看），这样做既没有使实例对象私有属性相互影响（如上面的propA），又能共用方法（如上面的methodB）。</p><h2 id="原型链" tabindex="-1">原型链 <a class="header-anchor" href="#原型链" aria-label="Permalink to &quot;原型链&quot;">​</a></h2><p>下图通过原型链从而找到toString方法，而其他对象同样具有此方法，所以并不是对象会把这些方法和属性复制过来，只是通过原型（prototype）找到被继承的对象的原型。</p><p><img src="https://cdn.staticaly.com/gh/hr1201/img@main/imgs/image-20221026223200603.png" alt="image-20221026223200603"></p><p>理解对象的原型（prototype）（可以通过<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf" target="_blank" rel="noreferrer">Object.getPrototypeOf(obj)</a>或者已被弃用的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto" target="_blank" rel="noreferrer">proto</a>属性获得）与构造函数的prototype属性之间的区别是很重要的。前者是每个实例上都有的属性，后者是构造函数的属性。也就是说，<strong>Object.getPrototypeOf(new Foobar())和Foobar.prototype指向着同一个对象。</strong></p><p>对象这些公用属性和方法定义在 Object 的构造器函数 (constructor functions) 之上的prototype属性上(意味着可以被继承)，而非对象实例本身。</p><h2 id="proto-和prototype的区别" tabindex="-1">_proto_和prototype的区别 <a class="header-anchor" href="#proto-和prototype的区别" aria-label="Permalink to &quot;\\_proto\\_和prototype的区别&quot;">​</a></h2><p>Object.prototype的proto属性是一个访问器属性（一个getter函数和一个setter函数），它公开访问它的对象的内部[[Prototype]]（对象或null）。尽量别用proto属性，存在争议。</p><p>prototype 指向一块内存，这个内存里面有共用属性；</p><p>proto 指向同一块内存；</p><p><strong>prototype 和 proto 的不同点在于prototype 一般是构造函数的属性，而 proto 是对象的属性。</strong></p><p><strong>难点在于……构造函数也是对象！</strong></p><p><strong>如果没有 prototype，那么共用属性就没有立足之地，</strong></p><p>如果没有 proto，那么一个对象就不知道自己的共用属性有哪些。上面所说proto属性是一个访问器属性，通俗来说，prototype就是用它来查找有哪些对象是可继承，且继承了的。</p><ol><li>prototype存储共用的属性和方法，</li><li>proto用来将对象与该对象的原型相连，</li><li>constuctor是用来将原型对象指向关联的构造函数。</li></ol><p>在<code>问题/object</code>有详细的介绍。</p><h2 id="proto-的搜索" tabindex="-1">_proto_的搜索 <a class="header-anchor" href="#proto-的搜索" aria-label="Permalink to &quot;_proto_的搜索&quot;">​</a></h2><p>在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是__proto__属性，是从构造函数的prototype属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">(){}</span></span>
<span class="line"><span style="color:#79B8FF;">doSomething</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;bar&quot;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 在原型上添加一个property(属性)</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> doSomeInstancing </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">doSomeInstancing.prop </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;some value&quot;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 在对象上添加property(属性)</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">( doSomeInstancing );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;doSomeInstancing.prop:      &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> doSomeInstancing.prop);</span><span style="color:#6A737D;">//some value</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;doSomeInstancing.foo:       &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> doSomeInstancing.foo);</span><span style="color:#6A737D;">//bar</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;doSomething.prop:           &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> doSomething.prop);</span><span style="color:#6A737D;">//underfined</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;doSomething.foo:            &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> doSomething.foo);</span><span style="color:#6A737D;">//underfined</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;doSomething.prototype.prop: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">doSomething</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.prop);</span><span style="color:#6A737D;">//underfined</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;doSomething.prototype.foo: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">doSomething</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.foo);</span><span style="color:#6A737D;">//bar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">(){}</span></span>
<span class="line"><span style="color:#005CC5;">doSomething</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;bar&quot;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 在原型上添加一个property(属性)</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> doSomeInstancing </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">doSomeInstancing.prop </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;some value&quot;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 在对象上添加property(属性)</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">( doSomeInstancing );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;doSomeInstancing.prop:      &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> doSomeInstancing.prop);</span><span style="color:#6A737D;">//some value</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;doSomeInstancing.foo:       &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> doSomeInstancing.foo);</span><span style="color:#6A737D;">//bar</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;doSomething.prop:           &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> doSomething.prop);</span><span style="color:#6A737D;">//underfined</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;doSomething.foo:            &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> doSomething.foo);</span><span style="color:#6A737D;">//underfined</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;doSomething.prototype.prop: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">doSomething</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.prop);</span><span style="color:#6A737D;">//underfined</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;doSomething.prototype.foo: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">doSomething</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.foo);</span><span style="color:#6A737D;">//bar</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{ </span><span style="color:#6A737D;">//在底层代码里面是有点套娃操作</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">prop</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;some value&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">__proto__</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bar&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">constructor</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">__proto__</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">constructor</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Object</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">hasOwnProperty</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwnProperty</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">isPrototypeOf</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isPrototypeOf</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">propertyIsEnumerable</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">propertyIsEnumerable</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">toLocaleString</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toLocaleString</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">valueOf</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">valueOf</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{ </span><span style="color:#6A737D;">//在底层代码里面是有点套娃操作</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">prop</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;some value&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">__proto__</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bar&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">constructor</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">__proto__</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">constructor</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Object</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">hasOwnProperty</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwnProperty</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">isPrototypeOf</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isPrototypeOf</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">propertyIsEnumerable</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">propertyIsEnumerable</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">toLocaleString</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toLocaleString</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">valueOf</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">valueOf</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><code>doSomeInstancing 的 __proto__ 属性就是doSomething.prototype</code></p><p>个人理解，prototype有点类似于指针。但在object上一层的prototype则有点虚拟头的意思。（些许偏差，因为指针指向是一个节点，而prototype不断向上查找其他对象的prototype，直至找到所需要的方法或属性，没有则null，每个对象都具有prototype，而prototype指向另一个对象）</p><p><img src="https://cdn.staticaly.com/gh/hr1201/img@main/imgs/image-20221026204730984.png" alt="image-20221026204730984"></p><h2 id="原型的实践" tabindex="-1">原型的实践 <a class="header-anchor" href="#原型的实践" aria-label="Permalink to &quot;原型的实践&quot;">​</a></h2><h3 id="create" tabindex="-1">create() <a class="header-anchor" href="#create" aria-label="Permalink to &quot;create()&quot;">​</a></h3><p>我们可以使用Object.create()的方法，创建原型对象，例如：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> person1</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(person);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> person1</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(person);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>以person为原型对象创建了一个person1对象，在控制台输入以下代码返回person：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">person1._proto_</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">person1._proto_</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="constructor属性" tabindex="-1">constructor属性 <a class="header-anchor" href="#constructor属性" aria-label="Permalink to &quot;constructor属性&quot;">​</a></h3><p>每个实例对象都从原型中继承了一个constructor属性，该属性指向了用于该构造此实例对象的构造函数，，</p><p>也就是可以使用它找到构造函数</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">person1.</span><span style="color:#79B8FF;">constructor</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">//如果构造此对象的是person函数，返回person()，没有的话就返回object()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">person1.</span><span style="color:#005CC5;">constructor</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">//如果构造此对象的是person函数，返回person()，没有的话就返回object()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用这个属性返回构造器，构造器是一个函数，故可以通过圆括号调用；只需在前面添加 new 关键字，便能将此函数作为构造器使用。当没有原始构造器的引用时，就可以使用此种方式。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> person3 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> person1.</span><span style="color:#B392F0;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Karen&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Stephenson&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">26</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;female&#39;</span><span style="color:#E1E4E8;">, [</span><span style="color:#9ECBFF;">&#39;playing drums&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;mountain climbing&#39;</span><span style="color:#E1E4E8;">]);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> person3 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> person1.</span><span style="color:#6F42C1;">constructor</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Karen&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Stephenson&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">26</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;female&#39;</span><span style="color:#24292E;">, [</span><span style="color:#032F62;">&#39;playing drums&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;mountain climbing&#39;</span><span style="color:#24292E;">]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="修改原型" tabindex="-1">修改原型 <a class="header-anchor" href="#修改原型" aria-label="Permalink to &quot;修改原型&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//Person是构造person1的函数</span></span>
<span class="line"><span style="color:#79B8FF;">Person</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">farewell</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name.first </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39; has left the building. Bye for now!&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//Person是构造person1的函数</span></span>
<span class="line"><span style="color:#005CC5;">Person</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">farewell</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name.first </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39; has left the building. Bye for now!&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在控制台输入person1.farewell()会看到一条警告信息，其中还显示了构造器中定义的人名；这很有用。但更关键的是，整条继承链动态地更新了，任何由此构造器创建的对象实例都自动获得了这个方法.</p><p>证明了先前的原型链模型这种继承模型下，上游对象的方法不会复制到下游的对象实例中；下游对象本身虽然没有定义这些方法，但浏览器会通过上溯原型链、从上游对象中找到它们。这种继承模型提供了一个强大而可扩展的功能系统。</p><p>关于属性定义在prototype，由于定义起来并不灵活，this的指向需要特别注意，例如：</p><p><img src="https://cdn.staticaly.com/gh/hr1201/img@main/imgs/image-20221027133055961.png" alt="image-20221027133055961"></p><h3 id="一种常见的定义模型" tabindex="-1">一种常见的定义模型 <a class="header-anchor" href="#一种常见的定义模型" aria-label="Permalink to &quot;一种常见的定义模型&quot;">​</a></h3><p>在构造器（函数体）中定义属性、在 prototype 属性上定义方法。如此，构造器只包含属性定义，而方法则分装在不同的代码块，代码更具可读性</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 构造器及其属性定义</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">c</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">d</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 属性定义</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#6A737D;">// 定义第一个方法</span></span>
<span class="line"><span style="color:#79B8FF;">Test</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">x</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () { </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 定义第二个方法</span></span>
<span class="line"><span style="color:#79B8FF;">Test</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">y</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () { </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 构造器及其属性定义</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;">(</span><span style="color:#E36209;">a</span><span style="color:#24292E;">,</span><span style="color:#E36209;">b</span><span style="color:#24292E;">,</span><span style="color:#E36209;">c</span><span style="color:#24292E;">,</span><span style="color:#E36209;">d</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 属性定义</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#6A737D;">// 定义第一个方法</span></span>
<span class="line"><span style="color:#005CC5;">Test</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">x</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () { </span><span style="color:#D73A49;">...</span><span style="color:#24292E;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 定义第二个方法</span></span>
<span class="line"><span style="color:#005CC5;">Test</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">y</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () { </span><span style="color:#D73A49;">...</span><span style="color:#24292E;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>典型的例子：<a href="https://github.com/zalun/school-plan-app/blob/master/stage9/js/index.js" target="_blank" rel="noreferrer">school plan app</a></p>`,49),e=[l];function t(r,c,y,E,i,u){return n(),a("div",null,e)}const F=s(o,[["render",t]]);export{b as __pageData,F as default};
