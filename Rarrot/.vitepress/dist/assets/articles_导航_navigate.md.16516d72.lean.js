import{d,h as u,_ as g,o as i,c as a,a1 as c,a5 as l,k as e,F as v,D as b,H as m,t as h,p as S,m as w}from"./chunks/framework.ee3d195b.js";const k=d({props:{gifSrc:{type:String,required:!0},placeholderSrc:{type:String,required:!0}},setup(){const t=u(!0);function s(){t.value=!1}return{showPlaceholder:t,onGifLoad:s}}});const x={class:"blocks-imgs"},y=["src"],j=["src"];function I(t,s,r,_,o,n){return i(),a("div",x,[c(e("img",{ref:"gifImage",src:t.gifSrc,alt:"cartoon-img",onLoad:s[0]||(s[0]=(...f)=>t.onGifLoad&&t.onGifLoad(...f)),class:"gif-image"},null,40,y),[[l,!t.showPlaceholder]]),c(e("img",{src:t.placeholderSrc,alt:"placeholder-img",class:"placeholder-image"},null,8,j),[[l,t.showPlaceholder]])])}const $=g(k,[["render",I],["__scopeId","data-v-2430f1ca"]]),p=t=>(S("data-v-e9fd2ba7"),t=t(),w(),t),D={class:"home-position"},G={class:"home"},C=p(()=>e("div",{class:"cartoon-block"},[e("div",{class:"cartoon-title"},"🐇动画demo")],-1)),L={class:"blocks-position"},M={class:"blocks-img"},P={class:"blocks-text"},R={style:{"font-size":"15px",color:"#3e52e0"}},B={class:"blocks-url"},F=["href"],N=["href"],O=p(()=>e("svg",{class:"github",role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("title",null,"GitHub"),e("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"})],-1)),V=[O],q=d({__name:"homeCard",setup(t){const s=[{gif:"https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310012037788.png",img:"https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310012037788.png",introduce:"welcome",context:"欢迎来到Rarrot的动画库",ahref:"/cartoonsMD/O.o欢迎.html",svghref:"https://github.com/hr1201/blog/blob/main/Rarrot/.vitepress/theme/components/cartoons/欢迎.vue"},{gif:"https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/cat.gif",img:"https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310011758438.png",introduce:"welcome",context:"01彩虹猫",ahref:"/cartoonsMD/彩虹猫.html",svghref:"https://github.com/hr1201/blog/blob/main/Rarrot/.vitepress/theme/components/cartoons/彩虹猫.vue"},{gif:"https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310011800704.png",img:"https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310011800704.png",introduce:"welcome",context:"文字雨",ahref:"/cartoonsMD/文字雨.html",svghref:"https://github.com/hr1201/blog/blob/main/Rarrot/.vitepress/theme/components/cartoons/文字雨.vue"},{gif:"https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/GIF%202023-10-1%2020-20-41.gif",img:"https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310012023351.png",introduce:"welcome",context:"ikun篮球",ahref:"/cartoonsMD/篮球.html",svghref:"https://github.com/hr1201/blog/blob/main/Rarrot/.vitepress/theme/components/cartoons/ikun.vue"}];return(r,_)=>(i(),a("div",D,[e("div",G,[C,e("div",L,[(i(),a(v,null,b(s,(o,n)=>e("div",{class:"blocks",key:n},[e("div",M,[m($,{gifSrc:o.gif,placeholderSrc:o.ahref,class:"imgGif"},null,8,["gifSrc","placeholderSrc"])]),e("div",P,[e("p",R,h(o.introduce),1),e("p",null,h(o.context),1),e("div",B,[e("a",{href:o.ahref},"Visit",8,F),e("a",{href:o.svghref,target:"_blank"},V,8,N)])])])),64))])])]))}});const H=g(q,[["__scopeId","data-v-e9fd2ba7"]]),J=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"page"},"headers":[],"relativePath":"articles/导航/navigate.md","filePath":"articles/导航/navigate.md","lastUpdated":1696163940000}'),z={name:"articles/导航/navigate.md"},U=Object.assign(z,{setup(t){return(s,r)=>(i(),a("div",null,[m(H)]))}});export{J as __pageData,U as default};
