import { render, html, svg } from 'lit-html';
import { directive, Directive } from 'lit-html/directive';
import { asyncAppend } from 'lit-html/directives/async-append';
import { asyncReplace } from 'lit-html/directives/async-replace';
import { cache } from 'lit-html/directives/cache';
import { guard } from 'lit-html/directives/guard';
import { ifDefined } from 'lit-html/directives/if-defined';
import { repeat } from 'lit-html/directives/repeat';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { until } from 'lit-html/directives/until';
import { live } from 'lit-html/directives/live';
import Detach from './Detach';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import PointerAction from './PointerAction';
import getPublicComponentMethods from './PublicComponentMethods';
import getActionsCollector from './ActionsCollector';
import getInternalComponentMethods from './InternalComponentMethods';
import { schedule, clone } from './helpers';
import Action from './Action';
import { Slots } from './Slots';
import GetElementDirective from './GetElement';
import helpers from './helpers';
import * as lithtml from 'lit-html';
export default function Vido(state, api) {
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
            const actionsInstanceDirective = directive(ActionsCollector);
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
            this.html = html;
            this.svg = svg;
            this.directive = directive;
            this.asyncAppend = asyncAppend;
            this.asyncReplace = asyncReplace;
            this.cache = cache;
            this.classMap = classMap;
            this.styleMap = styleMap;
            this.guard = guard;
            this.live = live;
            this.ifDefined = ifDefined;
            this.repeat = repeat;
            this.unsafeHTML = unsafeHTML;
            this.until = until;
            this.schedule = schedule;
            this.getElement = directive(GetElementDirective);
            this.actionsByInstance = ( /* componentActions, props */) => { };
            this.Detach = Detach;
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
                render(appComponent.update(), element);
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
Vido.prototype.Directive = Directive;
Vido.prototype.schedule = schedule;
Vido.prototype.Detach = Detach;
Vido.prototype.styleMap = styleMap;
Vido.prototype.classMap = classMap;
Vido.prototype.PointerAction = PointerAction;
Vido.prototype.asyncAppend = asyncAppend;
Vido.prototype.asyncReplace = asyncReplace;
Vido.prototype.cache = cache;
Vido.prototype.guard = guard;
Vido.prototype.live = live;
Vido.prototype.ifDefined = ifDefined;
Vido.prototype.repeat = repeat;
Vido.prototype.unsafeHTML = unsafeHTML;
Vido.prototype.until = until;
Vido.prototype.Slots = Slots;
export { lithtml, Action, Directive, schedule, Detach, styleMap, classMap, PointerAction, asyncAppend, asyncReplace, cache, guard, ifDefined, repeat, unsafeHTML, until, Slots, helpers, };
