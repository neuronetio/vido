import { render, html, directive, svg, AttributeCommitter } from 'lit-html';
import { asyncAppend } from 'lit-html/directives/async-append';
import { asyncReplace } from 'lit-html/directives/async-replace';
import { cache } from 'lit-html/directives/cache';
import { classMap } from 'lit-html/directives/class-map';
import { guard } from 'lit-html/directives/guard';
import { ifDefined } from 'lit-html/directives/if-defined';
import { repeat } from 'lit-html/directives/repeat';
import { styleMap } from 'lit-html/directives/style-map';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { until } from 'lit-html/directives/until';

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
  const previousStyle = new WeakMap();

  /**
   * Get actions for component instance as directives
   *
   * @param {string} instance
   * @returns {function} directive that will execute actions
   */
  function getActions(instance) {
    return directive(function actionsByInstanceDirective(createFunctions, props = {}) {
      return function partial(part) {
        const element = part.committer.element;
        for (const create of createFunctions) {
          if (typeof create === 'function') {
            let exists;
            if (actionsByInstance.has(instance)) {
              for (const action of actionsByInstance.get(instance)) {
                if (action.componentAction.create === create && action.element === element) {
                  exists = action;
                  break;
                }
              }
            }
            if (!exists) {
              if (typeof element.vido !== 'undefined') delete element.vido;
              const componentAction = { create, update() {}, destroy() {} };
              const action = { instance, componentAction, element, props };
              let byInstance = [];
              if (actionsByInstance.has(instance)) {
                byInstance = actionsByInstance.get(instance);
              }
              byInstance.push(action);
              actionsByInstance.set(instance, byInstance);
            } else {
              exists.props = props;
            }
          }
        }
      };
    });
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
     *
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
  //vido.prototype.styleMap = styleMap;
  vido.prototype.unsafeHTML = unsafeHTML;
  vido.prototype.until = until;
  vido.prototype.schedule = schedule;
  vido.prototype.actionsByInstance = (componentActions, props) => {};
  vido.prototype.styleMap = directive((styleInfo) => (part) => {
    const style = part.committer.element.style;
    let previous = previousStyle.get(part);
    if (previous === undefined) {
      previous = {};
    }
    for (const name in styleInfo) {
      const value = styleInfo[name];
      if (previous[name] !== undefined && previous[name] === value) {
        continue;
      }
      if (!name.includes('-')) {
        try {
          style[name] = value;
        } catch (e) {
          style.setProperty(name, value);
        }
      } else {
        style.setProperty(name, value);
      }
    }
    previousStyle.set(part, { ...styleInfo });
  });
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
    vidoInstance.actions = getActions(instance);
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
    shouldUpdateCount++;
    const currentShouldUpdateCount = shouldUpdateCount;
    const self = this;
    resolved.then(function flush() {
      if (currentShouldUpdateCount === shouldUpdateCount) {
        self.render();
        shouldUpdateCount = 0;
        if (self.debug) {
          console.groupCollapsed('templates updated');
          console.trace();
          console.groupEnd();
        }
      }
    });
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
        if (typeof action.element.vido === 'undefined') {
          if (typeof action.componentAction.create === 'function') {
            const result = action.componentAction.create(action.element, action.props);
            if (this.debug) {
              console.groupCollapsed(`create action executed ${action.instance}`);
              console.log(clone({ components: components.keys(), action, actionsByInstance }));
              console.trace();
              console.groupEnd();
            }
            if (typeof result !== 'undefined') {
              if (typeof result === 'function') {
                action.componentAction.destroy = result;
              } else {
                if (typeof result.update === 'function') {
                  action.componentAction.update = result.update;
                }
                if (typeof result.destroy === 'function') {
                  action.componentAction.destroy = result.destroy;
                }
              }
            }
          }
        } else {
          action.element.vido = action.props;
          if (typeof action.componentAction.update === 'function') {
            action.componentAction.update(action.element, action.props);
            if (this.debug) {
              console.groupCollapsed(`update action executed ${action.instance}`);
              console.log(clone({ components: components.keys(), action, actionsByInstance }));
              console.trace();
              console.groupEnd();
            }
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
