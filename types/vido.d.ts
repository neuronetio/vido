import { html, svg } from 'lit-html';
import { directive } from 'lit-html/directive.js';
import { asyncAppend } from 'lit-html/directives/async-append.js';
import { asyncReplace } from 'lit-html/directives/async-replace.js';
import { cache } from 'lit-html/directives/cache.js';
import { guard } from 'lit-html/directives/guard.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { until } from 'lit-html/directives/until.js';
import { live } from 'lit-html/directives/live.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { when } from 'lit-html/directives/when.js';
import { choose } from 'lit-html/directives/choose.js';
import { map } from 'lit-html/directives/map.js';
import { join } from 'lit-html/directives/join.js';
import { range } from 'lit-html/directives/range.js';
import { keyed } from 'lit-html/directives/keyed.js';
import { templateContent } from 'lit-html/directives/template-content.js';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import { ref } from 'lit-html/directives/ref.js';
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
    PointerAction: typeof PointerAction;
    Action: typeof Action;
    Slots: typeof Slots;
    Actions?: any;
}
declare type AnyVido = vido<any, any>;
export default function Vido<State, Api>(state: State, api: Api): vido<State, Api>;
declare const lit: typeof lithtml;
export { vido, lithtml, lit, Action, schedule, detach, styleMap, StyleMap, classMap, PointerAction, asyncAppend, asyncReplace, cache, guard, ifDefined, repeat, unsafeHTML, until, when, choose, map, join, range, keyed, templateContent, unsafeSVG, ref, Slots, helpers, ClassInfo, StyleInfo, htmlResult, UpdateTemplate, Component, ComponentInstance, CreateAppConfig, OnChangeCallback, Callback, GetPropsFn, AnyVido, };
