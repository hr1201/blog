import{d as T,a4 as x,l as E,h as f,o as y,c as C,z as s,a5 as i,a6 as b,F as k,N as R,b as F,a7 as D,a as u,t,O as V,Q as S,_ as w,G as O,R as h}from"./chunks/framework.67eb2fac.js";const v=r=>(V("data-v-787939ab"),r=r(),S(),r),I={style:{"margin-left":"15px"}},P={style:{"margin-bottom":"30px"}},N={class:"gridtable",width:"100%"},G=v(()=>s("thead",null,[s("tr",null,[s("th",{width:"22%"},"动物名称"),s("th",{width:"22%"},"动物单价"),s("th",{width:"21%"},"动物数量"),s("th",{width:"16%"},"动物总价"),s("th",{width:"19%"},"操作")])],-1)),$={align:"center"},U=["onClick"],L=["onClick"],W=["onClick"],Y=v(()=>s("td",null,"嘻嘻",-1)),j={colspan:"5",align:"right"},z=T({__name:"table",setup(r){const c=x([{name:"鸡鸡🐓",price:66,num:1},{name:"鸭鸭🦆",price:36,num:1},{name:"鹅鹅🦢",price:80,num:1}]),m=E(()=>c.reduce((o,a)=>o+a.num*a.price,0)),_=o=>{c.splice(o,1)},A=f(""),q=E(()=>c.filter(o=>o.name.includes(A.value)));let e,p,l=f(0);const B=()=>{if(e!=""&&p!=null&&p>0&&l.value>0){let o={name:e,price:p,num:l.value};c.push(o),e="",p=void 0,l.value=0}else alert("请检查是否输入完整，以及价格、数量是否大于0")};return(o,a)=>(y(),C("div",I,[s("div",P,[i(s("input",{type:"text",placeholder:"搜索","onUpdate:modelValue":a[0]||(a[0]=n=>A.value=n)},null,512),[[b,A.value]])]),s("table",N,[G,s("tbody",$,[(y(!0),C(k,null,R(q.value,(n,d)=>(y(),C("tr",{key:d},[s("td",null,t(n.name),1),s("td",null,t(n.price),1),s("td",null,[s("button",{onClick:g=>n.num>1?n.num--:n.num},"⛔",8,U),u(" "+t(n.num)+" ",1),s("button",{onClick:g=>n.num++},"➕",8,L)]),s("td",null,t(n.price*n.num),1),s("td",null,[s("button",{class:"btn",onClick:g=>_(d)},"删除",8,W),u("  ")])]))),128)),s("tr",null,[s("td",null,[i(s("input",{type:"text",placeholder:"名称","onUpdate:modelValue":a[1]||(a[1]=n=>D(e)?e.value=n:e=n)},null,512),[[b,F(e)]])]),s("td",null,[i(s("input",{type:"text",placeholder:"价格","onUpdate:modelValue":a[2]||(a[2]=n=>D(p)?p.value=n:p=n)},null,512),[[b,F(p)]])]),s("td",null,[s("button",{onClick:a[3]||(a[3]=n=>F(l)>1?D(l)?l.value--:l--:F(l))},"⛔"),u(" "+t(F(l))+" ",1),s("button",{onClick:a[4]||(a[4]=n=>D(l)?l.value++:l++)},"➕")]),Y,s("td",null,[s("button",{class:"btn",onClick:B},"增加")])])]),s("tfoot",null,[s("td",j,"总价："+t(m.value),1)])])]))}});const J=w(z,[["__scopeId","data-v-787939ab"]]),M=h("",12),Q=h("",8),X=JSON.parse('{"title":"计算属性computed","description":"","frontmatter":{},"headers":[],"relativePath":"articles/Vue/09-计算属性computed.md","filePath":"articles/Vue/09-计算属性computed.md","lastUpdated":1693787749000}'),H={name:"articles/Vue/09-计算属性computed.md"},Z=Object.assign(H,{setup(r){return(c,m)=>(y(),C("div",null,[M,O(J),Q]))}});export{X as __pageData,Z as default};
