import{r as a}from"./index.ed373d49.js";/* empty css                       */const f="/_astro/signature.3691e00c.png";var u={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m=a,p=Symbol.for("react.element"),_=Symbol.for("react.fragment"),g=Object.prototype.hasOwnProperty,h=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b={key:!0,ref:!0,__self:!0,__source:!0};function d(r,o,c){var e,l={},s=null,n=null;c!==void 0&&(s=""+c),o.key!==void 0&&(s=""+o.key),o.ref!==void 0&&(n=o.ref);for(e in o)g.call(o,e)&&!b.hasOwnProperty(e)&&(l[e]=o[e]);if(r&&r.defaultProps)for(e in o=r.defaultProps,o)l[e]===void 0&&(l[e]=o[e]);return{$$typeof:p,type:r,key:s,ref:n,props:l,_owner:h.current}}i.Fragment=_;i.jsx=d;i.jsxs=d;u.exports=i;var t=u.exports;function y(){const[r,o]=a.useState(0),c=[{name:"Home",url:"/"},{name:"About",url:"/about"},{name:"Project",url:"/blog"},{name:"Tools",url:"/contact"}],e={selected:{color:"black",backgroundColor:"#f6f6f6",fontWeight:"bold"},notSelected:{color:"#6c6c6c",backgroundColor:"white",fontWeight:"normal"}};return t.jsx(t.Fragment,{children:t.jsxs("div",{className:"navbar-container",children:[t.jsx("div",{className:"img-container",children:t.jsx("img",{src:f})}),t.jsx("ul",{children:c.map(({name:l,url:s},n)=>t.jsx("li",{style:{backgroundColor:r===n&&e.selected.backgroundColor},onClick:()=>o(n),children:t.jsx("a",{href:s,style:{color:r===n?e.selected.color:e.notSelected.color,fontWeight:r===n?e.selected.fontWeight:e.notSelected.fontWeight},children:l})}))})]})})}export{y as Navbar};
