import { html, svg } from 'lit-html';
import { directive } from 'lit-html/directive.js';
import { asyncAppend, AsyncAppendDirective } from 'lit-html/directives/async-append.js';
import { asyncReplace, AsyncReplaceDirective } from 'lit-html/directives/async-replace.js';
import { cache, CacheDirective } from 'lit-html/directives/cache.js';
import { guard, GuardDirective } from 'lit-html/directives/guard.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { repeat, RepeatDirective } from 'lit-html/directives/repeat.js';
import { unsafeHTML, UnsafeHTMLDirective } from 'lit-html/directives/unsafe-html.js';
import { until, UntilDirective } from 'lit-html/directives/until.js';
import { live, LiveDirective } from 'lit-html/directives/live.js';
import { styleMap, StyleMapDirective } from 'lit-html/directives/style-map.js';
import { classMap, ClassMapDirective } from 'lit-html/directives/class-map.js';
import { when } from 'lit-html/directives/when.js';
import { choose } from 'lit-html/directives/choose.js';
import { map } from 'lit-html/directives/map.js';
import { join } from 'lit-html/directives/join.js';
import { range } from 'lit-html/directives/range.js';
import { keyed, Keyed } from 'lit-html/directives/keyed.js';
import { templateContent, TemplateContentDirective } from 'lit-html/directives/template-content.js';
import { unsafeSVG, UnsafeSVGDirective } from 'lit-html/directives/unsafe-svg.js';
import { ref, RefDirective, Ref, createRef } from 'lit-html/directives/ref.js';
import { StyleMap } from './StyleMap';
import detach from './Detach';
import PointerAction from './PointerAction';
import { schedule } from './helpers';
import Action from './Action';
import { Slots } from './Slots';
import helpers from './helpers';
import * as lithtml from 'lit-html';
export * from 'lit-html/directive.js';
export * from 'lit-html';
export { AsyncAppendDirective, AsyncReplaceDirective, CacheDirective, GuardDirective, RepeatDirective, UnsafeHTMLDirective, UntilDirective, LiveDirective, StyleMapDirective, ClassMapDirective, Keyed, TemplateContentDirective, UnsafeSVGDirective, RefDirective, Ref, createRef, };
declare type htmlResult = lithtml.TemplateResult | lithtml.TemplateResult[] | lithtml.SVGTemplateResult | lithtml.SVGTemplateResult[] | undefined | null;
interface ClassInfo {
    [name: string]: string | boolean | number;
}
interface StyleInfo {
    [name: string]: string | undefined | null;
}
declare type UpdateTemplate = (props: unknown) => htmlResult;
declare type Component = (vido: AnyVido, props: unknown) => UpdateTemplate;
interface ComponentInstance {
    instance: string;
    update: () => Promise<unknown>;
    destroy: () => void;
    change: (props: unknown, options?: any) => void;
    html: (props?: unknown) => lithtml.TemplateResult;
    vidoInstance: AnyVido;
}
interface CreateAppConfig {
    element: HTMLElement;
    component: Component;
    props: unknown;
}
declare type Callback = () => void;
declare type OnChangeCallback = (props: any, options: any) => void;
declare type GetPropsFn = (arg: unknown) => unknown | any;
interface vido<State, Api> {
    instance: string;
    name: string;
    state: State;
    api: Api;
    html: typeof html;
    lithtml: typeof lithtml;
    svg: typeof svg;
    onDestroy: (callback: Callback) => void;
    onChange: (callback: OnChangeCallback) => void;
    update: (callback?: any) => Promise<unknown>;
    createComponent: (component: Component, props?: unknown, content?: unknown) => ComponentInstance;
    createApp: (config: CreateAppConfig) => ComponentInstance;
    reuseComponents: (currentComponents: ComponentInstance[], dataArray: unknown[], getProps: GetPropsFn, component: Component, leaveTail?: boolean, debug?: boolean) => void;
    getElement: (callback: (element: Element) => void) => void;
    directive: typeof directive;
    asyncAppend: typeof asyncAppend;
    asyncReplace: typeof asyncReplace;
    cache: typeof cache;
    classMap: typeof classMap;
    styleMap: typeof styleMap;
    StyleMap: typeof StyleMap;
    guard: typeof guard;
    live: typeof live;
    ifDefined: typeof ifDefined;
    repeat: typeof repeat;
    unsafeHTML: typeof unsafeHTML;
    until: typeof until;
    schedule: typeof schedule;
    detach: typeof detach;
    when: typeof when;
    choose: typeof choose;
    map: typeof map;
    join: typeof join;
    range: typeof range;
    keyed: typeof keyed;
    templateContent: typeof templateContent;
    unsafeSVG: typeof unsafeSVG;
    ref: typeof ref;
    PointerAction: typeof PointerAction;
    Action: typeof Action;
    Slots: typeof Slots;
    Actions?: any;
}
declare type AnyVido = vido<any, any>;
declare function Vido<State, Api>(state: State, api: Api): vido<State, Api>;
declare namespace Vido {
    var lithtml: typeof import("lit-html");
    var Action: typeof import("./Action").default;
    var Directive: typeof import("lit-html/directive.js").Directive;
    var StyleMap: typeof import("./StyleMap").StyleMap;
    var PointerAction: typeof import("./PointerAction").default;
    var Slots: typeof import("./Slots").Slots;
    var directives: {
        schedule: typeof schedule;
        detach: (shouldDetach: boolean) => import("lit-html/directive.js").DirectiveResult<typeof import("./Detach").Detach>;
        styleMap: (styleInfo: Readonly<import("lit-html/directives/style-map.js").StyleInfo>) => import("lit-html/directive.js").DirectiveResult<typeof StyleMapDirective>;
        classMap: (classInfo: import("lit-html/directives/class-map.js").ClassInfo) => import("lit-html/directive.js").DirectiveResult<typeof ClassMapDirective>;
        asyncAppend: (value: AsyncIterable<unknown>, _mapper?: (v: unknown, index?: number) => unknown) => import("lit-html/directive.js").DirectiveResult<typeof AsyncAppendDirective>;
        asyncReplace: (value: AsyncIterable<unknown>, _mapper?: (v: unknown, index?: number) => unknown) => import("lit-html/directive.js").DirectiveResult<typeof AsyncReplaceDirective>;
        cache: (v: unknown) => import("lit-html/directive.js").DirectiveResult<typeof CacheDirective>;
        guard: (_value: unknown, f: () => unknown) => import("lit-html/directive.js").DirectiveResult<typeof GuardDirective>;
        live: (value: unknown) => import("lit-html/directive.js").DirectiveResult<typeof LiveDirective>;
        ifDefined: <T>(value: T) => typeof import("lit-html").nothing | NonNullable<T>;
        repeat: import("lit-html/directives/repeat.js").RepeatDirectiveFn;
        unsafeHTML: (value: string | typeof import("lit-html").noChange | typeof import("lit-html").nothing) => import("lit-html/directive.js").DirectiveResult<typeof UnsafeHTMLDirective>;
        until: (...values: unknown[]) => import("lit-html/directive.js").DirectiveResult<typeof UntilDirective>;
        when: typeof when;
        choose: <T_1, V>(value: T_1, cases: [T_1, () => V][], defaultCase?: () => V) => V;
        map: typeof map;
        join: typeof join;
        range: typeof range;
        keyed: (k: unknown, v: unknown) => import("lit-html/directive.js").DirectiveResult<typeof Keyed>;
        templateContent: (template: HTMLTemplateElement) => import("lit-html/directive.js").DirectiveResult<typeof TemplateContentDirective>;
        unsafeSVG: (value: string | typeof import("lit-html").noChange | typeof import("lit-html").nothing) => import("lit-html/directive.js").DirectiveResult<typeof UnsafeSVGDirective>;
        ref: (_ref: import("lit-html/directives/ref.js").RefOrCallback) => import("lit-html/directive.js").DirectiveResult<typeof RefDirective>;
    };
}
export default Vido;
declare const lit: typeof lithtml;
export { vido, lithtml, lit, Action, schedule, detach, styleMap, StyleMap, classMap, PointerAction, asyncAppend, asyncReplace, cache, guard, ifDefined, repeat, unsafeHTML, until, when, choose, map, join, range, keyed, templateContent, unsafeSVG, ref, Slots, helpers, ClassInfo, StyleInfo, htmlResult, UpdateTemplate, Component, ComponentInstance, CreateAppConfig, OnChangeCallback, Callback, GetPropsFn, AnyVido, };
