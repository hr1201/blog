import{d as c,h as _,p as v,J as y,o as r,c as i,C as b,_ as m,u as k,x as A,w,A as I,b as u,z as l,t as D,F as P,O as S,Q as x,r as E,a9 as p,M as d,aa as R,ab as $,ac as O,ad as B,ae as T,af as L,ag as M,ah as V,ai as F,aj as j,k as N,ak as z,al as J,am as G}from"./chunks/framework.67eb2fac.js";import{t as g}from"./chunks/theme.79fd68a5.js";const W=["id","host","repo","repoid","category","categoryid","mapping","term","strict","reactionsenabled","emitmetadata","inputposition","theme","lang","loading"],H=c({__name:"Giscus",props:{id:{},host:{},repo:{},repoId:{},category:{},categoryId:{},mapping:{},term:{},theme:{},strict:{},reactionsEnabled:{},emitMetadata:{},inputPosition:{},lang:{},loading:{}},setup(t){const a=_(!1);return v(()=>{a.value=!0,y(()=>import("./chunks/giscus-2a044aea.497f0bd4.js"),[])}),(e,o)=>a.value?(r(),i("giscus-widget",{key:0,id:e.id,host:e.host,repo:e.repo,repoid:e.repoId,category:e.category,categoryid:e.categoryId,mapping:e.mapping,term:e.term,strict:e.strict,reactionsenabled:e.reactionsEnabled,emitmetadata:e.emitMetadata,inputposition:e.inputPosition,theme:e.theme,lang:e.lang,loading:e.loading},null,8,W)):b("",!0)}});const Q={class:"comments"},U={__name:"container",setup(t){const{isDark:a,title:e}=k(),o=A();console.log();const n=_(!0);return w(()=>o.path,()=>{n.value=!1,o.path.includes("cartoonsMD")?n.value=!1:setTimeout(()=>{n.value=!0},50)},{immediate:!0}),(pe,le)=>(r(),i("div",Q,[n.value?(r(),I(u(H),{is:"script",key:u(e),repo:"hr1201/gitalk-evalute","repo-id":"R_kgDOJ9WSwA",category:"Announcements","category-id":"DIC_kwDOJ9WSwM4CYA7u",mapping:"pathname",strict:"0","reactions-enabled":"1","emit-metadata":"0","input-position":"bottom",theme:u(a)?"transparent_dark":"light",lang:"zh-CN",loading:"lazy"},null,8,["theme"])):b("",!0)]))}},f=m(U,[["__scopeId","data-v-7f4d1946"]]),Y=c({__name:"test",setup(t){const a=_({name:"rorrot"}),e=()=>{a.value.name="rarrot"};return(o,n)=>(r(),i(P,null,[l("div",null,D(a.value),1),l("button",{onClick:e},"修改")],64))}}),q=t=>(S("data-v-911223f3"),t=t(),x(),t),K={align:"right"},X=q(()=>l("img",{class:"inverted-image",alt:"0",src:"https://profile-counter.glitch.me/rorrot.cc/count.svg"},null,-1)),Z=[X],ee=c({__name:"findCount",setup(t){return(a,e)=>(r(),i("p",K,Z))}});const h=m(ee,[["__scopeId","data-v-911223f3"]]),te={class:"blocks"},ae=c({__name:"animationBlock",props:{color:{type:String,default:"rgba(0,0,0,0.9)"}},setup(t){const e={backgroundColor:t.color};return(o,n)=>(r(),i("div",te,[l("div",{style:e,class:"block"},[E(o.$slots,"default",{},void 0,!0)])]))}});const oe=m(ae,[["__scopeId","data-v-7cda31bb"]]),ne={...g,Layout:()=>p(g.Layout,null,{"doc-after":()=>p(f),"doc-footer-before":()=>p(h)}),enhanceApp({app:t,router:a,siteData:e}){t.component("containers",f).component("test",Y).component("findCount",h).component("block",oe)}};function C(t){if(t.extends){const a=C(t.extends);return{...a,...t,async enhanceApp(e){a.enhanceApp&&await a.enhanceApp(e),t.enhanceApp&&await t.enhanceApp(e)}}}return t}const s=C(ne),se=c({name:"VitePressApp",setup(){const{site:t}=k();return v(()=>{N(()=>{document.documentElement.lang=t.value.lang,document.documentElement.dir=t.value.dir})}),z(),J(),G(),s.setup&&s.setup(),()=>p(s.Layout)}});async function re(){const t=ie(),a=ce();a.provide($,t);const e=O(t.route);return a.provide(B,e),a.component("Content",T),a.component("ClientOnly",L),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return e.frontmatter.value}},$params:{get(){return e.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:t,siteData:M}),{app:a,router:t,data:e}}function ce(){return V(se)}function ie(){let t=d,a;return F(e=>{let o=j(e);return t&&(a=o),(t||a===o)&&(o=o.replace(/\.js$/,".lean.js")),d&&(t=!1),y(()=>import(o),[])},s.NotFound)}d&&re().then(({app:t,router:a,data:e})=>{a.go().then(()=>{R(a.route,e.site),t.mount("#app")})});export{re as createApp};
