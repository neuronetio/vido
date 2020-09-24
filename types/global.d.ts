declare module "Action" {
    class Action {
        isAction: boolean;
    }
    export default Action;
}
declare module "ActionsCollector" {
    import { AttributePart } from 'lit-html-optimised';
    export default function getActionsCollector(actionsByInstance: Map<string, any>): {
        new (instance: string): {
            instance: string;
            actions: unknown[];
            props: unknown;
            set(actions: unknown[], props: object): any;
            body(part: AttributePart): void;
            isDirective: boolean;
            isClass: boolean;
        };
    };
}
declare module "Detach" {
    import { AttributePart, Directive } from 'lit-html-optimised';
    export interface ElementData {
        element: Element;
        nextSibling: ChildNode | null;
        previousSibling: ChildNode | null;
        parent: (Node & ParentNode) | null;
    }
    export default class Detach extends Directive {
        private ifFn;
        constructor(ifFn: () => boolean);
        body(part: AttributePart): void;
    }
}
declare module "GetElement" {
    import { AttributePart } from 'lit-html-optimised';
    import { DirectiveFactory } from 'lit-html-optimised/lib/directive';
    export default function prepareGetElement(directive: <F extends DirectiveFactory>(f: F) => F): (callback: (element: Element) => void) => (part: AttributePart) => void;
}
declare module "StyleMap" {
    import { Directive, Part } from 'lit-html-optimised';
    import { PropertiesHyphenFallback as CSSProp } from 'csstype';
    export default class StyleMap extends Directive {
        style: CSSProp;
        private previous;
        private detach;
        private toRemove;
        private toUpdate;
        private debug;
        constructor(styleInfo: CSSProp, detach?: boolean);
        setStyle(styleInfo: CSSProp): void;
        setDebug(debug?: boolean): void;
        setDetach(detach: boolean): void;
        body(part: Part): void;
    }
}
declare module "PointerAction" {
    import Action from "Action";
    export type EventToNormalize = PointerEvent | TouchEvent | WheelEvent | Event;
    export interface Options {
        element?: HTMLElement;
        axis?: string;
        threshold?: number;
        onDown?: (data: NormalizedEvent) => void;
        onMove?: (data: NormalizedEvent) => void;
        onUp?: (data: NormalizedEvent) => void;
        onWheel?: (data: NormalizedEvent) => void;
    }
    export interface InternalOptions extends Options {
        element: HTMLElement;
        axis: string;
        threshold: number;
        onDown: (data: NormalizedEvent) => void;
        onMove: (data: NormalizedEvent) => void;
        onUp: (data: NormalizedEvent) => void;
        onWheel: (data: NormalizedEvent) => void;
    }
    export interface Props {
        pointerOptions: InternalOptions;
        [key: string]: unknown;
    }
    export interface NormalizedEvent {
        x: number;
        y: number;
        z?: number;
        pageX?: number;
        pageY?: number;
        clientX?: number;
        clientY?: number;
        screenX?: number;
        screenY?: number;
        movementX?: number;
        movementY?: number;
        initialX?: number;
        initialY?: number;
        lastX?: number;
        lastY?: number;
        event: Event;
    }
    export default class PointerAction extends Action {
        private id;
        private moving;
        private initialX;
        private initialY;
        private lastY;
        private lastX;
        private element;
        private options;
        constructor(element: Element, data: Props);
        private normalizeMouseWheelEvent;
        onWheel(event: WheelEvent): void;
        private normalizePointerEvent;
        private onPointerDown;
        private handleX;
        private handleY;
        private onPointerMove;
        private onPointerUp;
        destroy(element: Element): void;
    }
}
declare module "PublicComponentMethods" {
    import { AnyVido } from "vido";
    export default function getPublicComponentMethods(components: Map<string, any>, actionsByInstance: Map<string, any>, clone: (obj: object) => object): {
        new (instance: string, vidoInstance: AnyVido, props?: unknown): {
            instance: string;
            name: string;
            vidoInstance: any;
            props: any;
            destroyed: boolean;
            /**
             * Destroy component
             */
            destroy(): void;
            /**
             * Update template - trigger rendering process
             */
            update(callback?: () => void): any;
            /**
             * Change component input properties
             * @param {any} newProps
             */
            change(newProps: unknown, options?: unknown): void;
            /**
             * Get component lit-html template
             * @param {} templateProps
             */
            html(templateProps?: unknown): any;
            _getComponents(): Map<string, any>;
            _getActions(): Map<string, any>;
        };
    };
}
declare module "helpers" {
    /**
     * Schedule - a throttle function that uses requestAnimationFrame to limit the rate at which a function is called.
     *
     * @param {function} fn
     * @returns {function}
     */
    export function schedule(fn: (argument: unknown) => void | any): (argument: unknown) => void;
    /**
     * Merge deep - helper function which will merge objects recursively - creating brand new one - like clone
     *
     * @param {object} target
     * @params {[object]} sources
     * @returns {object}
     */
    export function mergeDeep(target: any, ...sources: any[]): object;
    /**
     * Clone helper function
     *
     * @param source
     * @returns {object} cloned source
     */
    export function clone(source: object): object;
    const _default: {
        mergeDeep: typeof mergeDeep;
        clone: typeof clone;
        schedule: typeof schedule;
    };
    export default _default;
}
declare module "Slots" {
    import { ComponentInstance, Component, AnyVido } from "vido";
    export type SlotInstances = {
        [key: string]: ComponentInstance[];
    };
    export interface SlotStorage {
        [key: string]: Component[];
    }
    export class Slots {
        private slotInstances;
        private vido;
        private destroyed;
        private props;
        constructor(vido: AnyVido, props: unknown);
        setComponents(slots: SlotStorage): void;
        destroy(): void;
        change(changedProps: unknown, options?: any): void;
        getInstances(placement: string | undefined): ComponentInstance[] | SlotInstances;
        html(placement: string, templateProps?: any): any;
        getProps(): unknown;
        isDestroyed(): boolean;
    }
}
declare module "vido" {
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
    import Detach from "Detach";
    import StyleMap from "StyleMap";
    import PointerAction from "PointerAction";
    import { schedule } from "helpers";
    import Action from "Action";
    import { Slots } from "Slots";
    import * as lithtml from 'lit-html-optimised';
    export type htmlResult = lithtml.TemplateResult | lithtml.TemplateResult[] | lithtml.SVGTemplateResult | lithtml.SVGTemplateResult[] | undefined | null;
    export type UpdateTemplate = (props: unknown) => htmlResult;
    export type Component = (vido: AnyVido, props: unknown) => UpdateTemplate;
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
    export type Callback = () => void;
    export type OnChangeCallback = (props: any, options: any) => void;
    export type GetPropsFn = (arg: unknown) => unknown | any;
    export interface vido<State, Api> {
        instance: string;
        name: string;
        state: State;
        api: Api;
        html: (strings: TemplateStringsArray, ...values: unknown[]) => lithtml.TemplateResult;
        svg: (strings: TemplateStringsArray, ...values: unknown[]) => lithtml.SVGTemplateResult;
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
    export type AnyVido = vido<any, any>;
    export default function Vido<State, Api>(state: State, api: Api): vido<State, Api>;
    export { lithtml, Action, Directive, schedule, Detach, StyleMap, PointerAction, asyncAppend, asyncReplace, cache, classMap, guard, ifDefined, repeat, unsafeHTML, until, Slots, };
}
declare module "InternalComponentMethods" {
    import { AnyVido, htmlResult } from "vido";
    export default function getInternalComponentMethods(components: Map<string, any>, actionsByInstance: Map<string, any>, clone: (obj: object) => object): {
        new (instance: string, vidoInstance: AnyVido, renderFunction: (arg: any) => htmlResult): {
            instance: string;
            vidoInstance: any;
            renderFunction: (changedProps: any) => void;
            content: any;
            destroyed: boolean;
            destroy(): void;
            update(props?: {}): void;
            change(changedProps: unknown, options?: {
                leave: boolean;
            }): void;
        };
    };
}
declare module "vido.umd" {
    import Vido from "vido";
    export default Vido;
}
