import { render, html, directive, svg, Directive, NodePart } from 'lit-html-optimised';
import { asyncAppend } from 'lit-html-optimised/directives/async-append';
import { asyncReplace } from 'lit-html-optimised/directives/async-replace';
import { cache } from 'lit-html-optimised/directives/cache';
import { classMap } from 'lit-html-optimised/directives/class-map';
import { guard } from 'lit-html-optimised/directives/guard';
import { ifDefined } from 'lit-html-optimised/directives/if-defined';
import { repeat } from 'lit-html-optimised/directives/repeat';
import { unsafeHTML } from 'lit-html-optimised/directives/unsafe-html';
import { until } from 'lit-html-optimised/directives/until';
import Detach from './Detach';
import StyleMap from './StyleMap';
import PointerAction from './PointerAction';
import getPublicComponentMethods from './PublicComponentMethods';
import getActionsCollector from './ActionsCollector';
import getInternalComponentMethods from './InternalComponentMethods';
import { schedule, clone } from './helpers';
import Action from './Action';

import * as lithtml from 'lit-html-optimised';

/* dev imports
import { render, html, directive, svg, Part } from '../lit-html';
import { asyncAppend } from '../lit-html/directives/async-append';
import { asyncReplace } from '../lit-html/directives/async-replace';
import { cache } from '../lit-html/directives/cache';
import { classMap } from '../lit-html/directives/class-map';
import { guard } from '../lit-html/directives/guard';
import { ifDefined } from '../lit-html/directives/if-defined';
import { repeat } from '../lit-html/directives/repeat';
import { unsafeHTML } from '../lit-html/directives/unsafe-html';
import { until } from '../lit-html/directives/until';
import { Directive } from '../lit-html/lib/directive';
*/

export type UpdateTemplate = (props: unknown) => lithtml.TemplateResult;

export type Component = (vido: vido<unknown, unknown>, props: unknown) => UpdateTemplate;

export interface ComponentInstance {
  instance: string;
  update: () => Promise<unknown>;
  destroy: () => void;
  change: (props: unknown, options?: any) => void;
  html: (props?: unknown) => lithtml.TemplateResult;
  vidoInstance: vido<unknown, unknown>;
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
  onDestroy: (callback) => void;
  onChange: (callback) => void;
  update: (callback?: any) => Promise<unknown>;
  createComponent: (component: Component, props?: unknown, content?: unknown) => ComponentInstance;
  createApp: (config: CreateAppConfig) => ComponentInstance;
  reuseComponents: (
    currentComponents: ComponentInstance[],
    dataArray: unknown[],
    getProps,
    component: Component,
    leaveTail?: boolean
  ) => void;
  directive: typeof directive;
  asyncAppend: typeof asyncAppend;
  asyncReplace: typeof asyncReplace;
  cache: typeof cache;
  classMap: typeof classMap;
  guard: typeof guard;
  ifDefined: typeof ifDefined;
  repeat: typeof repeat;
  unsafeHTML: typeof unsafeHTML;
  until: typeof until;
  schedule: typeof schedule;
  StyleMap: typeof StyleMap;
  Detach: typeof Detach;
  PointerAction: typeof PointerAction;
  Action: typeof Action;
  Actions?: any;
}

