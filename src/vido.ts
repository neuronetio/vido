import { render, html, svg } from 'lit-html';
import { directive, Directive } from 'lit-html/directive.js';
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
import getPublicComponentMethods from './PublicComponentMethods';
import getActionsCollector from './ActionsCollector';
import getInternalComponentMethods from './InternalComponentMethods';
import { schedule, clone } from './helpers';
import Action from './Action';
import { Slots } from './Slots';
import GetElementDirective from './GetElement';
import helpers from './helpers';
import * as lithtml from 'lit-html';
export * from 'lit-html/directive.js';
export * from 'lit-html';

type htmlResult =
  | lithtml.TemplateResult
  | lithtml.TemplateResult[]
  | lithtml.SVGTemplateResult
  | lithtml.SVGTemplateResult[]
  | undefined
  | null;

interface ClassInfo {
  [name: string]: string | boolean | number;
}

interface StyleInfo {
  [name: string]: string | undefined | null;
}

type UpdateTemplate = (props: unknown) => htmlResult;

type Component = (vido: AnyVido, props: unknown) => UpdateTemplate;

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

type Callback = () => void;
type OnChangeCallback = (props: any, options: any) => void;
type GetPropsFn = (arg: unknown) => unknown | any;

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
  reuseComponents: (
    currentComponents: ComponentInstance[],
    dataArray: unknown[],
    getProps: GetPropsFn,
    component: Component,
    leaveTail?: boolean,
    debug?: boolean
  ) => void;
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

type AnyVido = vido<any, any>;

export default function Vido<State, Api>(state: State, api: Api): vido<State, Api> {
  let componentId = 0;
  const components = new Map();
  let actionsByInstance = new Map();
  let app: string, element: HTMLElement;
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
    instance: string = '';
    name: string = '';
    Actions: InstanceActionsCollector;
    destroyable: Callback[] = [];
    destroyed = false;
    onChangeFunctions: OnChangeCallback[] = [];
    debug = false;
    state = state as State;
    api = api as Api;
    lastProps = {};
    html = html;
    svg = svg;
    lithtml = lithtml;
    directive = directive;
    asyncAppend = asyncAppend;
    asyncReplace = asyncReplace;
    cache = cache;
    classMap = classMap;
    styleMap = styleMap;
    StyleMap = StyleMap;
    guard = guard;
    live = live;
    ifDefined = ifDefined;
    repeat = repeat;
    unsafeHTML = unsafeHTML;
    until = until;
    when = when;
    choose = choose;
    map = map;
    join = join;
    range = range;
    keyed = keyed;
    templateContent = templateContent;
    unsafeSVG = unsafeSVG;
    ref = ref;
    schedule = schedule;
    getElement = directive(GetElementDirective);
    actionsByInstance = (/* componentActions, props */) => {};
    detach = detach;
    PointerAction = PointerAction;
    Action = Action;
    Slots = Slots;
    _components = components;
    _actions = actionsByInstance;

    constructor(instance: string = '', name: string = '') {
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

    public static addMethod(name: string, body: (...args: unknown[]) => unknown) {
      // @ts-ignore
      additionalMethods[name] = body;
    }

    public onDestroy(fn: Callback) {
      this.destroyable.push(fn);
    }

    public onChange(fn: OnChangeCallback) {
      this.onChangeFunctions.push(fn);
    }

    public update(callback: Callback) {
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
    public reuseComponents(
      currentComponents: ComponentInstance[],
      dataArray: unknown[],
      getProps: GetPropsFn,
      component: Component,
      leaveTail = true,
      debug = false
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
          modified.push(newComponent);
          diff--;
        }
      } else if (currentLen > dataLen) {
        let diff = currentLen - dataLen;
        if (leaveTail) {
          leave = true;
          leaveStartingAt = currentLen - diff;
        } else {
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
      if (debug) console.log('modified components', modified);
      if (debug) console.log('current components', currentComponents);
      if (debug) console.log('data array', dataArray);
      for (const component of currentComponents) {
        const data = dataArray[index];
        if (debug) console.log(`reuse components data at '${index}'`, data);
        if (component && !modified.includes(component)) {
          if (debug) console.log('getProps fn result', getProps(data));
          component.change(getProps(data), { leave: leave && index >= leaveStartingAt });
        }
        index++;
      }
    }

    public createComponent(component: Component, props: unknown = {}): ComponentInstance {
      const instance = component.name + ':' + componentId++;
      let vidoInstance;
      vidoInstance = new VidoInstance(instance, component.name);
      const publicMethods = new PublicComponentMethods(instance, vidoInstance, props);
      const internalMethods = new InternalComponentMethods(
        instance,
        vidoInstance,
        component(vidoInstance as AnyVido, props)
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

    public destroyComponent(instance: string, vidoInstance: VidoInstance) {
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

    private executeActions() {
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
              if (
                (create.prototype &&
                  (create.prototype.isAction || create.prototype.update || create.prototype.destroy)) ||
                create.isAction
              ) {
                result = new create(action.element, action.props);
              } else {
                result = create(action.element, action.props);
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

    private updateTemplate(callback: (() => void) | undefined = undefined) {
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
            resolve(null);
          }
        }
        resolved.then(flush);
      });
    }

    public createApp(config: CreateAppConfig): ComponentInstance {
      element = config.element;
      const App = this.createComponent(config.component, config.props);
      app = App.instance;
      this.render();
      return App;
    }

    public render(): void {
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

Vido.lithtml = lithtml;
Vido.Action = Action;
Vido.Directive = Directive;
Vido.StyleMap = StyleMap;
Vido.PointerAction = PointerAction;
Vido.Slots = Slots;

Vido.directives = {
  schedule,
  detach,
  styleMap,
  classMap,
  asyncAppend,
  asyncReplace,
  cache,
  guard,
  live,
  ifDefined,
  repeat,
  unsafeHTML,
  until,
  when,
  choose,
  map,
  join,
  range,
  keyed,
  templateContent,
  unsafeSVG,
  ref,
};

const lit = lithtml;

export {
  vido,
  lithtml,
  lit,
  Action,
  schedule,
  detach,
  styleMap,
  StyleMap,
  classMap,
  PointerAction,
  asyncAppend,
  asyncReplace,
  cache,
  guard,
  ifDefined,
  repeat,
  unsafeHTML,
  until,
  when,
  choose,
  map,
  join,
  range,
  keyed,
  templateContent,
  unsafeSVG,
  ref,
  Slots,
  helpers,
  ClassInfo,
  StyleInfo,
  htmlResult,
  UpdateTemplate,
  Component,
  ComponentInstance,
  CreateAppConfig,
  OnChangeCallback,
  Callback,
  GetPropsFn,
  AnyVido,
};
