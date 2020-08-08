import { directive, Directive } from 'lit-html-optimised';
import { asyncAppend } from 'lit-html-optimised/directives/async-append';
import { asyncReplace } from 'lit-html-optimised/directives/async-replace';
import { cache } from 'lit-html-optimised/directives/cache';
import { classMap } from 'lit-html-optimised/directives/class-map';
import { guard } from 'lit-html-optimised/directives/guard';
import { ifDefined } from 'lit-html-optimised/directives/if-defined';
import { repeat } from 'lit-html-optimised/directives/repeat';
import { unsafeHTML } from 'lit-html-optimised/directives/unsafe-html';
import { until } from 'lit-html-optimised/directives/until';
import { live } from 'lit-html-optimised/directives/live';
import Detach from './Detach';
import StyleMap from './StyleMap';
import PointerAction from './PointerAction';
import { schedule } from './helpers';
import Action from './Action';
import { Slots } from './Slots';
import * as lithtml from 'lit-html-optimised';
export declare type UpdateTemplate = (props: unknown) => lithtml.TemplateResult;
export declare type Component = (vido: AnyVido, props: unknown) => UpdateTemplate;
export interface ComponentInstance {
    instance: string;
    update: () => Promise<unknown>;
    destroy: () => void;
    change: (props: unknown, options?: any) => void;
    html: (props?: unknown) => lithtml.TemplateResult;
    vidoInstance: AnyVido;
}
export interface CreateAppConfig {
    element: HTMLElement;
    component: Component;
    props: unknown;
}
export interface vido<State, Api> {
    state: State;
    api: Api;
    html: (strings: TemplateStringsArray, ...values: unknown[]) => lithtml.TemplateResult;
    svg: (strings: TemplateStringsArray, ...values: unknown[]) => lithtml.SVGTemplateResult;
    onDestroy: (callback: any) => void;
    onChange: (callback: any) => void;
    update: (callback?: any) => Promise<unknown>;
    createComponent: (component: Component, props?: unknown, content?: unknown) => ComponentInstance;
    createApp: (config: CreateAppConfig) => ComponentInstance;
    reuseComponents: (currentComponents: ComponentInstance[], dataArray: unknown[], getProps: any, component: Component, leaveTail?: boolean, debug?: boolean) => void;
    directive: typeof directive;
    asyncAppend: typeof asyncAppend;
    asyncReplace: typeof asyncReplace;
    cache: typeof cache;
    classMap: typeof classMap;
    guard: typeof guard;
    live: typeof live;
    ifDefined: typeof ifDefined;
    repeat: typeof repeat;
    unsafeHTML: typeof unsafeHTML;
    until: typeof until;
    schedule: typeof schedule;
    StyleMap: typeof StyleMap;
    Detach: typeof Detach;
    PointerAction: typeof PointerAction;
    Action: typeof Action;
    Slots: typeof Slots;
    Actions?: any;
}
export declare type AnyVido = vido<any, any>;
export default function Vido<State, Api>(state: State, api: Api): vido<State, Api>;
export { lithtml, Action, Directive, schedule, Detach, StyleMap, PointerAction, asyncAppend, asyncReplace, cache, classMap, guard, ifDefined, repeat, unsafeHTML, until, Slots, };
