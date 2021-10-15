(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('csstype')) :
  typeof define === 'function' && define.amd ? define(['csstype'], factory) :
  (global = global || self, global.Vido = factory(global.csstype));
}(this, (function (csstype) { 'use strict';

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var t;const i=globalThis.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e=`lit$${(Math.random()+"").slice(9)}$`,o="?"+e,n=`<${o}>`,l=document,h=(t="")=>l.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea)$/i,$=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),p=$(1),y=$(2),b=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),x=new WeakMap,w=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l.createTreeWalker(l,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,$=-1,p=0;for(;p<s.length&&(d.lastIndex=p,u=d.exec(s),null!==u);)p=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,$=-1):void 0===u[1]?$=-2:($=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n:$>=0?(l.push(o),s.slice(0,$)+"$lit$"+s.slice($)+e+y):s+e+(-2===$?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");return [void 0!==s?s.createHTML(u):u,l]};class P{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=P.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e),s=t.length-1;if(s>0){l.textContent=i?i.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e,t+1));)c.push({type:7,index:r}),t+=e.length-1;}r++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function V(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=V(t,d._$AS(t,i.values),d,e)),i}class E{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=V(this,t,i),r(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):u(t)?this.M(t):this.$(t);}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t));}$(t){this._$AH!==T&&r(this._$AH)?this._$AA.nextSibling.data=t:this.S(l.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=P.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new E(o,this),i=t.p(this.options);t.m(s),this.S(i),this._$AH=t;}}_$AC(t){let i=x.get(t.strings);return void 0===i&&x.set(t.strings,i=new P(t)),i}M(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.A(h()),this.A(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=V(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=V(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===T?t=T:t!==T&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.k(t);}k(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}k(t){this.element[this.name]=t===T?void 0:t;}}class k extends S{constructor(){super(...arguments),this.type=4;}k(t){t&&t!==T?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=V(this,t,i,0))&&void 0!==s?s:T)===b)return;const e=this._$AH,o=t===T&&e!==T||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==T&&(e===T||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t);}}const L={P:"$lit$",V:e,L:o,I:1,N:C,R:E,D:u,j:V,H:N,O:S,F:k,B:H,W:M,Z:I},R=window.litHtmlPolyfillSupport;null==R||R(P,N),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.0.1");

  var lithtml = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _$LH: L,
    html: p,
    noChange: b,
    nothing: T,
    render: w,
    svg: y
  });

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i$1{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const {H:i$2}=L,t$2=o=>null===o||"object"!=typeof o&&"function"!=typeof o,v$1=(o,i)=>{var t,n;return void 0===i?void 0!==(null===(t=o)||void 0===t?void 0:t._$litType$):(null===(n=o)||void 0===n?void 0:n._$litType$)===i},r$1=o=>void 0===o.strings,e$2=()=>document.createComment(""),u$1=(o,t,n)=>{var v;const l=o._$AA.parentNode,d=void 0===t?o._$AB:t._$AA;if(void 0===n){const t=l.insertBefore(e$2(),d),v=l.insertBefore(e$2(),d);n=new i$2(t,v,o,o.options);}else {const i=n._$AB.nextSibling,t=n._$AM,r=t!==o;if(r){let i;null===(v=n._$AQ)||void 0===v||v.call(n,o),n._$AM=o,void 0!==n._$AP&&(i=o._$AU)!==t._$AU&&n._$AP(i);}if(i!==d||r){let o=n._$AA;for(;o!==i;){const i=o.nextSibling;l.insertBefore(o,d),o=i;}}}return n},c$1=(o,i,t=o)=>(o._$AI(i,t),o),f$1={},s$1=(o,i=f$1)=>o._$AH=i,a$1=o=>o._$AH,m$1=o=>{var i;null===(i=o._$AP)||void 0===i||i.call(o,!1,!0);let t=o._$AA;const n=o._$AB.nextSibling;for(;t!==n;){const o=t.nextSibling;t.remove(),t=o;}},p$1=o=>{o._$AR();};

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const e$3=(i,t)=>{var s,o;const n=i._$AN;if(void 0===n)return !1;for(const i of n)null===(o=(s=i)._$AO)||void 0===o||o.call(s,t,!1),e$3(i,t);return !0},o$1=i=>{let t,s;do{if(void 0===(t=i._$AM))break;s=t._$AN,s.delete(i),i=t;}while(0===(null==s?void 0:s.size))},n$1=i=>{for(let t;t=i._$AM;i=t){let s=t._$AN;if(void 0===s)t._$AN=s=new Set;else if(s.has(i))break;s.add(i),l$1(t);}};function r$2(i){void 0!==this._$AN?(o$1(this),this._$AM=i,n$1(this)):this._$AM=i;}function h$1(i,t=!1,s=0){const n=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(t)if(Array.isArray(n))for(let i=s;i<n.length;i++)e$3(n[i],!1),o$1(n[i]);else null!=n&&(e$3(n,!1),o$1(n));else e$3(this,i);}const l$1=i=>{var t,e,o,n;i.type==t$1.CHILD&&(null!==(t=(o=i)._$AP)&&void 0!==t||(o._$AP=h$1),null!==(e=(n=i)._$AQ)&&void 0!==e||(n._$AQ=r$2));};class d$1 extends i$1{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,s){super._$AT(i,t,s),n$1(this),this.isConnected=i._$AU;}_$AO(i,t=!0){var s,n;i!==this.isConnected&&(this.isConnected=i,i?null===(s=this.reconnected)||void 0===s||s.call(this):null===(n=this.disconnected)||void 0===n||n.call(this)),t&&(e$3(this,i),o$1(this));}setValue(t){if(r$1(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}

  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$3=async(t,s)=>{for await(const i of t)if(!1===await s(i))return};class s$2{constructor(t){this.U=t;}disconnect(){this.U=void 0;}reconnect(t){this.U=t;}deref(){return this.U}}class i$3{constructor(){this.Y=void 0,this.q=void 0;}get(){return this.Y}pause(){var t;null!==(t=this.Y)&&void 0!==t||(this.Y=new Promise((t=>this.q=t)));}resume(){var t;null===(t=this.q)||void 0===t||t.call(this),this.Y=this.q=void 0;}}

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */class o$2 extends d$1{constructor(){super(...arguments),this._$CG=new s$2(this),this._$CK=new i$3;}render(i,s){return b}update(i,[s,r]){if(this.isConnected||this.disconnected(),s===this._$CJ)return;this._$CJ=s;let e=0;const{_$CG:o,_$CK:h}=this;return t$3(s,(async t=>{for(;h.get();)await h.get();const i=o.deref();if(void 0!==i){if(i._$CJ!==s)return !1;void 0!==r&&(t=r(t,e)),i.commitValue(t,e),e++;}return !0})),b}commitValue(t,i){this.setValue(t);}disconnected(){this._$CG.disconnect(),this._$CK.pause();}reconnected(){this._$CG.reconnect(this),this._$CK.resume();}}const h$2=e$1(o$2);

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const c$2=e$1(class extends o$2{constructor(r){if(super(r),r.type!==t$1.CHILD)throw Error("asyncAppend can only be used in child expressions")}update(r,e){return this._$CX=r,super.update(r,e)}commitValue(r,e){0===e&&p$1(this._$CX);const s=u$1(this._$CX);c$1(s,r);}});

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const d$2=e$1(class extends i$1{constructor(t){super(t),this.tt=new WeakMap;}render(t){return [t]}update(s,[e]){if(v$1(this.it)&&(!v$1(e)||this.it.strings!==e.strings)){const e=a$1(s).pop();let o=this.tt.get(this.it.strings);if(void 0===o){const s=document.createDocumentFragment();o=w(T,s),o.setConnected(!1),this.tt.set(this.it.strings,o);}s$1(o,[e]),u$1(o,void 0,e);}if(v$1(e)){if(!v$1(this.it)||this.it.strings!==e.strings){const t=this.tt.get(e.strings);if(void 0!==t){const i=a$1(t).pop();p$1(s),u$1(s,void 0,i),s$1(s,[i]);}}this.it=e;}else this.it=void 0;return this.render(e)}});

  /**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const e$4={},i$4=e$1(class extends i$1{constructor(){super(...arguments),this.ot=e$4;}render(r,t){return t()}update(t,[s,e]){if(Array.isArray(s)){if(Array.isArray(this.ot)&&this.ot.length===s.length&&s.every(((r,t)=>r===this.ot[t])))return b}else if(this.ot===s)return b;return this.ot=Array.isArray(s)?Array.from(s):s,this.render(s,e)}});

  /**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const l$2=l=>null!=l?l:T;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const u$2=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c$3=e$1(class extends i$1{constructor(e){if(super(e),e.type!==t$1.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.dt(e,s,t).values}update(s,[t,r,c]){var d;const a=a$1(s),{values:p,keys:v}=this.dt(t,r,c);if(!Array.isArray(a))return this.ct=v,p;const h=null!==(d=this.ct)&&void 0!==d?d:this.ct=[],m=[];let y,x,j=0,k=a.length-1,w=0,A=p.length-1;for(;j<=k&&w<=A;)if(null===a[j])j++;else if(null===a[k])k--;else if(h[j]===v[w])m[w]=c$1(a[j],p[w]),j++,w++;else if(h[k]===v[A])m[A]=c$1(a[k],p[A]),k--,A--;else if(h[j]===v[A])m[A]=c$1(a[j],p[A]),u$1(s,m[A+1],a[j]),j++,A--;else if(h[k]===v[w])m[w]=c$1(a[k],p[w]),u$1(s,a[j],a[k]),k--,w++;else if(void 0===y&&(y=u$2(v,w,A),x=u$2(h,j,k)),y.has(h[j]))if(y.has(h[k])){const e=x.get(v[w]),t=void 0!==e?a[e]:null;if(null===t){const e=u$1(s,a[j]);c$1(e,p[w]),m[w]=e;}else m[w]=c$1(t,p[w]),u$1(s,a[j],t),a[e]=null;w++;}else m$1(a[k]),k--;else m$1(a[j]),j++;for(;w<=A;){const e=u$1(s,m[A+1]);c$1(e,p[w]),m[w++]=e;}for(;j<=k;){const e=a[j++];null!==e&&m$1(e);}return this.ct=v,s$1(s,m),b}});

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */class e$5 extends i$1{constructor(i){if(super(i),this.it=T,i.type!==t$1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===T||null==r)return this.vt=void 0,this.it=r;if(r===b)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this.vt;this.it=r;const s=[r];return s.raw=s,this.vt={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e$5.directiveName="unsafeHTML",e$5.resultType=1;const o$3=e$1(e$5);

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const n$2=t=>!t$2(t)&&"function"==typeof t.then;class h$3 extends d$1{constructor(){super(...arguments),this._$Cft=1073741823,this._$Cwt=[],this._$CG=new s$2(this),this._$CK=new i$3;}render(...s){var i;return null!==(i=s.find((t=>!n$2(t))))&&void 0!==i?i:b}update(s,i){const r=this._$Cwt;let e=r.length;this._$Cwt=i;const o=this._$CG,h=this._$CK;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$Cft);t++){const s=i[t];if(!n$2(s))return this._$Cft=t,s;t<e&&s===r[t]||(this._$Cft=1073741823,e=0,Promise.resolve(s).then((async t=>{for(;h.get();)await h.get();const i=o.deref();if(void 0!==i){const r=i._$Cwt.indexOf(s);r>-1&&r<i._$Cft&&(i._$Cft=r,i.setValue(t));}})));}return b}disconnected(){this._$CG.disconnect(),this._$CK.pause();}reconnected(){this._$CG.reconnect(this),this._$CK.resume();}}const c$4=e$1(h$3);

  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const l$3=e$1(class extends i$1{constructor(r){if(super(r),r.type!==t$1.PROPERTY&&r.type!==t$1.ATTRIBUTE&&r.type!==t$1.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!r$1(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t]){if(t===b||t===T)return t;const o=i.element,l=i.name;if(i.type===t$1.PROPERTY){if(t===o[l])return b}else if(i.type===t$1.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(l))return b}else if(i.type===t$1.ATTRIBUTE&&o.getAttribute(l)===t+"")return b;return s$1(i),t}});

  const detached = new WeakMap();
  class Detach extends i$1 {
      render(shouldDetach) {
          return T;
      }
      update(part, props) {
          if (typeof props[0] !== 'boolean') {
              throw new Error('[vido] Detach directive argument should be a boolean.');
          }
          let detach = props[0];
          const element = part.element;
          if (detach) {
              if (!detached.has(part)) {
                  detached.set(part, {
                      element,
                      nextSibling: element.nextSibling,
                      previousSibling: element.previousSibling,
                      parent: element.parentNode,
                  });
              }
              element.remove();
          }
          else {
              const data = detached.get(part);
              if (data) {
                  if (data.nextSibling && data.nextSibling.parentNode) {
                      data.nextSibling.parentNode.insertBefore(data.element, data.nextSibling);
                  }
                  else if (data.previousSibling && data.previousSibling.parentNode) {
                      data.previousSibling.parentNode.appendChild(data.element);
                  }
                  else if (data.parent) {
                      data.parent.appendChild(data.element);
                  }
                  detached.delete(part);
              }
          }
          return this.render(detach);
      }
  }
  const detach = e$1(Detach);

  /**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const i$5=e$1(class extends i$1{constructor(t){var e;if(super(t),t.type!==t$1.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ut){this.ut=new Set;for(const t in r)this.ut.add(t);return this.render(r)}this.ut.forEach((t=>{null==r[t]&&(this.ut.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];null!=e&&(this.ut.add(t),t.includes("-")?s.setProperty(t,e):s[t]=e);}return b}});

  /**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const o$4=e$1(class extends i$1{constructor(t){var i;if(super(t),t.type!==t$1.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.st){this.st=new Set,void 0!==i.strings&&(this.et=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.et)||void 0===r?void 0:r.has(t))&&this.st.add(t);return this.render(s)}const e=i.element.classList;this.st.forEach((t=>{t in s||(e.remove(t),this.st.delete(t));}));for(const t in s){const i=!!s[t];i===this.st.has(t)||(null===(o=this.et)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.st.add(t)):(e.remove(t),this.st.delete(t)));}return b}});

  class Action {
      constructor() {
          this.isAction = true;
      }
  }
  Action.prototype.isAction = true;

  const defaultOptions = {
      element: document.createTextNode(''),
      axis: 'xy',
      threshold: 10,
      onDown() { },
      onMove() { },
      onUp() { },
      onWheel() { },
  };
  const pointerEventsExists = typeof PointerEvent !== 'undefined';
  let id = 0;
  class PointerAction extends Action {
      constructor(element, data) {
          super();
          this.moving = '';
          this.initialX = 0;
          this.initialY = 0;
          this.lastY = 0;
          this.lastX = 0;
          this.onPointerDown = this.onPointerDown.bind(this);
          this.onPointerMove = this.onPointerMove.bind(this);
          this.onPointerUp = this.onPointerUp.bind(this);
          this.onWheel = this.onWheel.bind(this);
          this.element = element;
          this.id = ++id;
          this.options = Object.assign(Object.assign({}, defaultOptions), data.pointerOptions);
          if (pointerEventsExists) {
              element.addEventListener('pointerdown', this.onPointerDown);
              document.addEventListener('pointermove', this.onPointerMove);
              document.addEventListener('pointerup', this.onPointerUp);
          }
          else {
              element.addEventListener('touchstart', this.onPointerDown);
              document.addEventListener('touchmove', this.onPointerMove, { passive: false });
              document.addEventListener('touchend', this.onPointerUp);
              document.addEventListener('touchcancel', this.onPointerUp);
              element.addEventListener('mousedown', this.onPointerDown);
              document.addEventListener('mousemove', this.onPointerMove, { passive: false });
              document.addEventListener('mouseup', this.onPointerUp);
          }
      }
      normalizeMouseWheelEvent(event) {
          // @ts-ignore
          let x = event.deltaX || 0;
          // @ts-ignore
          let y = event.deltaY || 0;
          // @ts-ignore
          let z = event.deltaZ || 0;
          // @ts-ignore
          const mode = event.deltaMode;
          // @ts-ignore
          const lineHeight = parseInt(getComputedStyle(event.target).getPropertyValue('line-height'));
          let scale = 1;
          switch (mode) {
              case 1:
                  scale = lineHeight;
                  break;
              case 2:
                  // @ts-ignore
                  scale = window.height;
                  break;
          }
          x *= scale;
          y *= scale;
          z *= scale;
          return { x, y, z, event };
      }
      onWheel(event) {
          const normalized = this.normalizeMouseWheelEvent(event);
          this.options.onWheel(normalized);
      }
      normalizePointerEvent(event) {
          let result = { x: 0, y: 0, pageX: 0, pageY: 0, clientX: 0, clientY: 0, screenX: 0, screenY: 0, event };
          switch (event.type) {
              case 'wheel':
                  const wheel = this.normalizeMouseWheelEvent(event);
                  result.x = wheel.x;
                  result.y = wheel.y;
                  result.pageX = result.x;
                  result.pageY = result.y;
                  result.screenX = result.x;
                  result.screenY = result.y;
                  result.clientX = result.x;
                  result.clientY = result.y;
                  break;
              case 'touchstart':
              case 'touchmove':
              case 'touchend':
              case 'touchcancel':
                  result.x = event.changedTouches[0].screenX;
                  result.y = event.changedTouches[0].screenY;
                  result.pageX = event.changedTouches[0].pageX;
                  result.pageY = event.changedTouches[0].pageY;
                  result.screenX = event.changedTouches[0].screenX;
                  result.screenY = event.changedTouches[0].screenY;
                  result.clientX = event.changedTouches[0].clientX;
                  result.clientY = event.changedTouches[0].clientY;
                  break;
              default:
                  result.x = event.x;
                  result.y = event.y;
                  result.pageX = event.pageX;
                  result.pageY = event.pageY;
                  result.screenX = event.screenX;
                  result.screenY = event.screenY;
                  result.clientX = event.clientX;
                  result.clientY = event.clientY;
                  break;
          }
          return result;
      }
      onPointerDown(event) {
          if (event.type === 'mousedown' && event.button !== 0)
              return;
          this.moving = 'xy';
          const normalized = this.normalizePointerEvent(event);
          this.lastX = normalized.x;
          this.lastY = normalized.y;
          this.initialX = normalized.x;
          this.initialY = normalized.y;
          this.options.onDown(normalized);
      }
      handleX(normalized) {
          let movementX = normalized.x - this.lastX;
          this.lastY = normalized.y;
          this.lastX = normalized.x;
          return movementX;
      }
      handleY(normalized) {
          let movementY = normalized.y - this.lastY;
          this.lastY = normalized.y;
          this.lastX = normalized.x;
          return movementY;
      }
      onPointerMove(event) {
          if (this.moving === '' || (event.type === 'mousemove' && event.button !== 0))
              return;
          const normalized = this.normalizePointerEvent(event);
          if (this.options.axis === 'x|y') {
              let movementX = 0, movementY = 0;
              if (this.moving === 'x' ||
                  (this.moving === 'xy' && Math.abs(normalized.x - this.initialX) > this.options.threshold)) {
                  this.moving = 'x';
                  movementX = this.handleX(normalized);
              }
              if (this.moving === 'y' ||
                  (this.moving === 'xy' && Math.abs(normalized.y - this.initialY) > this.options.threshold)) {
                  this.moving = 'y';
                  movementY = this.handleY(normalized);
              }
              this.options.onMove({
                  movementX,
                  movementY,
                  x: normalized.x,
                  y: normalized.y,
                  initialX: this.initialX,
                  initialY: this.initialY,
                  lastX: this.lastX,
                  lastY: this.lastY,
                  event,
              });
          }
          else if (this.options.axis === 'xy') {
              let movementX = 0, movementY = 0;
              if (Math.abs(normalized.x - this.initialX) > this.options.threshold) {
                  movementX = this.handleX(normalized);
              }
              if (Math.abs(normalized.y - this.initialY) > this.options.threshold) {
                  movementY = this.handleY(normalized);
              }
              this.options.onMove({
                  movementX,
                  movementY,
                  x: normalized.x,
                  y: normalized.y,
                  initialX: this.initialX,
                  initialY: this.initialY,
                  lastX: this.lastX,
                  lastY: this.lastY,
                  event,
              });
          }
          else if (this.options.axis === 'x') {
              if (this.moving === 'x' ||
                  (this.moving === 'xy' && Math.abs(normalized.x - this.initialX) > this.options.threshold)) {
                  this.moving = 'x';
                  // @ts-ignore
                  this.options.onMove({
                      movementX: this.handleX(normalized),
                      movementY: 0,
                      initialX: this.initialX,
                      initialY: this.initialY,
                      lastX: this.lastX,
                      lastY: this.lastY,
                      event,
                  });
              }
          }
          else if (this.options.axis === 'y') {
              let movementY = 0;
              if (this.moving === 'y' ||
                  (this.moving === 'xy' && Math.abs(normalized.y - this.initialY) > this.options.threshold)) {
                  this.moving = 'y';
                  movementY = this.handleY(normalized);
              }
              this.options.onMove({
                  movementX: 0,
                  movementY,
                  x: normalized.x,
                  y: normalized.y,
                  initialX: this.initialX,
                  initialY: this.initialY,
                  lastX: this.lastX,
                  lastY: this.lastY,
                  event,
              });
          }
      }
      onPointerUp(event) {
          this.moving = '';
          const normalized = this.normalizePointerEvent(event);
          this.options.onUp({
              movementX: 0,
              movementY: 0,
              x: normalized.x,
              y: normalized.y,
              initialX: this.initialX,
              initialY: this.initialY,
              lastX: this.lastX,
              lastY: this.lastY,
              event,
          });
          this.lastY = 0;
          this.lastX = 0;
      }
      destroy(element) {
          if (pointerEventsExists) {
              element.removeEventListener('pointerdown', this.onPointerDown);
              document.removeEventListener('pointermove', this.onPointerMove);
              document.removeEventListener('pointerup', this.onPointerUp);
          }
          else {
              element.removeEventListener('mousedown', this.onPointerDown);
              document.removeEventListener('mousemove', this.onPointerMove);
              document.removeEventListener('mouseup', this.onPointerUp);
              element.removeEventListener('touchstart', this.onPointerDown);
              document.removeEventListener('touchmove', this.onPointerMove);
              document.removeEventListener('touchend', this.onPointerUp);
              document.removeEventListener('touchcancel', this.onPointerUp);
          }
      }
  }

  function getPublicComponentMethods(components, actionsByInstance, clone) {
      return class PublicComponentMethods {
          constructor(instance, vidoInstance, props = {}) {
              this.destroyed = false;
              this.instance = instance;
              this.name = vidoInstance.name;
              this.vidoInstance = vidoInstance;
              this.props = props;
              this.destroy = this.destroy.bind(this);
              this.update = this.update.bind(this);
              this.change = this.change.bind(this);
              this.html = this.html.bind(this);
          }
          /**
           * Destroy component
           */
          destroy() {
              if (this.destroyed)
                  return;
              if (this.vidoInstance.debug) {
                  console.groupCollapsed(`destroying component ${this.instance}`);
                  console.log(clone({ components: components.keys(), actionsByInstance }));
                  console.trace();
                  console.groupEnd();
              }
              this.vidoInstance.destroyComponent(this.instance, this.vidoInstance);
              this.destroyed = true;
          }
          /**
           * Update template - trigger rendering process
           */
          update(callback = undefined) {
              if (this.vidoInstance.debug) {
                  console.groupCollapsed(`updating component ${this.instance}`);
                  console.log(clone({ components: components.keys(), actionsByInstance }));
                  console.trace();
                  console.groupEnd();
              }
              return this.vidoInstance.updateTemplate(callback);
          }
          /**
           * Change component input properties
           * @param {any} newProps
           */
          change(newProps, options = {}) {
              if (this.vidoInstance.debug) {
                  console.groupCollapsed(`changing component ${this.instance}`);
                  console.log(clone({ props: this.props, newProps: newProps, components: components.keys(), actionsByInstance }));
                  console.trace();
                  console.groupEnd();
              }
              const component = components.get(this.instance);
              if (component)
                  component.change(newProps, options);
          }
          /**
           * Get component lit-html template
           * @param {} templateProps
           */
          html(templateProps = {}) {
              const component = components.get(this.instance);
              if (component && !component.destroyed) {
                  return component.update(templateProps, this.vidoInstance);
              }
              return undefined;
          }
          _getComponents() {
              return components;
          }
          _getActions() {
              return actionsByInstance;
          }
      };
  }

  function getActionsCollector(actionsByInstance) {
      return class ActionsCollector extends i$1 {
          update(part, props) {
              const element = part.element;
              const instance = props[0];
              const actions = props[1];
              const actionProps = props[2];
              for (const create of actions) {
                  if (typeof create !== 'undefined') {
                      let exists;
                      if (actionsByInstance.has(instance)) {
                          for (const action of actionsByInstance.get(instance)) {
                              if (action.componentAction.create === create && action.element === element) {
                                  exists = action;
                                  break;
                              }
                          }
                      }
                      if (!exists) {
                          // @ts-ignore
                          if (typeof element.vido !== 'undefined')
                              delete element.vido;
                          const componentAction = {
                              create,
                              update() { },
                              destroy() { },
                          };
                          const action = { instance: instance, componentAction, element, props: actionProps };
                          let byInstance = [];
                          if (actionsByInstance.has(instance)) {
                              byInstance = actionsByInstance.get(instance);
                          }
                          byInstance.push(action);
                          actionsByInstance.set(instance, byInstance);
                      }
                      else {
                          exists.props = actionProps;
                      }
                  }
              }
          }
          render(instance, actions, props) {
              return T;
          }
      };
  }

  function getInternalComponentMethods(components, actionsByInstance, clone) {
      return class InternalComponentMethods {
          constructor(instance, vidoInstance, renderFunction) {
              this.destroyed = false;
              this.instance = instance;
              this.vidoInstance = vidoInstance;
              this.renderFunction = renderFunction;
              this.destroy = this.destroy.bind(this);
              this.update = this.update.bind(this);
              this.change = this.change.bind(this);
          }
          destroy() {
              if (this.destroyed)
                  return;
              if (this.vidoInstance.debug) {
                  console.groupCollapsed(`component destroy method fired ${this.instance}`);
                  console.log(clone({
                      props: this.vidoInstance.props,
                      components: components.keys(),
                      destroyable: this.vidoInstance.destroyable,
                      actionsByInstance,
                  }));
                  console.trace();
                  console.groupEnd();
              }
              if (this.content && typeof this.content.destroy === 'function') {
                  this.content.destroy();
              }
              for (const d of this.vidoInstance.destroyable) {
                  d();
              }
              this.vidoInstance.onChangeFunctions.length = 0;
              this.vidoInstance.destroyable.length = 0;
              this.vidoInstance.destroyed = true;
              this.destroyed = true;
              this.vidoInstance.update();
          }
          update(props = {}) {
              if (this.vidoInstance.debug) {
                  console.groupCollapsed(`component update method fired ${this.instance}`);
                  console.log(clone({ components: components.keys(), actionsByInstance }));
                  console.trace();
                  console.groupEnd();
              }
              return this.renderFunction(props);
          }
          change(changedProps, options = { leave: false }) {
              const props = changedProps;
              if (this.vidoInstance.debug) {
                  console.groupCollapsed(`component change method fired ${this.instance}`);
                  console.log(clone({
                      props,
                      components: components.keys(),
                      onChangeFunctions: this.vidoInstance.onChangeFunctions,
                      changedProps,
                      actionsByInstance,
                  }));
                  console.trace();
                  console.groupEnd();
              }
              for (const fn of this.vidoInstance.onChangeFunctions) {
                  fn(changedProps, options);
              }
          }
      };
  }

  /**
   * Schedule - a throttle function that uses requestAnimationFrame to limit the rate at which a function is called.
   *
   * @param {function} fn
   * @returns {function}
   */
  function schedule(fn) {
      let frameId = 0;
      function wrapperFn(argument) {
          if (frameId) {
              return;
          }
          function executeFrame() {
              frameId = 0;
              fn.apply(undefined, [argument]);
          }
          frameId = requestAnimationFrame(executeFrame);
      }
      return wrapperFn;
  }
  /**
   * Is object - helper function to determine if specified variable is an object
   *
   * @param {any} item
   * @returns {boolean}
   */
  function isObject(item) {
      if (item && item.constructor) {
          return item.constructor.name === 'Object';
      }
      return typeof item === 'object' && item !== null;
  }
  /**
   * Merge deep - helper function which will merge objects recursively - creating brand new one - like clone
   *
   * @param {object} target
   * @params {[object]} sources
   * @returns {object}
   */
  function mergeDeep(target, ...sources) {
      const source = sources.shift();
      if (isObject(target) && isObject(source)) {
          for (const key in source) {
              if (isObject(source[key])) {
                  if (typeof source[key].clone === 'function') {
                      target[key] = source[key].clone();
                  }
                  else {
                      if (typeof target[key] === 'undefined') {
                          target[key] = {};
                      }
                      target[key] = mergeDeep(target[key], source[key]);
                  }
              }
              else if (Array.isArray(source[key])) {
                  target[key] = new Array(source[key].length);
                  let index = 0;
                  for (let item of source[key]) {
                      if (isObject(item)) {
                          if (typeof item.clone === 'function') {
                              target[key][index] = item.clone();
                          }
                          else {
                              target[key][index] = mergeDeep({}, item);
                          }
                      }
                      else {
                          target[key][index] = item;
                      }
                      index++;
                  }
              }
              else {
                  target[key] = source[key];
              }
          }
      }
      if (!sources.length) {
          return target;
      }
      return mergeDeep(target, ...sources);
  }
  /**
   * Clone helper function
   *
   * @param source
   * @returns {object} cloned source
   */
  function clone(source) {
      // @ts-ignore
      if (typeof source.actions !== 'undefined') {
          // @ts-ignore
          const actns = source.actions.map((action) => {
              const result = Object.assign({}, action);
              const props = Object.assign({}, result.props);
              delete props.state;
              delete props.api;
              delete result.element;
              result.props = props;
              return result;
          });
          // @ts-ignore
          source.actions = actns;
      }
      return mergeDeep({}, source);
  }

  class Slots {
      constructor(vido, props) {
          this.slotInstances = {};
          this.destroyed = false;
          this.vido = vido;
          this.props = props;
          this.destroy = this.destroy.bind(this);
          this.change = this.change.bind(this);
          this.html = this.html.bind(this);
          this.getInstances = this.getInstances.bind(this);
          this.setComponents = this.setComponents.bind(this);
          this.vido.onDestroy(() => {
              this.destroy();
          });
      }
      setComponents(slots) {
          if (!slots || this.destroyed)
              return;
          for (const slotPlacement in slots) {
              const slotsComponents = slots[slotPlacement];
              if (typeof this.slotInstances[slotPlacement] === 'undefined') {
                  this.slotInstances[slotPlacement] = [];
              }
              for (const instance of this.slotInstances[slotPlacement]) {
                  instance.destroy();
              }
              this.slotInstances[slotPlacement].length = 0;
              for (const component of slotsComponents) {
                  this.slotInstances[slotPlacement].push(this.vido.createComponent(component, this.props));
              }
          }
          this.vido.update();
      }
      destroy() {
          if (this.destroyed)
              return;
          for (const slotPlacement in this.slotInstances) {
              for (const instance of this.slotInstances[slotPlacement]) {
                  instance.destroy();
              }
              this.slotInstances[slotPlacement].length = 0;
          }
          this.destroyed = true;
      }
      change(changedProps, options = undefined) {
          if (this.destroyed)
              return;
          for (const slotPlacement in this.slotInstances) {
              const instances = this.slotInstances[slotPlacement];
              for (const slot of instances) {
                  slot.change(changedProps, options);
              }
          }
      }
      getInstances(placement) {
          if (this.destroyed)
              return [];
          if (placement === undefined)
              return this.slotInstances;
          return this.slotInstances[placement];
      }
      html(placement, templateProps) {
          if (this.destroyed)
              return;
          if (!this.slotInstances[placement] || this.slotInstances[placement].length === 0) {
              return templateProps;
          }
          let result = templateProps;
          for (const slotInstance of this.slotInstances[placement]) {
              result = slotInstance.html(result);
          }
          return result;
      }
      getProps() {
          return this.props;
      }
      isDestroyed() {
          return this.destroyed;
      }
  }

  class GetElementDirective extends i$1 {
      update(part, props) {
          if (typeof props[0] !== 'function') {
              throw new Error('[vido] GetElementDirective argument should be a function.');
          }
          const callback = props[0];
          callback(part.element);
      }
      render() {
          return T;
      }
  }

  function Vido(state, api) {
      let componentId = 0;
      const components = new Map();
      let actionsByInstance = new Map();
      let app, element;
      let shouldUpdateCount = 0;
      const afterUpdateCallbacks = [];
      const resolved = Promise.resolve();
      const additionalMethods = {};
      const ActionsCollector = getActionsCollector(actionsByInstance);
      class InstanceActionsCollector {
          constructor(instance) {
              this.instance = instance;
          }
          create(actions, props) {
              const actionsInstanceDirective = e$1(ActionsCollector);
              const actionsInstance = () => {
                  return actionsInstanceDirective(this.instance, actions, props);
              };
              return actionsInstance;
          }
      }
      const PublicComponentMethods = getPublicComponentMethods(components, actionsByInstance, clone);
      const InternalComponentMethods = getInternalComponentMethods(components, actionsByInstance, clone);
      class VidoInstance {
          constructor(instance = '', name = '') {
              this.instance = '';
              this.name = '';
              this.destroyable = [];
              this.destroyed = false;
              this.onChangeFunctions = [];
              this.debug = false;
              this.state = state;
              this.api = api;
              this.lastProps = {};
              this.html = p;
              this.svg = y;
              this.directive = e$1;
              this.asyncAppend = c$2;
              this.asyncReplace = h$2;
              this.cache = d$2;
              this.classMap = o$4;
              this.styleMap = i$5;
              this.guard = i$4;
              this.live = l$3;
              this.ifDefined = l$2;
              this.repeat = c$3;
              this.unsafeHTML = o$3;
              this.until = c$4;
              this.schedule = schedule;
              this.getElement = e$1(GetElementDirective);
              this.actionsByInstance = ( /* componentActions, props */) => { };
              this.detach = detach;
              this.PointerAction = PointerAction;
              this.Action = Action;
              this.Slots = Slots;
              this._components = components;
              this._actions = actionsByInstance;
              this.instance = instance;
              this.reuseComponents = this.reuseComponents.bind(this);
              this.onDestroy = this.onDestroy.bind(this);
              this.onChange = this.onChange.bind(this);
              this.update = this.update.bind(this);
              this.destroyComponent = this.destroyComponent.bind(this);
              for (const name in additionalMethods) {
                  // @ts-ignore
                  this[name] = additionalMethods[name].bind(this);
              }
              this.name = name;
              this.Actions = new InstanceActionsCollector(instance);
          }
          static addMethod(name, body) {
              // @ts-ignore
              additionalMethods[name] = body;
          }
          onDestroy(fn) {
              this.destroyable.push(fn);
          }
          onChange(fn) {
              this.onChangeFunctions.push(fn);
          }
          update(callback) {
              return this.updateTemplate(callback);
          }
          /**
           * Reuse existing components when your data was changed
           *
           * @param {array} currentComponents - array of components
           * @param {array} dataArray  - any data as array for each component
           * @param {function} getProps - you can pass params to component from array item ( example: item=>({id:item.id}) )
           * @param {function} component - what kind of components do you want to create?
           * @param {boolean} leaveTail - leave last elements and do not destroy corresponding components
           * @param {boolean} debug - show debug info
           * @returns {array} of components (with updated/destroyed/created ones)
           */
          reuseComponents(currentComponents, dataArray, getProps, component, leaveTail = true, debug = false) {
              const modified = [];
              const currentLen = currentComponents.length;
              const dataLen = dataArray.length;
              let leave = false;
              if (leaveTail && (dataArray === undefined || dataArray.length === 0)) {
                  leave = true;
              }
              let leaveStartingAt = 0;
              if (currentLen < dataLen) {
                  let diff = dataLen - currentLen;
                  while (diff) {
                      const item = dataArray[dataLen - diff];
                      const newComponent = this.createComponent(component, getProps(item));
                      currentComponents.push(newComponent);
                      modified.push(newComponent);
                      diff--;
                  }
              }
              else if (currentLen > dataLen) {
                  let diff = currentLen - dataLen;
                  if (leaveTail) {
                      leave = true;
                      leaveStartingAt = currentLen - diff;
                  }
                  while (diff) {
                      const index = currentLen - diff;
                      if (!leaveTail) {
                          modified.push(currentComponents[index]);
                          currentComponents[index].destroy();
                      }
                      diff--;
                  }
                  if (!leaveTail) {
                      currentComponents.length = dataLen;
                  }
              }
              let index = 0;
              if (debug)
                  console.log('modified components', modified);
              if (debug)
                  console.log('current components', currentComponents);
              if (debug)
                  console.log('data array', dataArray);
              for (const component of currentComponents) {
                  const data = dataArray[index];
                  if (debug)
                      console.log(`reuse components data at '${index}'`, data);
                  if (component && !modified.includes(component)) {
                      if (debug)
                          console.log('getProps fn result', getProps(data));
                      component.change(getProps(data), { leave: leave && index >= leaveStartingAt });
                  }
                  index++;
              }
          }
          createComponent(component, props = {}) {
              const instance = component.name + ':' + componentId++;
              let vidoInstance;
              vidoInstance = new VidoInstance(instance, component.name);
              const publicMethods = new PublicComponentMethods(instance, vidoInstance, props);
              const internalMethods = new InternalComponentMethods(instance, vidoInstance, component(vidoInstance, props));
              components.set(instance, internalMethods);
              components.get(instance).change(props);
              if (vidoInstance.debug) {
                  console.groupCollapsed(`component created ${instance}`);
                  console.log(clone({ props, components: components.keys(), actionsByInstance }));
                  console.trace();
                  console.groupEnd();
              }
              return publicMethods;
          }
          destroyComponent(instance, vidoInstance) {
              if (vidoInstance.debug) {
                  console.groupCollapsed(`destroying component ${instance}...`);
                  console.log(clone({ components: components.keys(), actionsByInstance }));
                  console.trace();
                  console.groupEnd();
              }
              if (actionsByInstance.has(instance)) {
                  for (const action of actionsByInstance.get(instance)) {
                      if (typeof action.componentAction.destroy === 'function') {
                          action.componentAction.destroy(action.element, action.props);
                      }
                  }
              }
              actionsByInstance.delete(instance);
              const component = components.get(instance);
              if (!component) {
                  console.warn(`No component to destroy! [${instance}]`);
                  return;
              }
              component.destroy();
              components.delete(instance);
              if (vidoInstance.debug) {
                  console.groupCollapsed(`component destroyed ${instance}`);
                  console.log(clone({ components: components.keys(), actionsByInstance }));
                  console.trace();
                  console.groupEnd();
              }
          }
          executeActions() {
              for (const actions of actionsByInstance.values()) {
                  for (const action of actions) {
                      if (action.element.vido === undefined) {
                          const component = components.get(action.instance);
                          action.isActive = function isActive() {
                              return component && component.destroyed === false;
                          };
                          const componentAction = action.componentAction;
                          const create = componentAction.create;
                          if (typeof create !== 'undefined') {
                              let result;
                              if ((create.prototype &&
                                  (create.prototype.isAction || create.prototype.update || create.prototype.destroy)) ||
                                  create.isAction) {
                                  result = new create(action.element, action.props);
                              }
                              else {
                                  result = create(action.element, action.props);
                              }
                              if (result !== undefined) {
                                  if (typeof result === 'function') {
                                      componentAction.destroy = result;
                                  }
                                  else {
                                      if (typeof result.update === 'function') {
                                          componentAction.update = result.update.bind(result);
                                      }
                                      if (typeof result.destroy === 'function') {
                                          componentAction.destroy = result.destroy.bind(result);
                                      }
                                  }
                              }
                          }
                      }
                      else {
                          action.element.vido = action.props;
                          if (typeof action.componentAction.update === 'function' && action.isActive()) {
                              action.componentAction.update(action.element, action.props);
                          }
                      }
                  }
                  for (const action of actions) {
                      action.element.vido = action.props;
                  }
              }
          }
          updateTemplate(callback = undefined) {
              if (callback)
                  afterUpdateCallbacks.push(callback);
              return new Promise((resolve) => {
                  const currentShouldUpdateCount = ++shouldUpdateCount;
                  const self = this;
                  function flush() {
                      if (currentShouldUpdateCount === shouldUpdateCount) {
                          shouldUpdateCount = 0;
                          self.render();
                          for (const cb of afterUpdateCallbacks) {
                              cb();
                          }
                          afterUpdateCallbacks.length = 0;
                          resolve(null);
                      }
                  }
                  resolved.then(flush);
              });
          }
          createApp(config) {
              element = config.element;
              const App = this.createComponent(config.component, config.props);
              app = App.instance;
              this.render();
              return App;
          }
          render() {
              const appComponent = components.get(app);
              if (appComponent) {
                  w(appComponent.update(), element);
                  this.executeActions();
              }
              else if (element) {
                  element.remove();
              }
          }
      }
      return new VidoInstance();
  }
  Vido.prototype.lithtml = lithtml;
  Vido.prototype.Action = Action;
  Vido.prototype.Directive = i$1;
  Vido.prototype.schedule = schedule;
  Vido.prototype.detach = detach;
  Vido.prototype.styleMap = i$5;
  Vido.prototype.classMap = o$4;
  Vido.prototype.PointerAction = PointerAction;
  Vido.prototype.asyncAppend = c$2;
  Vido.prototype.asyncReplace = h$2;
  Vido.prototype.cache = d$2;
  Vido.prototype.guard = i$4;
  Vido.prototype.live = l$3;
  Vido.prototype.ifDefined = l$2;
  Vido.prototype.repeat = c$3;
  Vido.prototype.unsafeHTML = o$3;
  Vido.prototype.until = c$4;
  Vido.prototype.Slots = Slots;

  return Vido;

})));
//# sourceMappingURL=vido.umd.js.map
