import{d as c,h as _,j as v,U as y,o as r,c as i,e as b,_ as m,u as k,K as A,x as w,b as I,l as u,k as l,t as D,F as P,p as S,m as x,r as E,a6 as p,s as d,a7 as R,a8 as $,a9 as B,aa as O,ab as T,ac as L,ad as V,ae as j,af as F,ag as M,y as N,ah as z,ai as G,aj as J}from"./chunks/framework.fe0df64f.js";import{t as g}from"./chunks/theme.03d1a7b8.js";const U=["id","host","repo","repoid","category","categoryid","mapping","term","strict","reactionsenabled","emitmetadata","inputposition","theme","lang","loading"],W=c({__name:"Giscus",props:{id:{},host:{},repo:{},repoId:{},category:{},categoryId:{},mapping:{},term:{},theme:{},strict:{},reactionsEnabled:{},emitMetadata:{},inputPosition:{},lang:{},loading:{}},setup(t){const a=_(!1);return v(()=>{a.value=!0,y(()=>import("./chunks/giscus-2a044aea.497f0bd4.js"),[])}),(e,n)=>a.value?(r(),i("giscus-widget",{key:0,id:e.id,host:e.host,repo:e.repo,repoid:e.repoId,category:e.category,categoryid:e.categoryId,mapping:e.mapping,term:e.term,strict:e.strict,reactionsenabled:e.reactionsEnabled,emitmetadata:e.emitMetadata,inputposition:e.inputPosition,theme:e.theme,lang:e.lang,loading:e.loading},null,8,U)):b("",!0)}});const H={class:"comments"},K={__name:"container",setup(t){const{isDark:a,title:e}=k(),n=A();console.log();const o=_(!0);return w(()=>n.path,()=>{o.value=!1,n.path.includes("cartoonsMD")?o.value=!1:setTimeout(()=>{o.value=!0},50)},{immediate:!0}),(pe,le)=>(r(),i("div",H,[o.value?(r(),I(u(W),{is:"script",key:u(e),repo:"hr1201/gitalk-evalute","repo-id":"R_kgDOJ9WSwA",category:"Announcements","category-id":"DIC_kwDOJ9WSwM4CYA7u",mapping:"pathname",strict:"0","reactions-enabled":"1","emit-metadata":"0","input-position":"bottom",theme:u(a)?"transparent_dark":"light",lang:"zh-CN",loading:"lazy"},null,8,["theme"])):b("",!0)]))}},f=m(K,[["__scopeId","data-v-7f4d1946"]]),Y=c({__name:"test",setup(t){const a=_({name:"rorrot"}),e=()=>{a.value.name="rarrot"};return(n,o)=>(r(),i(P,null,[l("div",null,D(a.value),1),l("button",{onClick:e},"修改")],64))}}),q=t=>(S("data-v-911223f3"),t=t(),x(),t),Q={align:"right"},X=q(()=>l("img",{class:"inverted-image",alt:"0",src:"https://profile-counter.glitch.me/rorrot.cc/count.svg"},null,-1)),Z=[X],ee=c({__name:"findCount",setup(t){return(a,e)=>(r(),i("p",Q,Z))}});const h=m(ee,[["__scopeId","data-v-911223f3"]]),te={class:"blocks"},ae=c({__name:"animationBlock",props:{color:{type:String,default:"rgba(0,0,0,0.9)"}},setup(t){const e={backgroundColor:t.color};return(n,o)=>(r(),i("div",te,[l("div",{style:e,class:"block"},[E(n.$slots,"default",{},void 0,!0)])]))}});const ne=m(ae,[["__scopeId","data-v-7cda31bb"]]),oe={...g,Layout:()=>p(g.Layout,null,{"doc-after":()=>p(f),"doc-footer-before":()=>p(h)}),enhanceApp({app:t,router:a,siteData:e}){t.component("containers",f).component("test",Y).component("findCount",h).component("block",ne)}};function C(t){if(t.extends){const a=C(t.extends);return{...a,...t,async enhanceApp(e){a.enhanceApp&&await a.enhanceApp(e),t.enhanceApp&&await t.enhanceApp(e)}}}return t}const s=C(oe),se=c({name:"VitePressApp",setup(){const{site:t}=k();return v(()=>{N(()=>{document.documentElement.lang=t.value.lang,document.documentElement.dir=t.value.dir})}),z(),G(),J(),s.setup&&s.setup(),()=>p(s.Layout)}});async function re(){const t=ie(),a=ce();a.provide($,t);const e=B(t.route);return a.provide(O,e),a.component("Content",T),a.component("ClientOnly",L),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return e.frontmatter.value}},$params:{get(){return e.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:t,siteData:V}),{app:a,router:t,data:e}}function ce(){return j(se)}function ie(){let t=d,a;return F(e=>{let n=M(e);return n?(t&&(a=n),(t||a===n)&&(n=n.replace(/\.js$/,".lean.js")),d&&(t=!1),y(()=>import(n),[])):null},s.NotFound)}d&&re().then(({app:t,router:a,data:e})=>{a.go().then(()=>{R(a.route,e.site),t.mount("#app")})});export{re as createApp};
