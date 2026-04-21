(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vido = factory());
})(this, (function () { 'use strict';

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$4=globalThis,i$5=t=>t,s$3=t$4.trustedTypes,e$4=s$3?s$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,h$5="$lit$",o$b=`lit$${Math.random().toFixed(9).slice(2)}$`,n$6="?"+o$b,r$3=`<${n$6}>`,l$2=document,c$4=()=>l$2.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u$2=Array.isArray,d$2=t=>u$2(t)||"function"==typeof t?.[Symbol.iterator],f$1="[ \t\n\f\r]",v$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$2=/>/g,p$1=RegExp(`>|${f$1}(?:([^\\s"'>=/]+)(${f$1}*=${f$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),T=x(3),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l$2.createTreeWalker(l$2,129);function V(t,i){if(!u$2(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$4?e$4.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v$1;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v$1?"!--"===u[1]?c=_:void 0!==u[1]?c=m$2:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p$1):void 0!==u[3]&&(c=p$1):c===p$1?">"===u[0]?(c=n??v$1,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p$1:'"'===u[3]?$:g):c===$||c===g?c=p$1:c===_||c===m$2?c=v$1:(c=p$1,n=void 0);const x=c===p$1&&t[i+1].startsWith("/>")?" ":"";l+=c===v$1?s+r$3:d>=0?(e.push(a),s.slice(0,d)+h$5+s.slice(d)+o$b+x):s+o$b+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h$5)){const i=v[a++],s=r.getAttribute(t).split(o$b),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$b)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$b),i=t.length-1;if(i>0){r.textContent=s$3?s$3.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c$4()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c$4());}}}else if(8===r.nodeType)if(r.data===n$6)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$b,t+1));)d.push({type:7,index:l}),t+=o$b.length-1;}l++;}}static createElement(t,i){const s=l$2.createElement("template");return s.innerHTML=t,s}}function M$1(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M$1(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l$2).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l$2,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M$1(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d$2(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c$4()),this.O(c$4()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$5(t).nextSibling;i$5(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M$1(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M$1(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M$1(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M$1(this,t);}}const j$1={M:h$5,P:o$b,A:n$6,C:1,L:N,R,D:d$2,V:M$1,I:k,H,N:L,U:z,B:I,F:Z},B=t$4.litHtmlPolyfillSupport;B?.(S,k),(t$4.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c$4(),t),t,void 0,s??{});}return h._$AI(t),h};

    var lithtml = /*#__PURE__*/Object.freeze({
        __proto__: null,
        _$LH: j$1,
        html: b,
        mathml: T,
        noChange: E,
        nothing: A,
        render: D,
        svg: w
    });

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$3={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},e$3=t=>(...e)=>({_$litDirective$:t,values:e});let i$4 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const {I:t$2}=j$1,i$3=o=>o,n$5=o=>null===o||"object"!=typeof o&&"function"!=typeof o,l$1=(o,t)=>void 0!==o?._$litType$,d$1=o=>null!=o?._$litType$?.h,r$2=o=>void 0===o.strings,s$2=()=>document.createComment(""),v=(o,n,e)=>{const l=o._$AA.parentNode,d=void 0===n?o._$AB:n._$AA;if(void 0===e){const i=l.insertBefore(s$2(),d),n=l.insertBefore(s$2(),d);e=new t$2(i,n,o,o.options);}else {const t=e._$AB.nextSibling,n=e._$AM,c=n!==o;if(c){let t;e._$AQ?.(o),e._$AM=o,void 0!==e._$AP&&(t=o._$AU)!==n._$AU&&e._$AP(t);}if(t!==d||c){let o=e._$AA;for(;o!==t;){const t=i$3(o).nextSibling;i$3(l).insertBefore(o,d),o=t;}}}return e},u$1=(o,t,i=o)=>(o._$AI(t,i),o),m$1={},p=(o,t=m$1)=>o._$AH=t,M=o=>o._$AH,h$4=o=>{o._$AR(),o._$AA.remove();},j=o=>{o._$AR();};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const s$1=(i,t)=>{const e=i._$AN;if(void 0===e)return  false;for(const i of e)i._$AO?.(t,false),s$1(i,t);return  true},o$a=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===e?.size)},r$1=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),c$3(t);}};function h$3(i){ void 0!==this._$AN?(o$a(this),this._$AM=i,r$1(this)):this._$AM=i;}function n$4(i,t=false,e=0){const r=this._$AH,h=this._$AN;if(void 0!==h&&0!==h.size)if(t)if(Array.isArray(r))for(let i=e;i<r.length;i++)s$1(r[i],false),o$a(r[i]);else null!=r&&(s$1(r,false),o$a(r));else s$1(this,i);}const c$3=i=>{i.type==t$3.CHILD&&(i._$AP??=n$4,i._$AQ??=h$3);};class f extends i$4{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),r$1(this),this.isConnected=i._$AU;}_$AO(i,t=true){i!==this.isConnected&&(this.isConnected=i,i?this.reconnected?.():this.disconnected?.()),t&&(s$1(this,i),o$a(this));}setValue(t){if(r$2(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}

    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$1=async(t,s)=>{for await(const i of t)if(false===await s(i))return};class s{constructor(t){this.G=t;}disconnect(){this.G=void 0;}reconnect(t){this.G=t;}deref(){return this.G}}let i$2 = class i{constructor(){this.Y=void 0,this.Z=void 0;}get(){return this.Y}pause(){this.Y??=new Promise(t=>this.Z=t);}resume(){this.Z?.(),this.Y=this.Z=void 0;}};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */let o$9 = class o extends f{constructor(){super(...arguments),this._$CK=new s(this),this._$CX=new i$2;}render(i,s){return E}update(i,[s,r]){if(this.isConnected||this.disconnected(),s===this._$CJ)return E;this._$CJ=s;let n=0;const{_$CK:o,_$CX:h}=this;return t$1(s,async t=>{for(;h.get();)await h.get();const i=o.deref();if(void 0!==i){if(i._$CJ!==s)return  false;void 0!==r&&(t=r(t,n)),i.commitValue(t,n),n++;}return  true}),E}commitValue(t,i){this.setValue(t);}disconnected(){this._$CK.disconnect(),this._$CX.pause();}reconnected(){this._$CK.reconnect(this),this._$CX.resume();}};const h$2=e$3(o$9);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const c$2=e$3(class extends o$9{constructor(r){if(super(r),r.type!==t$3.CHILD)throw Error("asyncAppend can only be used in child expressions")}update(r,e){return this._$Ctt=r,super.update(r,e)}commitValue(r,e){0===e&&j(this._$Ctt);const s=v(this._$Ctt);u$1(s,r);}});

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const d=t=>d$1(t)?t._$litType$.h:t.strings,h$1=e$3(class extends i$4{constructor(t){super(t),this.et=new WeakMap;}render(t){return [t]}update(s,[e]){const u=l$1(this.it)?d(this.it):null,h=l$1(e)?d(e):null;if(null!==u&&(null===h||u!==h)){const e=M(s).pop();let o=this.et.get(u);if(void 0===o){const s=document.createDocumentFragment();o=D(A,s),o.setConnected(false),this.et.set(u,o);}p(o,[e]),v(o,void 0,e);}if(null!==h){if(null===u||u!==h){const t=this.et.get(h);if(void 0!==t){const i=M(t).pop();j(s),v(s,void 0,i),p(s,[i]);}}this.it=e;}else this.it=void 0;return this.render(e)}});

    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const e$2={},i$1=e$3(class extends i$4{constructor(){super(...arguments),this.ot=e$2;}render(r,t){return t()}update(t,[s,e]){if(Array.isArray(s)){if(Array.isArray(this.ot)&&this.ot.length===s.length&&s.every((r,t)=>r===this.ot[t]))return E}else if(this.ot===s)return E;return this.ot=Array.isArray(s)?Array.from(s):s,this.render(s,e)}});

    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const o$8=o=>o??A;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c$1=e$3(class extends i$4{constructor(e){if(super(e),e.type!==t$3.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.dt(e,s,t).values}update(s,[t,r,c]){const d=M(s),{values:p$1,keys:a}=this.dt(t,r,c);if(!Array.isArray(d))return this.ut=a,p$1;const h=this.ut??=[],v$1=[];let m,y,x=0,j=d.length-1,k=0,w=p$1.length-1;for(;x<=j&&k<=w;)if(null===d[x])x++;else if(null===d[j])j--;else if(h[x]===a[k])v$1[k]=u$1(d[x],p$1[k]),x++,k++;else if(h[j]===a[w])v$1[w]=u$1(d[j],p$1[w]),j--,w--;else if(h[x]===a[w])v$1[w]=u$1(d[x],p$1[w]),v(s,v$1[w+1],d[x]),x++,w--;else if(h[j]===a[k])v$1[k]=u$1(d[j],p$1[k]),v(s,d[x],d[j]),j--,k++;else if(void 0===m&&(m=u(a,k,w),y=u(h,x,j)),m.has(h[x]))if(m.has(h[j])){const e=y.get(a[k]),t=void 0!==e?d[e]:null;if(null===t){const e=v(s,d[x]);u$1(e,p$1[k]),v$1[k]=e;}else v$1[k]=u$1(t,p$1[k]),v(s,d[x],t),d[e]=null;k++;}else h$4(d[j]),j--;else h$4(d[x]),x++;for(;k<=w;){const e=v(s,v$1[w+1]);u$1(e,p$1[k]),v$1[k++]=e;}for(;x<=j;){const e=d[x++];null!==e&&h$4(e);}return this.ut=a,p(s,v$1),E}});

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */let e$1 = class e extends i$4{constructor(i){if(super(i),this.it=A,i.type!==t$3.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A||null==r)return this._t=void 0,this.it=r;if(r===E)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}};e$1.directiveName="unsafeHTML",e$1.resultType=1;const o$7=e$3(e$1);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const n$3=t=>!n$5(t)&&"function"==typeof t.then,h=1073741823;class c extends f{constructor(){super(...arguments),this._$Cwt=h,this._$Cbt=[],this._$CK=new s(this),this._$CX=new i$2;}render(...s){return s.find(t=>!n$3(t))??E}update(s,i){const e=this._$Cbt;let r=e.length;this._$Cbt=i;const o=this._$CK,c=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$Cwt);t++){const s=i[t];if(!n$3(s))return this._$Cwt=t,s;t<r&&s===e[t]||(this._$Cwt=h,r=0,Promise.resolve(s).then(async t=>{for(;c.get();)await c.get();const i=o.deref();if(void 0!==i){const e=i._$Cbt.indexOf(s);e>-1&&e<i._$Cwt&&(i._$Cwt=e,i.setValue(t));}}));}return E}disconnected(){this._$CK.disconnect(),this._$CX.pause();}reconnected(){this._$CK.reconnect(this),this._$CX.resume();}}const m=e$3(c);

    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const l=e$3(class extends i$4{constructor(r){if(super(r),r.type!==t$3.PROPERTY&&r.type!==t$3.ATTRIBUTE&&r.type!==t$3.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!r$2(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t]){if(t===E||t===A)return t;const o=i.element,l=i.name;if(i.type===t$3.PROPERTY){if(t===o[l])return E}else if(i.type===t$3.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(l))return E}else if(i.type===t$3.ATTRIBUTE&&o.getAttribute(l)===t+"")return E;return p(i),t}});

    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const n$2="important",i=" !"+n$2,o$6=e$3(class extends i$4{constructor(t){if(super(t),t.type!==t$3.ATTRIBUTE||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n$2:""):s[t]=e;}}return E}});

    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const e=e$3(class extends i$4{constructor(t){if(super(t),t.type!==t$3.ATTRIBUTE||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(s=>t[s]).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return E}});

    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    function n$1(n,r,t){return n?r(n):t?.(n)}

    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const r=(r,o,t)=>{for(const t of o)if(t[0]===r)return (0, t[1])();return t?.()};

    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    function*o$5(o,f){if(void 0!==o){let i=0;for(const t of o)yield f(t,i++);}}

    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    function*o$4(o,t){const f="function"==typeof t;if(void 0!==o){let i=-1;for(const n of o)i>-1&&(yield f?t(i):t),i++,yield n;}}

    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    function*o$3(o,t,e=1){const i=void 0===t?0:o;t??=o;for(let o=i;e>0?o<t:t<o;o+=e)yield o;}

    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const o$2=e$3(class extends i$4{constructor(t){if(super(t),t.type!==t$3.CHILD)throw Error("templateContent can only be used in child bindings")}render(r){return this.vt===r?E:(this.vt=r,document.importNode(r.content,true))}});

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class t extends e$1{}t.directiveName="unsafeSVG",t.resultType=2;const o$1=e$3(t);

    const o=new WeakMap,n=e$3(class extends f{render(i){return A}update(i,[s]){const e=s!==this.G;return e&&void 0!==this.G&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=s,this.ht=i.options?.host,this.rt(this.ct=i.element)),A}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){const i=this.ht??globalThis;let s=o.get(i);void 0===s&&(s=new WeakMap,o.set(i,s)),void 0!==s.get(this.G)&&this.G.call(this.ht,void 0),s.set(this.G,t),void 0!==t&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return "function"==typeof this.G?o.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});

    const elements = new WeakMap();
    class _StyleMap extends i$4 {
        update(part, params) {
            const styleMap = params[0];
            styleMap.execute(part);
            return E;
        }
        render(styleMap) {
            return styleMap.toString();
        }
    }
    class StyleMap {
        constructor(styleInfo, options = { schedule: false }) {
            this.schedule = false;
            this.style = styleInfo;
            this._directive = e$3(_StyleMap);
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
    class Detach extends i$4 {
        render(shouldDetach) {
            return A;
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
    const detach = e$3(Detach);

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
        return class ActionsCollector extends i$4 {
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
                return A;
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
    function isPrimitive(value) {
        return (value === undefined ||
            value === null ||
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            typeof value === 'bigint' ||
            typeof value === 'symbol');
    }
    function isObject(item) {
        if (isPrimitive(item))
            return false;
        if (item && item.constructor) {
            return item.constructor.name === 'Object';
        }
        return typeof item === 'object' && item !== null;
    }
    function shouldMerge(item) {
        if (isPrimitive(item))
            return false;
        return Array.isArray(item) || isObject(item);
    }
    function mergeDeep(target, ...sources) {
        const source = sources.shift();
        // if (source && typeof source.clone === 'function') {
        //   target = source.clone();
        // } else
        if (isObject(source)) {
            if (!isObject(target)) {
                target = Object.create(null);
            }
            for (const key in source) {
                const value = source[key];
                if (shouldMerge(value)) {
                    target[key] = mergeDeep(target[key], value);
                }
                else {
                    target[key] = value;
                }
            }
        }
        else if (Array.isArray(source)) {
            const sourceLen = source.length;
            if (!Array.isArray(target)) {
                target = new Array(sourceLen);
            }
            else {
                target.length = sourceLen;
            }
            let index = 0;
            for (; index < sourceLen; index++) {
                const value = source[index];
                if (shouldMerge(value)) {
                    target[index] = mergeDeep(target[index], value);
                }
                else {
                    target[index] = value;
                }
            }
            // array has properties too
            // index++; // because length is also own property name - wee don't want to set this value
            // const arrayKeys = Object.getOwnPropertyNames(source); // <- we don't need non enumerable properties because we will copy raw later
            // if (arrayKeys.length > sourceLen + 1) {
            //   // +1 because of length Array property
            //   const arrayKeysLen = arrayKeys.length;
            //   for (; index < arrayKeysLen; index++) {
            //     const propName = arrayKeys[index];
            //     const value = source[propName];
            //     if (shouldMerge(value)) {
            //       target[propName] = mergeDeep(target[propName], value);
            //     } else {
            //       target[propName] = value;
            //     }
            //   }
            // }
            // lit templates array has a raw not enumerable property
            // @ts-ignore
            if (source.raw !== undefined) {
                // @ts-ignore
                target.raw = source.raw.slice();
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
            this.props = changedProps;
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

    class GetElementDirective extends i$4 {
        update(part, props) {
            if (typeof props[0] !== 'function') {
                throw new Error('[vido] GetElementDirective argument should be a function.');
            }
            const callback = props[0];
            callback(part.element);
        }
        render() {
            return A;
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
                const actionsInstanceDirective = e$3(ActionsCollector);
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
                this.html = b;
                this.svg = w;
                this.lithtml = lithtml;
                this.directive = e$3;
                this.asyncAppend = c$2;
                this.asyncReplace = h$2;
                this.cache = h$1;
                this.classMap = e;
                this.styleMap = o$6;
                this.StyleMap = StyleMap;
                this.guard = i$1;
                this.live = l;
                this.ifDefined = o$8;
                this.repeat = c$1;
                this.unsafeHTML = o$7;
                this.until = m;
                this.when = n$1;
                this.choose = r;
                this.map = o$5;
                this.join = o$4;
                this.range = o$3;
                //keyed = keyed;
                this.templateContent = o$2;
                this.unsafeSVG = o$1;
                this.ref = n;
                this.schedule = schedule;
                this.getElement = e$3(GetElementDirective);
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
                    D(appComponent.update(), element);
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
    Vido.Directive = i$4;
    Vido.StyleMap = StyleMap;
    Vido.PointerAction = PointerAction;
    Vido.Slots = Slots;
    const directives = {
        schedule,
        detach,
        styleMap: o$6,
        classMap: e,
        asyncAppend: c$2,
        asyncReplace: h$2,
        cache: h$1,
        guard: i$1,
        live: l,
        ifDefined: o$8,
        repeat: c$1,
        unsafeHTML: o$7,
        until: m,
        when: n$1,
        choose: r,
        map: o$5,
        join: o$4,
        range: o$3,
        //keyed,
        templateContent: o$2,
        unsafeSVG: o$1,
        ref: n,
    };
    Vido.directives = directives;

    return Vido;

}));
//# sourceMappingURL=vido.umd.js.map
