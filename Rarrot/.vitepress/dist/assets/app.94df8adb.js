import{d as l,A as C,u as g,a5 as x,h,w as b,o as r,c as d,D as A,b as E,N as I,G as $,_ as f,C as n,p as w,a6 as k,t as B,F as D,S as P,U as S,a7 as c,Q as p,a8 as R,a9 as L,aa as T,ab as F,ac as M,ad as O,ae as j,af as N,ag as V,ah as J,M as U,k as z,ai as G,aj as W,ak as Y}from"./chunks/framework.747c9e80.js";import{t as u}from"./chunks/theme.49494f10.js";const q={class:"comments"},m=l({__name:"container",setup(t){const a=C(),{title:o}=g(),e=x({repo:"hr1201/gitalk-evalute",repoId:"R_kgDOJ9WSwA",category:"Announcements",categoryId:"DIC_kwDOJ9WSwM4CYA7u",mapping:"title",strict:"0",reactionsEnabled:"1",emitMetadata:"0",inputPosition:"top",theme:"preferred_color_scheme",lang:"zh-CN",loading:"lazy",crossorign:"anonymous"}),i=h(!0);return b(()=>a.path,()=>{i.value=!1,setTimeout(()=>{i.value=!0},200)},{immediate:!0}),(v,At)=>(r(),d("div",q,[i.value?(r(),A(I("script"),{src:"https://giscus.app/client.js",key:E(o),"data-repo":e.repo,"data-repo-id":e.repoId,"data-category":e.category,"data-category-id":e.categoryId,"data-mapping":e.mapping,"data-strict":e.strict,"data-reactions-enabled":e.reactionsEnabled,"data-emit-metadata":e.emitMetadata,"data-input-position":e.inputPosition,"data-lang":e.lang,"data-theme":e.theme,"data-loading":e.loading,"data-crossorign":e.crossorign},null,8,["data-repo","data-repo-id","data-category","data-category-id","data-mapping","data-strict","data-reactions-enabled","data-emit-metadata","data-input-position","data-lang","data-theme","data-loading","data-crossorign"])):$("",!0)]))}});const H={data(){return{title:"Rarrot的网站",cloudimg:["https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud--wide3.png","https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud.png","https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud--wide(2).png","https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud--wide.png","https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud--wide2.png"]}},setup(){const t=function(){var a=window.scrollY||document.documentElement.scrollTop;document.getElementById("parallax_area1").style.top=0-a*.75+"px",document.getElementById("parallax_area2").style.top=0-a*.5+"px",document.getElementById("parallax_area3").style.top=0-a*.25+"px"};w(()=>{window.addEventListener("scroll",t)}),k(()=>{window.removeEventListener("scroll",t)})}},Q=H,K={id:"wrapper"},X=n("header",{id:"header"},[n("h1",null,"Jquery视差滚动示例-世界航空航天史")],-1),Z=n("div",{id:"parallax_area1"},null,-1),tt={id:"parallax_area2"},at=["src"],et=["src"],ot=["src"],nt=["src"],st=["src"],it={id:"parallax_area3"},rt=["src"],ct=["src"],lt=["src"],dt=["src"];function pt(t,a,o,e,i,v){return r(),d("div",K,[X,Z,n("div",tt,[n("img",{class:"parallax_img p2_1",src:t.cloudimg[0],width:"488",height:"138",alt:"cloud"},null,8,at),n("img",{class:"parallax_img p2_2",src:t.cloudimg[2],width:"488",height:"138",alt:"cloud"},null,8,et),n("img",{class:"parallax_img p2_3",src:t.cloudimg[4],width:"488",height:"138",alt:"cloud"},null,8,ot),n("img",{class:"parallax_img p2_4",src:t.cloudimg[3],width:"488",height:"138",alt:"cloud"},null,8,nt),n("img",{class:"parallax_img p2_5",src:t.cloudimg[1],width:"488",height:"138",alt:"cloud"},null,8,st)]),n("div",it,[n("img",{class:"parallax_img p3_1",src:t.cloudimg[4],width:"311",height:"105",alt:"Montgolfier hot air balloon"},null,8,rt),n("img",{class:"parallax_img p3_2",src:t.cloudimg[1],width:"311",height:"105",alt:"Frameless parachute"},null,8,ct),n("img",{class:"parallax_img p3_3",src:t.cloudimg[4],width:"311",height:"105",alt:"Blanchard's air balloon"},null,8,lt),n("img",{class:"parallax_img p3_4",src:t.cloudimg[0],width:"311",height:"105",alt:"Landscape with trees and cows"},null,8,dt)])])}const ut=f(Q,[["render",pt]]),mt=l({__name:"test",setup(t){const a=h({name:"rorrot"}),o=()=>{a.value.name="rarrot"};return(e,i)=>(r(),d(D,null,[n("div",null,B(a.value),1),n("button",{onClick:o},"修改")],64))}}),_t=t=>(P("data-v-3638ffb7"),t=t(),S(),t),gt={align:"right"},ht=_t(()=>n("img",{class:"inverted-image",src:"https://profile-counter.glitch.me/rorrot.cc/count.svg"},null,-1)),ft=[ht],wt=l({__name:"findCount",setup(t){return(a,o)=>(r(),d("p",gt,ft))}});const _=f(wt,[["__scopeId","data-v-3638ffb7"]]),yt={...u,Layout:()=>c(u.Layout,null,{"doc-after":()=>c(m),"doc-footer-before":()=>c(_)}),enhanceApp({app:t,router:a,siteData:o}){t.component("containers",m).component("homeBackground",ut).component("test",mt).component("findCount",_)}};function y(t){if(t.extends){const a=y(t.extends);return{...a,...t,async enhanceApp(o){a.enhanceApp&&await a.enhanceApp(o),t.enhanceApp&&await t.enhanceApp(o)}}}return t}const s=y(yt),vt=l({name:"VitePressApp",setup(){const{site:t}=g();return w(()=>{z(()=>{document.documentElement.lang=t.value.lang,document.documentElement.dir=t.value.dir})}),G(),W(),Y(),s.setup&&s.setup(),()=>c(s.Layout)}});async function Ct(){const t=bt(),a=xt();a.provide(L,t);const o=T(t.route);return a.provide(F,o),a.component("Content",M),a.component("ClientOnly",O),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return o.frontmatter.value}},$params:{get(){return o.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:t,siteData:j}),{app:a,router:t,data:o}}function xt(){return N(vt)}function bt(){let t=p,a;return V(o=>{let e=J(o);return t&&(a=e),(t||a===e)&&(e=e.replace(/\.js$/,".lean.js")),p&&(t=!1),U(()=>import(e),[])},s.NotFound)}p&&Ct().then(({app:t,router:a,data:o})=>{a.go().then(()=>{R(a.route,o.site),t.mount("#app")})});export{Ct as createApp};