import { render, html, directive, svg, Directive, Part, AttributePart } from 'lit-html';
import { asyncAppend } from 'lit-html/directives/async-append';
import { asyncReplace } from 'lit-html/directives/async-replace';
import { cache } from 'lit-html/directives/cache';
import { classMap } from 'lit-html/directives/class-map';
import { guard } from 'lit-html/directives/guard';
import { ifDefined } from 'lit-html/directives/if-defined';
import { repeat } from 'lit-html/directives/repeat';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { until } from 'lit-html/directives/until';

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
 * Schedule - a throttle function that uses requestAnimationFrame to limit the rate at which a function is called.
 *
 * @param {function} fn
 * @returns {function}
 */
function schedule(fn: (argument) => void | any) {
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

/**
 * Is object - helper function to determine if specified variable is an object
 *
 * @param {any} item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Merge deep - helper function which will merge objects recursively - creating brand new one - like clone
 *
 * @param {object} target
 * @params {object} sources
 * @returns {object}
 */
function mergeDeep(target, ...sources) {
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (typeof target[key] === 'undefined') {
          target[key] = {};
        }
        target[key] = mergeDeep(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        target[key] = [];
        for (let item of source[key]) {
          if (isObject(item)) {
            target[key].push(mergeDeep({}, item));
            continue;
          }
          target[key].push(item);
        }
      } else {
        target[key] = source[key];
      }
    }
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
  if (typeof source.actions !== 'undefined') {
    const actns = source.actions.map((action) => {
      const result = { ...action };
      const props = { ...result.props };
      delete props.state;
      delete props.api;
      delete result.element;
      result.props = props;
      return result;
    });
    source.actions = actns;
  }
  return mergeDeep({}, source);
}

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

  class ActionsCollector extends Directive {
    instance: string;
    actions: unknown[];
    props: unknown;

    constructor(instance) {
      super();
      this.instance = instance;
    }

    set(actions: unknown[], props: object, debug: boolean = false) {
      this.actions = actions;
      this.props = props; // must be mutable! (do not do this {...props})
      // because we will modify action props with onChange and can reuse existin instance
      if (debug) {
        console.log(this);
      }
      return this;
    }

    body(part: AttributePart) {
      const element = part.committer.element as HTMLElement;
      for (const create of this.actions) {
        if (typeof create !== 'undefined') {
          let exists;
          if (actionsByInstance.has(this.instance)) {
            for (const action of actionsByInstance.get(this.instance)) {
              if (action.componentAction.create === create && action.element === element) {
                exists = action;
                break;
              }
            }
          }
          if (!exists) {
            // @ts-ignore
            if (typeof element.vido !== 'undefined') delete element.vido;
            const componentAction = { create, update() {}, destroy() {} };
            const action = { instance: this.instance, componentAction, element, props: this.props };
            let byInstance = [];
            if (actionsByInstance.has(this.instance)) {
              byInstance = actionsByInstance.get(this.instance);
            }
            byInstance.push(action);
            actionsByInstance.set(this.instance, byInstance);
          } else {
            exists.props = this.props;
          }
        }
      }
    }
  }

  class InstanceActionsCollector {
    instance: string;
    constructor(instance: string) {
      this.instance = instance;
    }
    create(actions: unknown[], props: object) {
      const actionsInstance = new ActionsCollector(this.instance);
      actionsInstance.set(actions, props);
      return actionsInstance;
    }
  }

  class PublicComponentMethods {
    instance: string;
    vidoInstance: any;
    props: any;

    constructor(instance, vidoInstance, props = {}) {
      this.instance = instance;
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
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`destroying component ${this.instance}`);
        console.log(clone({ components: components.keys(), actionsByInstance }));
        console.trace();
        console.groupEnd();
      }
      return this.vidoInstance.destroyComponent(this.instance, this.vidoInstance);
    }

    /**
     * Update template - trigger rendering process
     */
    update() {
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`updating component ${this.instance}`);
        console.log(clone({ components: components.keys(), actionsByInstance }));
        console.trace();
        console.groupEnd();
      }
      return this.vidoInstance.updateTemplate(this.vidoInstance);
    }

    /**
     * Change component input properties
     * @param {any} newProps
     */
    change(newProps, options) {
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`changing component ${this.instance}`);
        console.log(clone({ props: this.props, newProps: newProps, components: components.keys(), actionsByInstance }));
        console.trace();
        console.groupEnd();
      }
      components.get(this.instance).change(newProps, options);
    }

    /**
     * Get component lit-html template
     * @param {} templateProps
     */
    html(templateProps = {}) {
      return components.get(this.instance).update(templateProps, this.vidoInstance);
    }
  }

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

  interface StyleInfo {
    [key: string]: string;
  }

  const toRemove = [],
    toUpdate = [];

  class StyleMap extends Directive {
    previous: {};
    style: {};
    detach: boolean;

    constructor(styleInfo: StyleInfo, detach: boolean = false) {
      super();
      this.previous = {};
      this.style = styleInfo;
      this.detach = detach;
    }

    setStyle(styleInfo: StyleInfo) {
      this.style = styleInfo;
    }

    setDetach(detach) {
      this.detach = detach;
    }

    body(part: Part) {
      toRemove.length = 0;
      toUpdate.length = 0;
      // @ts-ignore
      const element = part.committer.element;
      const style = element.style;
      let previous = this.previous;
      for (const name in previous) {
        if (this.style[name] === undefined) {
          toRemove.push(name);
        }
      }
      for (const name in this.style) {
        const value = this.style[name];
        const prev = previous[name];
        if (prev !== undefined && prev === value) {
          continue;
        }
        toUpdate.push(name);
      }

      if (toRemove.length || toUpdate.length) {
        let parent, nextSibling;
        if (this.detach) {
          parent = element.parentNode;
          if (parent) {
            nextSibling = element.nextSibling;
            element.remove();
          }
        }
        for (const name of toRemove) {
          style.removeProperty(name);
        }
        for (const name of toUpdate) {
          const value = this.style[name];
          if (!name.includes('-')) {
            style[name] = value;
          } else {
            style.setProperty(name, value);
          }
        }
        if (this.detach && parent) {
          parent.insertBefore(element, nextSibling);
        }
        this.previous = { ...this.style };
      }
    }
  }

  vido.prototype.StyleMap = StyleMap;

  const detached = new WeakMap();

  class Detach extends Directive {
    ifFn: () => boolean;

    constructor(ifFn: () => boolean) {
      super();
      this.ifFn = ifFn;
    }

    body(part: AttributePart) {
      const detach = this.ifFn();
      const element = part.committer.element;
      if (detach) {
        if (!detached.has(part)) {
          const nextSibling = element.nextSibling;
          detached.set(part, { element, nextSibling });
        }
        element.remove();
      } else {
        const data = detached.get(part);
        if (typeof data !== 'undefined' && data !== null) {
          data.nextSibling.parentNode.insertBefore(data.element, data.nextSibling);
          detached.delete(part);
        }
      }
    }
  }

  vido.prototype.Detach = Detach;

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

  class InternalComponentMethods {
    instance: string;
    vidoInstance: any;
    updateFunction: (changedProps: any) => void;

    constructor(instance, vidoInstance, updateFunction) {
      this.instance = instance;
      this.vidoInstance = vidoInstance;
      this.updateFunction = updateFunction;
    }

    destroy() {
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`component destroy method fired ${this.instance}`);
        console.log(
          clone({
            props: this.vidoInstance.props,
            components: components.keys(),
            destroyable: this.vidoInstance.destroyable,
            actionsByInstance
          })
        );
        console.trace();
        console.groupEnd();
      }
      for (const d of this.vidoInstance.destroyable) {
        d();
      }
      this.vidoInstance.onChangeFunctions = [];
      this.vidoInstance.destroyable = [];
    }

    update(props = {}) {
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`component update method fired ${this.instance}`);
        console.log(clone({ components: components.keys(), actionsByInstance }));
        console.trace();
        console.groupEnd();
      }
      return this.updateFunction(props);
    }

    change(changedProps, options = { leave: false }) {
      const props = changedProps;
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`component change method fired ${this.instance}`);
        console.log(
          clone({
            props,
            components: components.keys(),
            onChangeFunctions: this.vidoInstance.onChangeFunctions,
            changedProps,
            actionsByInstance
          })
        );
        console.trace();
        console.groupEnd();
      }
      for (const fn of this.vidoInstance.onChangeFunctions) {
        fn(changedProps, options);
      }
    }
  }

  /**
   * Create component
   *
   * @param {function} component
   * @param {any} props
   * @returns {object} component instance methods
   */
  vido.prototype.createComponent = function createComponent(component, props = {}) {
    const instance = component.name + ':' + componentId++;
    let vidoInstance;
    vidoInstance = new vido();
    vidoInstance.instance = instance;
    vidoInstance.Actions = new InstanceActionsCollector(instance);
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
  };

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
            if (create.prototype?.update === undefined && create.prototype?.destroy === undefined) {
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
