/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$4;const i$6=globalThis.trustedTypes,s$2=i$6?i$6.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$5=`lit$${(Math.random()+"").slice(9)}$`,o$a="?"+e$5,n$4=`<${o$a}>`,l$3=document,h$4=(t="")=>l$3.createComment(t),r$2=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d$2=Array.isArray,u$2=t=>{var i;return d$2(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c$4=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v$1=/-->/g,a$1=/>/g,f$1=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m$1=/"/g,g=/^(?:script|style|textarea|title)$/i,p$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p$1(1),y=p$1(2),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h$4(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$3.createTreeWalker(l$3,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c$4;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c$4?"!--"===u[1]?d=v$1:void 0!==u[1]?d=a$1:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f$1):void 0!==u[3]&&(d=f$1):d===f$1?">"===u[0]?(d=null!=h?h:c$4,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f$1:'"'===u[3]?m$1:_):d===m$1||d===_?d=f$1:d===v$1||d===a$1?d=c$4:(d=f$1,h=void 0);const y=d===f$1&&t[i+1].startsWith("/>")?" ":"";r+=d===c$4?s+n$4:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e$5+y):s+e$5+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$2?s$2.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e$5)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e$5),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?H:"@"===i[1]?I:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e$5),s=t.length-1;if(s>0){l.textContent=i$6?i$6.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h$4()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h$4());}}}else if(8===l.nodeType)if(l.data===o$a)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e$5,t+1));)c.push({type:7,index:r}),t+=e$5.length-1;}r++;}}static createElement(t,i){const s=l$3.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r$2(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$3).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r$2(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):u$2(t)?this.S(t):this.$(t);}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t));}$(t){this._$AH!==w&&r$2(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$3.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}S(t){d$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.M(h$4()),this.M(h$4()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r$2(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r$2(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.C(t);}C(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}C(t){this.element[this.name]=t===w?void 0:t;}}const k=i$6?i$6.emptyScript:"";class H extends S{constructor(){super(...arguments),this.type=4;}C(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const R={L:"$lit$",P:e$5,V:o$a,I:1,N:C,R:V,j:u$2,D:P,H:N,F:S,O:H,W:I,B:M,Z:L},z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(t$4=globalThis.litHtmlVersions)&&void 0!==t$4?t$4:globalThis.litHtmlVersions=[]).push("2.2.6");

var lithtml = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _$LH: R,
    html: $,
    noChange: b,
    nothing: w,
    render: x,
    svg: y
});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$4=t=>(...e)=>({_$litDirective$:t,values:e});class i$5{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {H:i$4}=R,t$2=o=>null===o||"object"!=typeof o&&"function"!=typeof o,v=(o,i)=>{var t,n;return void 0===i?void 0!==(null===(t=o)||void 0===t?void 0:t._$litType$):(null===(n=o)||void 0===n?void 0:n._$litType$)===i},r$1=o=>void 0===o.strings,e$3=()=>document.createComment(""),u$1=(o,t,n)=>{var v;const l=o._$AA.parentNode,d=void 0===t?o._$AB:t._$AA;if(void 0===n){const t=l.insertBefore(e$3(),d),v=l.insertBefore(e$3(),d);n=new i$4(t,v,o,o.options);}else {const i=n._$AB.nextSibling,t=n._$AM,r=t!==o;if(r){let i;null===(v=n._$AQ)||void 0===v||v.call(n,o),n._$AM=o,void 0!==n._$AP&&(i=o._$AU)!==t._$AU&&n._$AP(i);}if(i!==d||r){let o=n._$AA;for(;o!==i;){const i=o.nextSibling;l.insertBefore(o,d),o=i;}}}return n},c$3=(o,i,t=o)=>(o._$AI(i,t),o),f={},s$1=(o,i=f)=>o._$AH=i,a=o=>o._$AH,m=o=>{var i;null===(i=o._$AP)||void 0===i||i.call(o,!1,!0);let t=o._$AA;const n=o._$AB.nextSibling;for(;t!==n;){const o=t.nextSibling;t.remove(),t=o;}},p=o=>{o._$AR();};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$2=(i,t)=>{var s,o;const n=i._$AN;if(void 0===n)return !1;for(const i of n)null===(o=(s=i)._$AO)||void 0===o||o.call(s,t,!1),e$2(i,t);return !0},o$9=i=>{let t,s;do{if(void 0===(t=i._$AM))break;s=t._$AN,s.delete(i),i=t;}while(0===(null==s?void 0:s.size))},n$3=i=>{for(let t;t=i._$AM;i=t){let s=t._$AN;if(void 0===s)t._$AN=s=new Set;else if(s.has(i))break;s.add(i),l$2(t);}};function r(i){void 0!==this._$AN?(o$9(this),this._$AM=i,n$3(this)):this._$AM=i;}function h$3(i,t=!1,s=0){const n=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(t)if(Array.isArray(n))for(let i=s;i<n.length;i++)e$2(n[i],!1),o$9(n[i]);else null!=n&&(e$2(n,!1),o$9(n));else e$2(this,i);}const l$2=i=>{var t,e,o,n;i.type==t$3.CHILD&&(null!==(t=(o=i)._$AP)&&void 0!==t||(o._$AP=h$3),null!==(e=(n=i)._$AQ)&&void 0!==e||(n._$AQ=r));};class d$1 extends i$5{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,s){super._$AT(i,t,s),n$3(this),this.isConnected=i._$AU;}_$AO(i,t=!0){var s,n;i!==this.isConnected&&(this.isConnected=i,i?null===(s=this.reconnected)||void 0===s||s.call(this):null===(n=this.disconnected)||void 0===n||n.call(this)),t&&(e$2(this,i),o$9(this));}setValue(t){if(r$1(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=async(t,s)=>{for await(const i of t)if(!1===await s(i))return};class s{constructor(t){this.U=t;}disconnect(){this.U=void 0;}reconnect(t){this.U=t;}deref(){return this.U}}class i$3{constructor(){this.Y=void 0,this.q=void 0;}get(){return this.Y}pause(){var t;null!==(t=this.Y)&&void 0!==t||(this.Y=new Promise((t=>this.q=t)));}resume(){var t;null===(t=this.q)||void 0===t||t.call(this),this.Y=this.q=void 0;}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class o$8 extends d$1{constructor(){super(...arguments),this._$CG=new s(this),this._$CK=new i$3;}render(i,s){return b}update(i,[s,r]){if(this.isConnected||this.disconnected(),s===this._$CX)return;this._$CX=s;let e=0;const{_$CG:o,_$CK:h}=this;return t$1(s,(async t=>{for(;h.get();)await h.get();const i=o.deref();if(void 0!==i){if(i._$CX!==s)return !1;void 0!==r&&(t=r(t,e)),i.commitValue(t,e),e++;}return !0})),b}commitValue(t,i){this.setValue(t);}disconnected(){this._$CG.disconnect(),this._$CK.pause();}reconnected(){this._$CG.reconnect(this),this._$CK.resume();}}const h$2=e$4(o$8);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const c$2=e$4(class extends o$8{constructor(r){if(super(r),r.type!==t$3.CHILD)throw Error("asyncAppend can only be used in child expressions")}update(r,e){return this._$CJ=r,super.update(r,e)}commitValue(r,e){0===e&&p(this._$CJ);const s=u$1(this._$CJ);c$3(s,r);}});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const d=e$4(class extends i$5{constructor(t){super(t),this.tt=new WeakMap;}render(t){return [t]}update(s,[e]){if(v(this.it)&&(!v(e)||this.it.strings!==e.strings)){const e=a(s).pop();let o=this.tt.get(this.it.strings);if(void 0===o){const s=document.createDocumentFragment();o=x(w,s),o.setConnected(!1),this.tt.set(this.it.strings,o);}s$1(o,[e]),u$1(o,void 0,e);}if(v(e)){if(!v(this.it)||this.it.strings!==e.strings){const t=this.tt.get(e.strings);if(void 0!==t){const i=a(t).pop();p(s),u$1(s,void 0,i),s$1(s,[i]);}}this.it=e;}else this.it=void 0;return this.render(e)}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1={},i$2=e$4(class extends i$5{constructor(){super(...arguments),this.nt=e$1;}render(r,t){return t()}update(t,[s,e]){if(Array.isArray(s)){if(Array.isArray(this.nt)&&this.nt.length===s.length&&s.every(((r,t)=>r===this.nt[t])))return b}else if(this.nt===s)return b;return this.nt=Array.isArray(s)?Array.from(s):s,this.render(s,e)}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$1=l=>null!=l?l:w;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c$1=e$4(class extends i$5{constructor(e){if(super(e),e.type!==t$3.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.dt(e,s,t).values}update(s,[t,r,c]){var d;const a$1=a(s),{values:p,keys:v}=this.dt(t,r,c);if(!Array.isArray(a$1))return this.ut=v,p;const h=null!==(d=this.ut)&&void 0!==d?d:this.ut=[],m$1=[];let y,x,j=0,k=a$1.length-1,w=0,A=p.length-1;for(;j<=k&&w<=A;)if(null===a$1[j])j++;else if(null===a$1[k])k--;else if(h[j]===v[w])m$1[w]=c$3(a$1[j],p[w]),j++,w++;else if(h[k]===v[A])m$1[A]=c$3(a$1[k],p[A]),k--,A--;else if(h[j]===v[A])m$1[A]=c$3(a$1[j],p[A]),u$1(s,m$1[A+1],a$1[j]),j++,A--;else if(h[k]===v[w])m$1[w]=c$3(a$1[k],p[w]),u$1(s,a$1[j],a$1[k]),k--,w++;else if(void 0===y&&(y=u(v,w,A),x=u(h,j,k)),y.has(h[j]))if(y.has(h[k])){const e=x.get(v[w]),t=void 0!==e?a$1[e]:null;if(null===t){const e=u$1(s,a$1[j]);c$3(e,p[w]),m$1[w]=e;}else m$1[w]=c$3(t,p[w]),u$1(s,a$1[j],t),a$1[e]=null;w++;}else m(a$1[k]),k--;else m(a$1[j]),j++;for(;w<=A;){const e=u$1(s,m$1[A+1]);c$3(e,p[w]),m$1[w++]=e;}for(;j<=k;){const e=a$1[j++];null!==e&&m(e);}return this.ut=v,s$1(s,m$1),b}});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i$5{constructor(i){if(super(i),this.it=w,i.type!==t$3.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===w||null==r)return this.ft=void 0,this.it=r;if(r===b)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this.ft;this.it=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o$7=e$4(e);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n$2=t=>!t$2(t)&&"function"==typeof t.then;class h$1 extends d$1{constructor(){super(...arguments),this._$Cwt=1073741823,this._$Cyt=[],this._$CG=new s(this),this._$CK=new i$3;}render(...s){var i;return null!==(i=s.find((t=>!n$2(t))))&&void 0!==i?i:b}update(s,i){const r=this._$Cyt;let e=r.length;this._$Cyt=i;const o=this._$CG,h=this._$CK;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$Cwt);t++){const s=i[t];if(!n$2(s))return this._$Cwt=t,s;t<e&&s===r[t]||(this._$Cwt=1073741823,e=0,Promise.resolve(s).then((async t=>{for(;h.get();)await h.get();const i=o.deref();if(void 0!==i){const r=i._$Cyt.indexOf(s);r>-1&&r<i._$Cwt&&(i._$Cwt=r,i.setValue(t));}})));}return b}disconnected(){this._$CG.disconnect(),this._$CK.pause();}reconnected(){this._$CG.reconnect(this),this._$CK.resume();}}const c=e$4(h$1);

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=e$4(class extends i$5{constructor(r){if(super(r),r.type!==t$3.PROPERTY&&r.type!==t$3.ATTRIBUTE&&r.type!==t$3.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!r$1(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t]){if(t===b||t===w)return t;const o=i.element,l=i.name;if(i.type===t$3.PROPERTY){if(t===o[l])return b}else if(i.type===t$3.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(l))return b}else if(i.type===t$3.ATTRIBUTE&&o.getAttribute(l)===t+"")return b;return s$1(i),t}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i$1=e$4(class extends i$5{constructor(t){var e;if(super(t),t.type!==t$3.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ct){this.ct=new Set;for(const t in r)this.ct.add(t);return this.render(r)}this.ct.forEach((t=>{null==r[t]&&(this.ct.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];null!=e&&(this.ct.add(t),t.includes("-")?s.setProperty(t,e):s[t]=e);}return b}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$6=e$4(class extends i$5{constructor(t){var i;if(super(t),t.type!==t$3.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.et){this.et=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(t))&&this.et.add(t);return this.render(s)}const e=i.element.classList;this.et.forEach((t=>{t in s||(e.remove(t),this.et.delete(t));}));for(const t in s){const i=!!s[t];i===this.et.has(t)||(null===(o=this.st)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.et.add(t)):(e.remove(t),this.et.delete(t)));}return b}});

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n$1(n,o,r){return n?o():null==r?void 0:r()}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$5=(o,r,n)=>{for(const n of r)if(n[0]===o)return (0, n[1])();return null==n?void 0:n()};

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function*o$4(o,f){if(void 0!==o){let i=0;for(const t of o)yield f(t,i++);}}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function*o$3(o,t){const f="function"==typeof t;if(void 0!==o){let i=-1;for(const n of o)i>-1&&(yield f?t(i):t),i++,yield n;}}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function*o$2(o,l,n=1){const t=void 0===l?0:o;null!=l||(l=o);for(let o=t;n>0?o<l:l<o;o+=n)yield o;}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i=e$4(class extends i$5{constructor(){super(...arguments),this.key=w;}render(r,t){return this.key=r,t}update(r,[t,e]){return t!==this.key&&(s$1(r),this.key=t),e}});

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1=e$4(class extends i$5{constructor(t){if(super(t),t.type!==t$3.CHILD)throw Error("templateContent can only be used in child bindings")}render(r){return this.vt===r?b:(this.vt=r,document.importNode(r.content,!0))}});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class t extends e{}t.directiveName="unsafeSVG",t.resultType=2;const o=e$4(t);

const h=new WeakMap,n=e$4(class extends d$1{render(t){return w}update(t,[s]){var e;const o=s!==this.U;return o&&void 0!==this.U&&this.ot(void 0),(o||this.rt!==this.lt)&&(this.U=s,this.ht=null===(e=t.options)||void 0===e?void 0:e.host,this.ot(this.lt=t.element)),w}ot(i){var t;if("function"==typeof this.U){const s=null!==(t=this.ht)&&void 0!==t?t:globalThis;let e=h.get(s);void 0===e&&(e=new WeakMap,h.set(s,e)),void 0!==e.get(this.U)&&this.U.call(this.ht,void 0),e.set(this.U,i),void 0!==i&&this.U.call(this.ht,i);}else this.U.value=i;}get rt(){var i,t,s;return "function"==typeof this.U?null===(t=h.get(null!==(i=this.ht)&&void 0!==i?i:globalThis))||void 0===t?void 0:t.get(this.U):null===(s=this.U)||void 0===s?void 0:s.value}disconnected(){this.rt===this.lt&&this.ot(void 0);}reconnected(){this.ot(this.lt);}});

const elements = new WeakMap();
class _StyleMap extends i$5 {
    update(part, params) {
        const styleMap = params[0];
        styleMap.execute(part);
        return b;
    }
    render(styleMap) {
        return styleMap.toString();
    }
}
class StyleMap {
    constructor(styleInfo, options = { schedule: false }) {
        this.schedule = false;
        this.style = styleInfo;
        this._directive = e$4(_StyleMap);
        this.execute = this.execute.bind(this);
        this.schedule = options.schedule;
    }
    directive() {
        return this._directive(this);
    }
    setStyle(styleInfo) {
        // reuse existing object to prevent GC
        for (const prop in this.style) {
            delete this.style[prop];
        }
        for (const prop in styleInfo) {
            this.style[prop] = styleInfo[prop];
        }
    }
    toString() {
        return Object.keys(this.style).reduce((style, prop) => {
            const value = this.style[prop];
            if (value == null) {
                return style;
            }
            // Convert property names from camel-case to dash-case, i.e.:
            //  `backgroundColor` -> `background-color`
            // Vendor-prefixed names need an extra `-` appended to front:
            //  `webkitAppearance` -> `-webkit-appearance`
            // Exception is any property name containing a dash, including
            // custom properties; we assume these are already dash-cased i.e.:
            //  `--my-button-color` --> `--my-button-color`
            prop = prop.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, '-$&').toLowerCase();
            return style + `${prop}:${value};`;
        }, '');
    }
    _getInternalStyle() {
        if (this.element) {
            return elements.get(this.element);
        }
        return null;
    }
    updateStyle(elementStyle, currentElementStyles, style) {
        const previous = style.previousStyle;
        for (const name of currentElementStyles) {
            if (name && !this.style[name]) {
                if (!style.toRemove.includes(name))
                    style.toRemove.push(name);
            }
        }
        for (const name in previous) {
            if (!name)
                continue;
            if (!(name in this.style))
                continue;
            // @ts-ignore
            if (!this.style[name] && currentElementStyles.includes(name)) {
                if (!style.toRemove.includes(name))
                    style.toRemove.push(name);
            }
        }
        for (const name in this.style) {
            if (!name)
                continue;
            if (!(name in this.style))
                continue;
            const value = this.style[name];
            if (!value)
                continue;
            const prev = previous[name];
            if (prev !== undefined && prev === value && currentElementStyles.includes(name)) {
                continue;
            }
            style.toUpdate.push(name);
        }
        if (style.toRemove.length || style.toUpdate.length) {
            for (const name of style.toRemove) {
                elementStyle.removeProperty(name);
                if (elementStyle[name])
                    delete elementStyle[name];
                style.elementStyles = style.elementStyles.filter((cur) => cur !== name);
            }
            for (const name of style.toUpdate) {
                const value = this.style[name];
                if (!value)
                    continue;
                if (!name.includes('-')) {
                    elementStyle[name] = value;
                }
                else {
                    elementStyle.setProperty(name, value);
                }
                if (!style.elementStyles.includes(name))
                    style.elementStyles.push(name);
            }
            style.previousStyle = Object.assign({}, this.style);
        }
    }
    execute(part) {
        const element = part.element;
        this.element = element;
        let style;
        if (!elements.has(element)) {
            style = {
                toUpdate: [],
                toRemove: [],
                previousStyle: {},
                elementStyles: [],
                styleTaken: false,
            };
            elements.set(element, style);
        }
        else {
            style = elements.get(element);
        }
        style.toRemove.length = 0;
        style.toUpdate.length = 0;
        const elementStyle = element.style;
        let currentElementStyles;
        if (!style.styleTaken) {
            style.elementStyles = currentElementStyles = [];
            for (let i = style.length; i--;) {
                currentElementStyles.push(elementStyle[i]);
            }
            style.styleTaken = true;
        }
        else {
            currentElementStyles = style.elementStyles;
        }
        if (this.schedule) {
            requestAnimationFrame(() => {
                this.updateStyle(elementStyle, currentElementStyles, style);
            });
        }
        else {
            this.updateStyle(elementStyle, currentElementStyles, style);
        }
        elements.set(element, style);
    }
}

const detached = new WeakMap();
class Detach extends i$5 {
    render(shouldDetach) {
        return w;
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
const detach = e$4(Detach);

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
    return class ActionsCollector extends i$5 {
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
            return w;
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
function getEmpty(value, targetValue) {
    if (targetValue)
        return targetValue;
    if (Array.isArray(value))
        return new Array(value.length);
    if (isObject(value))
        return {};
    return value;
}
function mergeDeep(target, ...sources) {
    const source = sources.shift();
    if (source && typeof source.clone === 'function') {
        target = source.clone();
    }
    else if (isObject(source)) {
        if (!target) {
            target = {};
        }
        for (const key in source) {
            const value = source[key];
            target[key] = mergeDeep(getEmpty(value, target[key]), value);
        }
    }
    else if (Array.isArray(source)) {
        if (!target) {
            target = new Array(source.length);
        }
        let index = 0;
        for (const value of source) {
            target[index] = mergeDeep(getEmpty(value, target[index]), value);
            index++;
        }
        // array has properties too
        index++; // because length is also own property name - wee don't want to set this value
        const arrayKeys = Object.getOwnPropertyNames(source);
        if (arrayKeys.length > index) {
            const arrayKeysLen = arrayKeys.length;
            for (let i = index; i < arrayKeysLen; i++) {
                const propName = arrayKeys[i];
                const value = source[propName];
                target[propName] = mergeDeep(getEmpty(value, target[propName]), value);
            }
        }
    }
    else {
        target = source;
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
var helpers = {
    mergeDeep,
    clone,
    schedule,
};

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

class GetElementDirective extends i$5 {
    update(part, props) {
        if (typeof props[0] !== 'function') {
            throw new Error('[vido] GetElementDirective argument should be a function.');
        }
        const callback = props[0];
        callback(part.element);
    }
    render() {
        return w;
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
            const actionsInstanceDirective = e$4(ActionsCollector);
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
            this.html = $;
            this.svg = y;
            this.lithtml = lithtml;
            this.directive = e$4;
            this.asyncAppend = c$2;
            this.asyncReplace = h$2;
            this.cache = d;
            this.classMap = o$6;
            this.styleMap = i$1;
            this.StyleMap = StyleMap;
            this.guard = i$2;
            this.live = l;
            this.ifDefined = l$1;
            this.repeat = c$1;
            this.unsafeHTML = o$7;
            this.until = c;
            this.when = n$1;
            this.choose = o$5;
            this.map = o$4;
            this.join = o$3;
            this.range = o$2;
            this.keyed = i;
            this.templateContent = o$1;
            this.unsafeSVG = o;
            this.ref = n;
            this.schedule = schedule;
            this.getElement = e$4(GetElementDirective);
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
                else {
                    while (diff) {
                        const index = currentLen - diff;
                        modified.push(currentComponents[index]);
                        currentComponents[index].destroy();
                        diff--;
                    }
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
                x(appComponent.update(), element);
                this.executeActions();
            }
            else if (element) {
                element.remove();
            }
        }
    }
    return new VidoInstance();
}
Vido.lithtml = lithtml;
Vido.Action = Action;
Vido.Directive = i$5;
Vido.StyleMap = StyleMap;
Vido.PointerAction = PointerAction;
Vido.Slots = Slots;
Vido.directives = {
    schedule,
    detach,
    styleMap: i$1,
    classMap: o$6,
    asyncAppend: c$2,
    asyncReplace: h$2,
    cache: d,
    guard: i$2,
    live: l,
    ifDefined: l$1,
    repeat: c$1,
    unsafeHTML: o$7,
    until: c,
    when: n$1,
    choose: o$5,
    map: o$4,
    join: o$3,
    range: o$2,
    keyed: i,
    templateContent: o$1,
    unsafeSVG: o,
    ref: n,
};
const lit = lithtml;

export { Action, i$5 as Directive, t$3 as PartType, PointerAction, Slots, StyleMap, R as _$LH, c$2 as asyncAppend, h$2 as asyncReplace, d as cache, o$5 as choose, o$6 as classMap, Vido as default, detach, e$4 as directive, i$2 as guard, helpers, $ as html, l$1 as ifDefined, o$3 as join, i as keyed, lit, lithtml, o$4 as map, b as noChange, w as nothing, o$2 as range, n as ref, x as render, c$1 as repeat, schedule, i$1 as styleMap, y as svg, o$1 as templateContent, o$7 as unsafeHTML, o as unsafeSVG, c as until, n$1 as when };
//# sourceMappingURL=vido.js.map
