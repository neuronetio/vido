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
  until
};

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

/**
 * Vido library
 *
 * @param {any} state - state management for the view (can be anything)
 * @param {any} api - some api's or other globally available services
 * @returns {object} vido instance
 */
export default function Vido(state, api) {
  let componentId = 0;
  const components = new Map();
  let actionsByInstance = new Map();
  let app, element;
  let shouldUpdateCount = 0;
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

  /**
   * Create vido instance for component
   */
  function vido() {
    this.destroyable = [];
    this.onChangeFunctions = [];
    this.debug = false;
    this.state = state;
    this.api = api;
    this.lastProps = {};
    this.reuseComponents = this.reuseComponents.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
    this.onChange = this.onChange.bind(this);
    this.update = this.update.bind(this);
    for (const name in additionalMethods) {
      this[name] = additionalMethods[name];
    }
  }

  vido.prototype.html = html;
  vido.prototype.svg = svg;
  vido.prototype.directive = directive;
  vido.prototype.asyncAppend = asyncAppend;
  vido.prototype.asyncReplace = asyncReplace;
  vido.prototype.cache = cache;
  vido.prototype.classMap = classMap;
  vido.prototype.guard = guard;
  vido.prototype.ifDefined = ifDefined;
  vido.prototype.repeat = repeat;
  vido.prototype.unsafeHTML = unsafeHTML;
  vido.prototype.until = until;
  vido.prototype.schedule = schedule;
  vido.prototype.actionsByInstance = (componentActions, props) => {};
  vido.prototype.StyleMap = StyleMap;
  vido.prototype.Detach = Detach;
  vido.prototype.PointerAction = PointerAction;
  vido.prototype.addMethod = function addMethod(name: string, body: (...args: unknown[]) => unknown) {
    additionalMethods[name] = body;
  };

  vido.prototype.Action = Action;

  vido.prototype.onDestroy = function onDestroy(fn) {
    this.destroyable.push(fn);
  };
  vido.prototype.onChange = function onChange(fn) {
    this.onChangeFunctions.push(fn);
  };
  vido.prototype.update = function update() {
    this.updateTemplate();
  };

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
  vido.prototype.reuseComponents = function reuseComponents(
    currentComponents,
    dataArray,
    getProps,
    component,
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
      if (!modified.includes(component.instance)) {
        component.change(getProps(item), { leave: leave && index >= leaveStartingAt });
      }
      index++;
    }
    return currentComponents;
  };

  const InternalComponentMethods = getInternalComponentMethods(components, actionsByInstance, clone);

  /**
   * Create component
   *
   * @param {function} component
   * @param {any} props
   * @returns {object} component instance methods
   */
  function createComponent(component, props = {}, content = null) {
    const instance = component.name + ':' + componentId++;
    let vidoInstance;
    vidoInstance = new vido();
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
  vido.prototype.createComponent = createComponent;

  class Slot extends Directive {
    private components = [];

    constructor(components: unknown, props: unknown, content: any = null) {
      super();
      if (Array.isArray(components)) {
        for (const component of components) {
          this.components.push(createComponent(component, props, content));
        }
      }
    }

    public body(part: NodePart) {
      part.setValue(this.components.map((component) => component.html()));
    }

    public change(changedProps: unknown, options: any) {
      for (const component of this.components) {
        component.change(changedProps, options);
      }
    }

    public getComponents() {
      return this.components;
    }

    public setComponents(components: unknown[]) {
      this.components = components;
    }

    public destroy() {
      for (const component of this.components) {
        component.destroy();
      }
    }
  }
  vido.prototype.Slot = Slot;

  class Slots {
    private slots = {};

    public addSlot(name: string, slot: unknown) {
      if (this.slots[name] === undefined) {
        this.slots[name] = [];
      }
      this.slots[name].push(slot);
    }

    public change(changedProps: unknown, options: any) {
      for (const name in this.slots) {
        for (const slot of this.slots[name]) {
          slot.change(changedProps, options);
        }
      }
    }

    public destroy() {
      for (const name in this.slots) {
        for (const slot of this.slots[name]) {
          slot.destroy();
        }
      }
    }

    public get(name: string) {
      return this.slots[name];
    }

    public set(name: string, value: unknown) {
      this.slots[name] = value;
    }
  }
  vido.prototype.Slots = Slots;

  /**
   * Destroy component
   *
   * @param {string} instance
   * @param {object} vidoInstance
   */
  vido.prototype.destroyComponent = function destroyComponent(instance, vidoInstance) {
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
    components.get(instance).destroy();
    components.delete(instance);
    if (vidoInstance.debug) {
      console.groupCollapsed(`component destroyed ${instance}`);
      console.log(clone({ components: components.keys(), actionsByInstance }));
      console.trace();
      console.groupEnd();
    }
  };

  /**
   * Update template - trigger render proccess
   * @param {object} vidoInstance
   */
  vido.prototype.updateTemplate = function updateTemplate() {
    const currentShouldUpdateCount = ++shouldUpdateCount;
    const self = this;
    function flush() {
      if (currentShouldUpdateCount === shouldUpdateCount) {
        shouldUpdateCount = 0;
        self.render();
      }
    }
    resolved.then(flush);
  };

  /**
   * Create app
   *
   * @param config
   * @returns {object} component instance methods
   */
  vido.prototype.createApp = function createApp(config) {
    element = config.element;
    const App = this.createComponent(config.component, config.props);
    app = App.instance;
    this.render();
    return App;
  };

  /**
   * Execute actions
   */
  vido.prototype.executeActions = function executeActions() {
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
  };

  /**
   * Render view
   */
  vido.prototype.render = function renderView() {
    render(components.get(app).update(), element);
    this.executeActions();
  };

  return new vido();
}
