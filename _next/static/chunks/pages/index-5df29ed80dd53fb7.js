(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3255:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(4540)}])},5212:function(e,n,t){"use strict";t.d(n,{z:function(){return i}});var r=t(2322),c=t(7729),i=function(){return(0,r.jsxs)(c.default,{children:[(0,r.jsx)("title",{children:"Danny's Blog"}),(0,r.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]})}},4540:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return d},default:function(){return p}});var r=t(2322),c=t(5212),i=t(9097);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s=(0,t(6804).QM)((function(e){return{container:{display:"flex",flexDirection:"column",gap:"1.5rem"},item:{padding:"1rem",display:"flex",flexDirection:"column",alignItems:"start",gap:"0.5rem",backgroundColor:e.palette.paper,boxShadow:e.shadow},title:{color:e.palette.primary},summary:{flex:1,overflow:"hidden",textOverflow:"ellipses",display:"-webkit-box",lineClamp:3,boxOrient:"vertical"},date:{color:e.palette.secondary,alignSelf:"end",fontSize:"0.875rem"}}})),a=function(e){var n=e.id,t=e.title,c=e.content,o=e.summary,a=e.createdAt,l=s();return(0,r.jsxs)("div",{className:l.item,children:[(0,r.jsx)(i.default,{href:"posts/".concat(n),children:(0,r.jsx)("a",{children:(0,r.jsx)("h3",{className:l.title,children:t})})}),(0,r.jsx)("p",{className:l.summary,children:null!==o&&void 0!==o?o:c.substring(0,100)}),(0,r.jsx)("span",{className:l.date,children:a})]})},l=function(e){var n=e.posts,t=s();return(0,r.jsx)("div",{className:t.container,children:n.map((function(e){return(0,r.jsx)(a,function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){o(e,n,t[n])}))}return e}({},e),e.id)}))})},u=t(2784),f=t(5632),d=!0,p=function(e){var n=e.posts,t=(0,f.useRouter)(),i=t.query,o=i.type,s=i.access_token;return(0,u.useEffect)((function(){"recovery"===o&&t.push("/reset-password?access_token=".concat(s))}),[o,s,t]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.z,{}),(0,r.jsx)(l,{posts:n})]})}},7729:function(e,n,t){e.exports=t(5913)},5632:function(e,n,t){e.exports=t(3642)}},function(e){e.O(0,[774,888,179],(function(){return n=3255,e(e.s=n);var n}));var n=e.O();_N_E=n}]);