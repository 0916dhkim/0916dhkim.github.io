(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{3394:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(995)}])},995:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return f}});var t=r(2322),o=(r(76),r(1460),r(6973),r(6502),r(9097)),a=function(){return(0,t.jsx)("header",{className:"_1y3fg750",children:(0,t.jsx)(o.default,{href:"/",children:(0,t.jsx)("a",{children:(0,t.jsx)("h1",{children:"danny.blog"})})})})},u=function(e){var n=e.children;return(0,t.jsxs)("div",{className:"tnpr8r0",children:[(0,t.jsx)(a,{}),(0,t.jsx)("main",{className:"tnpr8r1",children:n})]})},c=r(5847);function i(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function l(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){i(e,n,r[n])}))}return e}var f=function(e){var n=e.pageProps,r=e.Component;return(0,t.jsxs)(u,{children:[(0,t.jsx)(r,l({},n)),(0,t.jsx)(c.default,{src:"/darkmode.js",strategy:"beforeInteractive"})]})}},1756:function(e,n,r){"use strict";function t(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=[],t=!0,o=!1,a=void 0;try{for(var u,c=e[Symbol.iterator]();!(t=(u=c.next()).done)&&(r.push(u.value),!n||r.length!==n);t=!0);}catch(i){o=!0,a=i}finally{try{t||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.default=void 0;var o,a=(o=r(2784))&&o.__esModule?o:{default:o},u=r(3606),c=r(2389),i=r(987);var l={};function f(e,n,r,t){if(e&&u.isLocalURL(n)){e.prefetch(n,r,t).catch((function(e){0}));var o=t&&"undefined"!==typeof t.locale?t.locale:e&&e.locale;l[n+"%"+r+(o?"%"+o:"")]=!0}}var s=function(e){var n,r=!1!==e.prefetch,o=c.useRouter(),s=a.default.useMemo((function(){var n=t(u.resolveHref(o,e.href,!0),2),r=n[0],a=n[1];return{href:r,as:e.as?u.resolveHref(o,e.as):a||r}}),[o,e.href,e.as]),d=s.href,p=s.as,v=e.children,h=e.replace,y=e.shallow,b=e.scroll,g=e.locale;"string"===typeof v&&(v=a.default.createElement("a",null,v));var m=(n=a.default.Children.only(v))&&"object"===typeof n&&n.ref,w=t(i.useIntersection({rootMargin:"200px"}),2),j=w[0],_=w[1],E=a.default.useCallback((function(e){j(e),m&&("function"===typeof m?m(e):"object"===typeof m&&(m.current=e))}),[m,j]);a.default.useEffect((function(){var e=_&&r&&u.isLocalURL(d),n="undefined"!==typeof g?g:o&&o.locale,t=l[d+"%"+p+(n?"%"+n:"")];e&&!t&&f(o,d,p,{locale:n})}),[p,d,_,g,r,o]);var x={ref:E,onClick:function(e){n.props&&"function"===typeof n.props.onClick&&n.props.onClick(e),e.defaultPrevented||function(e,n,r,t,o,a,c,i){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&u.isLocalURL(r))&&(e.preventDefault(),null==c&&t.indexOf("#")>=0&&(c=!1),n[o?"replace":"push"](r,t,{shallow:a,locale:i,scroll:c}))}(e,o,d,p,h,y,b,g)},onMouseEnter:function(e){n.props&&"function"===typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),u.isLocalURL(d)&&f(o,d,p,{priority:!0})}};if(e.passHref||"a"===n.type&&!("href"in n.props)){var O="undefined"!==typeof g?g:o&&o.locale,k=o&&o.isLocaleDomain&&u.getDomainLocale(p,O,o&&o.locales,o&&o.domainLocales);x.href=k||u.addBasePath(u.addLocale(p,O,o&&o.defaultLocale))}return a.default.cloneElement(n,x)};n.default=s},987:function(e,n,r){"use strict";function t(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=[],t=!0,o=!1,a=void 0;try{for(var u,c=e[Symbol.iterator]();!(t=(u=c.next()).done)&&(r.push(u.value),!n||r.length!==n);t=!0);}catch(i){o=!0,a=i}finally{try{t||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(n,"__esModule",{value:!0}),n.useIntersection=function(e){var n=e.rootMargin,r=e.disabled||!u,i=o.useRef(),l=t(o.useState(!1),2),f=l[0],s=l[1],d=o.useCallback((function(e){i.current&&(i.current(),i.current=void 0),r||f||e&&e.tagName&&(i.current=function(e,n,r){var t=function(e){var n=e.rootMargin||"",r=c.get(n);if(r)return r;var t=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var n=t.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;n&&r&&n(r)}))}),e);return c.set(n,r={id:n,observer:o,elements:t}),r}(r),o=t.id,a=t.observer,u=t.elements;return u.set(e,n),a.observe(e),function(){u.delete(e),a.unobserve(e),0===u.size&&(a.disconnect(),c.delete(o))}}(e,(function(e){return e&&s(e)}),{rootMargin:n}))}),[r,n,f]);return o.useEffect((function(){if(!u&&!f){var e=a.requestIdleCallback((function(){return s(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[f]),[d,f]};var o=r(2784),a=r(3771),u="undefined"!==typeof IntersectionObserver;var c=new Map},6502:function(){},6973:function(){},76:function(){},1460:function(){},9097:function(e,n,r){e.exports=r(1756)},5847:function(e,n,r){e.exports=r(2141)}},function(e){var n=function(n){return e(e.s=n)};e.O(0,[774,179],(function(){return n(3394),n(2389)}));var r=e.O();_N_E=r}]);