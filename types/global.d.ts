declare module "Action" {
    class Action {
        isAction: boolean;
    }
    export default Action;
}
declare module "ActionsCollector" {
    import { AttributePart } from 'lit-html-optimised';
    export default function getActionsCollector(actionsByInstance: any): {
        new (instance: any): {
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
        nextSibling: Node;
        previousSibling: Node;
        parent: Node;
    }
    export default class Detach extends Directive {
        private ifFn;
        constructor(ifFn: () => boolean);
        body(part: AttributePart): void;
    }
}
declare module "InternalComponentMethods" {
    export default function getInternalComponentMethods(components: any, actionsByInstance: any, clone: any): {
        new (instance: string, vidoInstance: any, renderFunction: any, content: any): {
            instance: string;
            vidoInstance: any;
            renderFunction: (changedProps: any) => void;
            content: any;
            destroyed: boolean;
            destroy(): void;
            update(props?: {}): void;
            change(changedProps: any, options?: {
                leave: boolean;
            }): void;
        };
    };
}
declare module "PointerAction" {
    import Action from "Action";
    export interface Options {
        element?: HTMLElement;
        axis?: string;
        threshold?: number;
        onDown?: (data: any) => void;
        onMove?: (data: any) => void;
        onUp?: (data: any) => void;
        onWheel?: (data: any) => void;
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
        constructor(element: any, data: any);
        private normalizeMouseWheelEvent;
        onWheel(event: any): void;
        private normalizePointerEvent;
        private onPointerDown;
        private handleX;
        private handleY;
        private onPointerMove;
        private onPointerUp;
        destroy(element: any): void;
    }
}
declare module "PublicComponentMethods" {
    export default function getPublicComponentMethods(components: any, actionsByInstance: any, clone: any): {
        new (instance: any, vidoInstance: any, props?: {}): {
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
            change(newProps: any, options: any): void;
            /**
             * Get component lit-html template
             * @param {} templateProps
             */
            html(templateProps?: {}): any;
            _getComponents(): any;
            _getActions(): any;
        };
    };
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
        setDetach(detach: any): void;
        body(part: Part): void;
    }
}
declare module "helpers" {
    /**
     * Schedule - a throttle function that uses requestAnimationFrame to limit the rate at which a function is called.
     *
     * @param {function} fn
     * @returns {function}
     */
    export function schedule(fn: (argument: any) => void | any): (argument: any) => void;
    /**
     * Merge deep - helper function which will merge objects recursively - creating brand new one - like clone
     *
     * @param {object} target
     * @params {[object]} sources
     * @returns {object}
     */
    export function mergeDeep(target: any, ...sources: any[]): any;
    /**
     * Clone helper function
     *
     * @param source
     * @returns {object} cloned source
     */
    export function clone(source: any): any;
    const _default: {
        mergeDeep: typeof mergeDeep;
        clone: typeof clone;
        schedule: typeof schedule;
    };
    export default _default;
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
    export type UpdateTemplate = (props: unknown) => lithtml.TemplateResult;
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
    export type AnyVido = vido<any, any>;
    export default function Vido<State, Api>(state: State, api: Api): vido<State, Api>;
    export { lithtml, Action, Directive, schedule, Detach, StyleMap, PointerAction, asyncAppend, asyncReplace, cache, classMap, guard, ifDefined, repeat, unsafeHTML, until, Slots, };
}
declare module "Slots" {
    import { ComponentInstance, lithtml, Component, AnyVido } from "vido";
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
        html(placement: string, templateProps?: any): lithtml.TemplateResult[] | undefined;
        getProps(): unknown;
        isDestroyed(): boolean;
    }
}
declare module "vido.umd" {
    import Vido from "vido";
    export default Vido;
}