export default function Vido<State, Api>(state: State, api: Api): vido<State, Api> {
  let componentId = 0;
  const components = new Map();
  let actionsByInstance = new Map();
  let app, element;
  let shouldUpdateCount = 0;
  const afterUpdateCallbacks: (() => void)[] = [];
  const resolved = Promise.resolve();
  const additionalMethods = {};

  const ActionsCollector = getActionsCollector(actionsByInstance);

  class InstanceActionsCollector {
    public instance: string;

    constructor(instance: string) {
      this.instance = instance;
    }

    public create(actions: unknown[], props: object) {
      const actionsInstance = new ActionsCollector(this.instance);
      actionsInstance.set(actions, props);
      return actionsInstance;
    }
  }

  const PublicComponentMethods = getPublicComponentMethods(components, actionsByInstance, clone);
  const InternalComponentMethods = getInternalComponentMethods(components, actionsByInstance, clone);

  class VidoInstance {
    destroyable = [];
    onChangeFunctions = [];
    debug = false;
    state = state as State;
    api = api as Api;
    lastProps = {};
    html = html;
    svg = svg;
    directive = directive;
    asyncAppend = asyncAppend;
    asyncReplace = asyncReplace;
    cache = cache;
    classMap = classMap;
    guard = guard;
    ifDefined = ifDefined;
    repeat = repeat;
    unsafeHTML = unsafeHTML;
    until = until;
    schedule = schedule;
    actionsByInstance = (componentActions, props) => {};
    StyleMap = StyleMap;
    Detach = Detach;
    PointerAction = PointerAction;
    Action = Action;
    _components = components;
    _actions = actionsByInstance;

    constructor() {
      this.reuseComponents = this.reuseComponents.bind(this);
      this.onDestroy = this.onDestroy.bind(this);
      this.onChange = this.onChange.bind(this);
      this.update = this.update.bind(this);
      for (const name in additionalMethods) {
        this[name] = additionalMethods[name];
      }
    }

    addMethod(name: string, body: (...args: unknown[]) => unknown) {
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
     * @returns {array} of components (with updated/destroyed/created ones)
     */
    reuseComponents(
      currentComponents: ComponentInstance[],
      dataArray: unknown[],
      getProps,
      component: Component,
      leaveTail = true
    ) {
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
          modified.push(newComponent.instance);
          diff--;
        }
      } else if (currentLen > dataLen) {
        let diff = currentLen - dataLen;
        if (leaveTail) {
          leave = true;
          leaveStartingAt = currentLen - diff;
        }
        while (diff) {
          const index = currentLen - diff;
          if (!leaveTail) {
            modified.push(currentComponents[index].instance);
            currentComponents[index].destroy();
          }
          diff--;
        }
        if (!leaveTail) {
          currentComponents.length = dataLen;
        }
      }
      let index = 0;
      for (const component of currentComponents) {
        const item = dataArray[index];
        if (!modified.includes(component.instance) && component) {
          component.change(getProps(item), { leave: leave && index >= leaveStartingAt });
        }
        index++;
      }
    }

    createComponent(component, props = {}, content = null): ComponentInstance {
      const instance = component.name + ':' + componentId++;
      let vidoInstance;
      vidoInstance = new VidoInstance();
      vidoInstance.instance = instance;
      vidoInstance.name = component.name;
      vidoInstance.Actions = new InstanceActionsCollector(instance);
      const publicMethods = new PublicComponentMethods(instance, vidoInstance, props);
      const internalMethods = new InternalComponentMethods(
        instance,
        vidoInstance,
        component(vidoInstance, props, content),
        content
      );
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
      if (!component) return;
      component.update();
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
            const componentAction = action.componentAction;
            const create = componentAction.create;
            if (typeof create !== 'undefined') {
              let result;
              if (
                create.prototype?.isAction !== true &&
                create.isAction === undefined &&
                create.prototype?.update === undefined &&
                create.prototype?.destroy === undefined
              ) {
                result = create(action.element, action.props);
              } else {
                result = new create(action.element, action.props);
              }
              if (result !== undefined) {
                if (typeof result === 'function') {
                  componentAction.destroy = result;
                } else {
                  if (typeof result.update === 'function') {
                    componentAction.update = result.update.bind(result);
                  }
                  if (typeof result.destroy === 'function') {
                    componentAction.destroy = result.destroy.bind(result);
                  }
                }
              }
            }
          } else {
            action.element.vido = action.props;
            if (typeof action.componentAction.update === 'function') {
              action.componentAction.update(action.element, action.props);
            }
          }
        }
        for (const action of actions) {
          action.element.vido = action.props;
        }
      }
    }

    updateTemplate(callback: () => void = undefined) {
      if (callback) afterUpdateCallbacks.push(callback);
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
            resolve();
          }
        }
        resolved.then(flush);
      });
    }

    createApp(config: CreateAppConfig): ComponentInstance {
      element = config.element;
      const App = this.createComponent(config.component, config.props);
      app = App.instance;
      this.render();
      return App;
    }

    render(): void {
      const appComponent = components.get(app);
      if (appComponent) {
        render(appComponent.update(), element);
        this.executeActions();
      } else if (element) {
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
Vido.prototype.StyleMap = StyleMap;
Vido.prototype.PointerAction = PointerAction;
Vido.prototype.asyncAppend = asyncAppend;
Vido.prototype.asyncReplace = asyncReplace;
Vido.prototype.cache = cache;
Vido.prototype.classMap = classMap;
Vido.prototype.guard = guard;
Vido.prototype.ifDefined = ifDefined;
Vido.prototype.repeat = repeat;
Vido.prototype.unsafeHTML = unsafeHTML;
Vido.prototype.unti = until;

export {
  lithtml,
  Action,
  Directive,
  schedule,
  Detach,
  StyleMap,
  PointerAction,
  asyncAppend,
  asyncReplace,
  cache,
  classMap,
  guard,
  ifDefined,
  repeat,
  unsafeHTML,
  until,
};
