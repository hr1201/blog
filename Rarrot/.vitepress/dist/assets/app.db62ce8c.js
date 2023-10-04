import{d as O,ag as fe,h as A,ah as Ee,E as Ae,g as N,x as ae,O as Oe,j as K,o as k,b as q,H as v,w as E,k as h,n as x,l as s,N as me,Z as Le,e as S,c as R,F as se,I as Ne,D as $e,a1 as Se,a5 as Re,r as be,T as ze,ai as Pe,U as ye,u as ke,K as Ie,_ as ie,t as De,p as Me,m as Ve,a0 as Be,z as Fe,aj as Y,s as oe,ak as Xe,al as We,am as Ye,an as je,ao as He,ap as Ue,aq as qe,ar as Ge,as as Ke,at as Ze,y as Je,au as Qe,av as et,aw as tt}from"./chunks/framework.ee3d195b.js";import{t as pe}from"./chunks/theme.0e54bd8d.js";import{B as nt,C as G,D as at,j as st,m as re,d as ot,p as rt,F as it,G as lt,f as ct,u as ut,g as dt,E as $,a as ft,H as mt,I as pt,J as gt,K as vt,L as _t,M as ht,_ as bt,r as U,x as B,k as yt,o as kt}from"./chunks/index.4619c344.js";var It=/\s/;function wt(e){for(var n=e.length;n--&&It.test(e.charAt(n)););return n}var xt=/^\s+/;function Ct(e){return e&&e.slice(0,wt(e)+1).replace(xt,"")}var ge=0/0,Tt=/^[-+]0x[0-9a-f]+$/i,Et=/^0b[01]+$/i,At=/^0o[0-7]+$/i,Ot=parseInt;function ve(e){if(typeof e=="number")return e;if(nt(e))return ge;if(G(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=G(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=Ct(e);var t=Et.test(e);return t||At.test(e)?Ot(e.slice(2),t?2:8):Tt.test(e)?ge:+e}var Lt=function(){return at.Date.now()};const te=Lt;var Nt="Expected a function",$t=Math.max,St=Math.min;function Rt(e,n,t){var a,l,d,r,m,_,I=0,z=!1,p=!1,g=!0;if(typeof e!="function")throw new TypeError(Nt);n=ve(n)||0,G(t)&&(z=!!t.leading,p="maxWait"in t,d=p?$t(ve(t.maxWait)||0,n):d,g="trailing"in t?!!t.trailing:g);function L(c){var b=a,D=l;return a=l=void 0,I=c,r=e.apply(D,b),r}function f(c){return I=c,m=setTimeout(P,n),z?L(c):r}function Z(c){var b=c-_,D=c-I,H=n-b;return p?St(H,d-D):H}function X(c){var b=c-_,D=c-I;return _===void 0||b>=n||b<0||p&&D>=d}function P(){var c=te();if(X(c))return j(c);m=setTimeout(P,Z(c))}function j(c){return m=void 0,g&&a?L(c):(a=l=void 0,r)}function J(){m!==void 0&&clearTimeout(m),I=0,a=_=l=m=void 0}function Q(){return m===void 0?r:j(te())}function W(){var c=te(),b=X(c);if(a=arguments,l=this,_=c,b){if(m===void 0)return f(_);if(p)return clearTimeout(m),m=setTimeout(P,n),L(_)}return m===void 0&&(m=setTimeout(P,n)),r}return W.cancel=J,W.flush=Q,W}var zt="Expected a function";function ne(e,n,t){var a=!0,l=!0;if(typeof e!="function")throw new TypeError(zt);return G(t)&&(a="leading"in t?!!t.leading:a,l="trailing"in t?!!t.trailing:l),Rt(e,n,{leading:a,maxWait:n,trailing:l})}const Pt=st({urlList:{type:ot(Array),default:()=>rt([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:Boolean,teleported:Boolean,closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2}}),Dt={close:()=>!0,switch:e=>re(e),rotate:e=>re(e)},Mt=["src"],Vt=O({name:"ElImageViewer"}),Bt=O({...Vt,props:Pt,emits:Dt,setup(e,{expose:n,emit:t}){const a=e,l={CONTAIN:{name:"contain",icon:fe(it)},ORIGINAL:{name:"original",icon:fe(lt)}},{t:d}=ct(),r=ut("image-viewer"),{nextZIndex:m}=dt(),_=A(),I=A([]),z=Ee(),p=A(!0),g=A(a.initialIndex),L=Ae(l.CONTAIN),f=A({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),Z=N(()=>{const{urlList:o}=a;return o.length<=1}),X=N(()=>g.value===0),P=N(()=>g.value===a.urlList.length-1),j=N(()=>a.urlList[g.value]),J=N(()=>[r.e("btn"),r.e("prev"),r.is("disabled",!a.infinite&&X.value)]),Q=N(()=>[r.e("btn"),r.e("next"),r.is("disabled",!a.infinite&&P.value)]),W=N(()=>{const{scale:o,deg:i,offsetX:u,offsetY:y,enableTransition:C}=f.value;let w=u/o,T=y/o;switch(i%360){case 90:case-270:[w,T]=[T,-w];break;case 180:case-180:[w,T]=[-w,-T];break;case 270:case-90:[w,T]=[-T,w];break}const V={transform:`scale(${o}) rotate(${i}deg) translate(${w}px, ${T}px)`,transition:C?"transform .3s":""};return L.value.name===l.CONTAIN.name&&(V.maxWidth=V.maxHeight="100%"),V}),c=N(()=>re(a.zIndex)?a.zIndex:m());function b(){H(),t("close")}function D(){const o=ne(u=>{switch(u.code){case B.esc:a.closeOnPressEscape&&b();break;case B.space:ce();break;case B.left:ue();break;case B.up:M("zoomIn");break;case B.right:de();break;case B.down:M("zoomOut");break}}),i=ne(u=>{const y=u.deltaY||u.deltaX;M(y<0?"zoomIn":"zoomOut",{zoomRate:a.zoomRate,enableTransition:!1})});z.run(()=>{U(document,"keydown",o),U(document,"wheel",i)})}function H(){z.stop()}function xe(){p.value=!1}function Ce(o){p.value=!1,o.target.alt=d("el.image.error")}function Te(o){if(p.value||o.button!==0||!_.value)return;f.value.enableTransition=!1;const{offsetX:i,offsetY:u}=f.value,y=o.pageX,C=o.pageY,w=ne(V=>{f.value={...f.value,offsetX:i+V.pageX-y,offsetY:u+V.pageY-C}}),T=U(document,"mousemove",w);U(document,"mouseup",()=>{T()}),o.preventDefault()}function le(){f.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function ce(){if(p.value)return;const o=yt(l),i=Object.values(l),u=L.value.name,C=(i.findIndex(w=>w.name===u)+1)%o.length;L.value=l[o[C]],le()}function ee(o){const i=a.urlList.length;g.value=(o+i)%i}function ue(){X.value&&!a.infinite||ee(g.value-1)}function de(){P.value&&!a.infinite||ee(g.value+1)}function M(o,i={}){if(p.value)return;const{zoomRate:u,rotateDeg:y,enableTransition:C}={zoomRate:a.zoomRate,rotateDeg:90,enableTransition:!0,...i};switch(o){case"zoomOut":f.value.scale>.2&&(f.value.scale=Number.parseFloat((f.value.scale/u).toFixed(3)));break;case"zoomIn":f.value.scale<7&&(f.value.scale=Number.parseFloat((f.value.scale*u).toFixed(3)));break;case"clockwise":f.value.deg+=y,t("rotate",f.value.deg);break;case"anticlockwise":f.value.deg-=y,t("rotate",f.value.deg);break}f.value.enableTransition=C}return ae(j,()=>{Oe(()=>{const o=I.value[0];o!=null&&o.complete||(p.value=!0)})}),ae(g,o=>{le(),t("switch",o)}),K(()=>{var o,i;D(),(i=(o=_.value)==null?void 0:o.focus)==null||i.call(o)}),n({setActiveItem:ee}),(o,i)=>(k(),q(Pe,{to:"body",disabled:!o.teleported},[v(ze,{name:"viewer-fade",appear:""},{default:E(()=>[h("div",{ref_key:"wrapper",ref:_,tabindex:-1,class:x(s(r).e("wrapper")),style:me({zIndex:s(c)})},[h("div",{class:x(s(r).e("mask")),onClick:i[0]||(i[0]=Le(u=>o.hideOnClickModal&&b(),["self"]))},null,2),S(" CLOSE "),h("span",{class:x([s(r).e("btn"),s(r).e("close")]),onClick:b},[v(s($),null,{default:E(()=>[v(s(ft))]),_:1})],2),S(" ARROW "),s(Z)?S("v-if",!0):(k(),R(se,{key:0},[h("span",{class:x(s(J)),onClick:ue},[v(s($),null,{default:E(()=>[v(s(mt))]),_:1})],2),h("span",{class:x(s(Q)),onClick:de},[v(s($),null,{default:E(()=>[v(s(pt))]),_:1})],2)],64)),S(" ACTIONS "),h("div",{class:x([s(r).e("btn"),s(r).e("actions")])},[h("div",{class:x(s(r).e("actions__inner"))},[v(s($),{onClick:i[1]||(i[1]=u=>M("zoomOut"))},{default:E(()=>[v(s(gt))]),_:1}),v(s($),{onClick:i[2]||(i[2]=u=>M("zoomIn"))},{default:E(()=>[v(s(vt))]),_:1}),h("i",{class:x(s(r).e("actions__divider"))},null,2),v(s($),{onClick:ce},{default:E(()=>[(k(),q(Ne(s(L).icon)))]),_:1}),h("i",{class:x(s(r).e("actions__divider"))},null,2),v(s($),{onClick:i[3]||(i[3]=u=>M("anticlockwise"))},{default:E(()=>[v(s(_t))]),_:1}),v(s($),{onClick:i[4]||(i[4]=u=>M("clockwise"))},{default:E(()=>[v(s(ht))]),_:1})],2)],2),S(" CANVAS "),h("div",{class:x(s(r).e("canvas"))},[(k(!0),R(se,null,$e(o.urlList,(u,y)=>Se((k(),R("img",{ref_for:!0,ref:C=>I.value[y]=C,key:u,src:u,style:me(s(W)),class:x(s(r).e("img")),onLoad:xe,onError:Ce,onMousedown:Te},null,46,Mt)),[[Re,y===g.value]])),128))],2),be(o.$slots,"default")],6)]),_:3})],8,["disabled"]))}});var Ft=bt(Bt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/image-viewer/src/image-viewer.vue"]]);const Xt=kt(Ft);const Wt=["id","host","repo","repoid","category","categoryid","mapping","term","strict","reactionsenabled","emitmetadata","inputposition","theme","lang","loading"],Yt=O({__name:"Giscus",props:{id:{},host:{},repo:{},repoId:{},category:{},categoryId:{},mapping:{},term:{},theme:{},strict:{},reactionsEnabled:{},emitMetadata:{},inputPosition:{},lang:{},loading:{}},setup(e){const n=A(!1);return K(()=>{n.value=!0,ye(()=>import("./chunks/giscus-2a044aea.497f0bd4.js"),[])}),(t,a)=>n.value?(k(),R("giscus-widget",{key:0,id:t.id,host:t.host,repo:t.repo,repoid:t.repoId,category:t.category,categoryid:t.categoryId,mapping:t.mapping,term:t.term,strict:t.strict,reactionsenabled:t.reactionsEnabled,emitmetadata:t.emitMetadata,inputposition:t.inputPosition,theme:t.theme,lang:t.lang,loading:t.loading},null,8,Wt)):S("",!0)}}),jt={class:"comments"},Ht=O({__name:"container",setup(e){const{isDark:n,title:t}=ke(),a=Ie(),l=A(!0);return ae(()=>a.path,()=>{l.value=!1,a.path.includes("cartoonsMD")?l.value=!1:setTimeout(()=>{l.value=!0},50)},{immediate:!0}),(d,r)=>(k(),R("div",jt,[l.value?(k(),q(s(Yt),{is:"script",key:s(t),repo:"hr1201/gitalk-evalute","repo-id":"R_kgDOJ9WSwA",category:"Announcements","category-id":"DIC_kwDOJ9WSwM4CYA7u",mapping:"pathname",strict:"0","reactions-enabled":"1","emit-metadata":"0","input-position":"bottom",theme:s(n)?"transparent_dark":"light",lang:"zh-CN",loading:"lazy"},null,8,["theme"])):S("",!0)]))}});const _e=ie(Ht,[["__scopeId","data-v-c3246e72"]]),Ut=O({__name:"test",setup(e){const n=A({name:"rorrot"}),t=()=>{n.value.name="rarrot"};return(a,l)=>(k(),R(se,null,[h("div",null,De(n.value),1),h("button",{onClick:t},"修改")],64))}}),qt=e=>(Me("data-v-911223f3"),e=e(),Ve(),e),Gt={align:"right"},Kt=qt(()=>h("img",{class:"inverted-image",alt:"0",src:"https://profile-counter.glitch.me/rorrot.cc/count.svg"},null,-1)),Zt=[Kt],Jt=O({__name:"findCount",setup(e){return(n,t)=>(k(),R("p",Gt,Zt))}});const he=ie(Jt,[["__scopeId","data-v-911223f3"]]),Qt={class:"blocks"},en=O({__name:"animationBlock",props:{color:{type:String,default:"rgba(0,0,0,0.9)"}},setup(e){const t={backgroundColor:e.color};return(a,l)=>(k(),R("div",Qt,[h("div",{style:t,class:"block"},[be(a.$slots,"default",{},void 0,!0)])]))}});const tn=ie(en,[["__scopeId","data-v-909bb473"]]);const nn=O({__name:"imagePreview",setup(e){const n=Ie(),t=A(!1),a=Be({url:"",list:[],idx:0});function l(d){const r=d.target,m=d.currentTarget;if(n.path.includes("cartoonsMD"))t.value=!1;else if(r.tagName.toLowerCase()==="img"){const _=m.querySelectorAll(".content-container .main img"),I=Array.from(_).findIndex(g=>g===r),z=Array.from(_).map(g=>g.src),p=r.getAttribute("src");a.url=p,a.list=z,a.idx=I,I===-1&&p&&(a.list.push(p),a.idx=a.list.length-1),t.value=!0}}return K(()=>{const d=document.querySelector("#VPContent");d==null||d.addEventListener("click",l)}),Fe(()=>{const d=document.querySelector("#VPContent");d==null||d.removeEventListener("click",l)}),(d,r)=>t.value?(k(),q(s(Xt),{key:0,infinite:!1,"hide-on-click-modal":"",teleported:"","url-list":a.list,"initial-index":a.idx,onClose:r[0]||(r[0]=m=>t.value=!1)},null,8,["url-list","initial-index"])):S("",!0)}}),an={...pe,Layout:()=>Y(pe.Layout,null,{"doc-after":()=>Y(_e),"doc-footer-before":()=>Y(he),"doc-before":()=>Y(nn)}),enhanceApp({app:e}){e.component("containers",_e).component("test",Ut).component("findCount",he).component("block",tn)}};function we(e){if(e.extends){const n=we(e.extends);return{...n,...e,async enhanceApp(t){n.enhanceApp&&await n.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const F=we(an),sn=O({name:"VitePressApp",setup(){const{site:e}=ke();return K(()=>{Je(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),Qe(),et(),tt(),F.setup&&F.setup(),()=>Y(F.Layout)}});async function on(){const e=ln(),n=rn();n.provide(We,e);const t=Ye(e.route);return n.provide(je,t),n.component("Content",He),n.component("ClientOnly",Ue),Object.defineProperties(n.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),F.enhanceApp&&await F.enhanceApp({app:n,router:e,siteData:qe}),{app:n,router:e,data:t}}function rn(){return Ge(sn)}function ln(){let e=oe,n;return Ke(t=>{let a=Ze(t);return a?(e&&(n=a),(e||n===a)&&(a=a.replace(/\.js$/,".lean.js")),oe&&(e=!1),ye(()=>import(a),[])):null},F.NotFound)}oe&&on().then(({app:e,router:n,data:t})=>{n.go().then(()=>{Xe(n.route,t.site),e.mount("#app")})});export{on as createApp};
