import { render, html, directive, svg } from 'lit-html';
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
 * Helper function to determine if specified variable is an object
 *
 * @param {any} item
 *
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Helper function which will merge objects recursively - creating brand new one - like clone
 *
 * @param {object} target
 * @params {object} sources
 *
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

function clone(source) {
  if (typeof source.actions !== 'undefined') {
    const actns = source.actions.map(action => {
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

export default function Vido(state, api) {
  let componentId = 0;
  const components = {};
  let actions = [];
  let actionsByInstance = {};

  let app, element;

  let shouldUpdateCount = 0;
  const resolved = Promise.resolve();

  function getActions(instance) {
    return directive(function actionsDirective(createFunctions, props) {
      return function partial(part) {
        const element = part.committer.element;
        for (const create of createFunctions) {
          if (typeof create === 'function') {
            let exists;
            if (typeof actionsByInstance[instance] !== 'undefined')
              for (const action of actionsByInstance[instance]) {
                if (action.componentAction.create === create && action.element === element) {
                  exists = action;
                  break;
                }
              }
            if (!exists) {
              if (typeof element.__vido__ !== 'undefined') delete element.__vido__;
              const componentAction = { create, update() {}, destroy() {} };
              const action = { instance, componentAction, element, props };
              actions.push(action);
              if (typeof actionsByInstance[instance] === 'undefined') {
                actionsByInstance[instance] = [];
              }
              actionsByInstance[instance].push(action);
            } else {
              exists.props = props;
            }
          }
        }
      };
    });
  }

  const vido = {
    debug: false,
    state,
    api,
    html,
    svg,
    directive,
    asyncAppend,
    asyncReplace,
    cache,
    classMap,
    guard,
    ifDefined,
    repeat,
    styleMap,
    unsafeHTML,
    until,
    lastProps: {},
    actions(componentActions, props) {},
    onDestroy() {},
    onChange(props) {},

    /**
     * Reuse existing components when your data was changed
     *
     * @param {array} currentComponents - array of components
     * @param {array} dataArray  - any data as array for each component
     * @param {function} getProps - you can pass params to component from array item ( example: item=>({id:item.id}) )
     * @param {function} component - what kind of components do you want to create?
     * @returns {array} of components (with updated/destroyed/created ones)
     */
    reuseComponents(currentComponents, dataArray, getProps, component) {
      const modified = [];
      if (currentComponents.length < dataArray.length) {
        let diff = dataArray.length - currentComponents.length;
        while (diff) {
          const item = dataArray[dataArray.length - diff];
          const newComponent = vido.createComponent(component, getProps(item));
          currentComponents.push(newComponent);
          modified.push(newComponent.instance);
          diff--;
        }
      } else if (currentComponents.length > dataArray.length) {
        let diff = currentComponents.length - dataArray.length;
        while (diff) {
          const index = currentComponents.length - diff;
          modified.push(currentComponents[index].instance);
          currentComponents[index].destroy();
          diff--;
        }
        currentComponents.length = dataArray.length;
      }
      let index = 0;
      for (const component of currentComponents) {
        const item = dataArray[index];
        if (!modified.includes(component.instance)) {
          component.change(getProps(item));
        }
        index++;
      }
      return currentComponents;
    },

    createComponent(component, props) {
      const instance = component.name + ':' + componentId++;
      let vidoInstance;
      function update() {
        vido.updateTemplate(vidoInstance);
      }
      let destroyable = [];
      function onDestroy(fn) {
        destroyable.push(fn);
      }
      let onChangeFunctions = [];
      function onChange(fn) {
        onChangeFunctions.push(fn);
      }
      vidoInstance = {
        ...vido,
        update,
        onDestroy,
        onChange,
        instance,
        actions: getActions(instance),
        lastProps: props
      };
      const componentInstanceMethods = getComponentInstanceMethods(instance, vidoInstance, props);
      const upd = component(vidoInstance, props);
      const methods = {
        instance,
        vidoInstance,
        lastProps: props,
        destroy() {
          if (vidoInstance.debug) {
            console.groupCollapsed(`component destroy method fired ${instance}`);
            console.log(clone({ props, components: Object.keys(components), destroyable, actions }));
            console.trace();
            console.groupEnd();
          }
          for (const d of destroyable) {
            d();
          }
          onChangeFunctions = [];
          destroyable = [];
        },
        update(props) {
          if (vidoInstance.debug) {
            console.groupCollapsed(`component update method fired ${instance}`);
            console.log(clone({ components: Object.keys(components), actions }));
            console.trace();
            console.groupEnd();
          }
          return upd(props);
        },
        change(changedProps) {
          props = changedProps;
          if (vidoInstance.debug) {
            console.groupCollapsed(`component change method fired ${instance}`);
            console.log(
              clone({ props, components: Object.keys(components), onChangeFunctions, changedProps, actions })
            );
            console.trace();
            console.groupEnd();
          }
          for (const fn of onChangeFunctions) {
            fn(changedProps);
          }
        }
      };
      components[instance] = methods;
      components[instance].change(props);
      if (vidoInstance.debug) {
        console.groupCollapsed(`component created ${instance}`);
        console.log(clone({ props, components: Object.keys(components), actions }));
        console.trace();
        console.groupEnd();
      }
      return componentInstanceMethods;
    },

    destroyComponent(instance, vidoInstance) {
      if (vidoInstance.debug) {
        console.groupCollapsed(`destroying component ${instance}...`);
        console.log(clone({ components: Object.keys(components), actions }));
        console.trace();
        console.groupEnd();
      }
      actions = actions.filter(action => {
        if (action.instance === instance && typeof action.componentAction.destroy === 'function') {
          action.componentAction.destroy(action.element, action.props);
        }
        return action.instance !== instance;
      });
      delete actionsByInstance[instance];
      components[instance].destroy();
      delete components[instance];
      if (vidoInstance.debug) {
        console.groupCollapsed(`component destroyed ${instance}`);
        console.log(clone({ components: Object.keys(components), actions }));
        console.trace();
        console.groupEnd();
      }
    },

    updateTemplate(vidoInstance) {
      shouldUpdateCount++;
      const currentShouldUpdateCount = shouldUpdateCount;
      const self = this;
      resolved.then(function flush() {
        if (currentShouldUpdateCount === shouldUpdateCount) {
          self.render();
          shouldUpdateCount = 0;
          if (vidoInstance.debug) {
            console.groupCollapsed('templates updated');
            console.trace();
            console.groupEnd();
          }
        }
      });
    },

    createApp(instance, el) {
      element = el;
      const App = this.createComponent(instance);
      app = App.instance;
      this.render();
      return App;
    },

    executeActions() {
      for (const action of actions) {
        if (typeof action.element.__vido__ === 'undefined') {
          if (typeof action.componentAction.create === 'function') {
            const result = action.componentAction.create(action.element, action.props);
            if (vido.debug) {
              console.groupCollapsed(`create action executed ${action.instance}`);
              console.log(clone({ components: Object.keys(components), action, actions }));
              console.trace();
              console.groupEnd();
            }
            if (typeof result !== 'undefined') {
              if (typeof result.update === 'function') {
                action.componentAction.update = result.update;
              }
              if (typeof result.destroy === 'function') {
                action.componentAction.destroy = result.destroy;
              }
            }
          }
        } else {
          if (typeof action.componentAction.update === 'function') {
            action.componentAction.update(action.element, action.props);
            if (vido.debug) {
              console.groupCollapsed(`update action executed ${action.instance}`);
              console.log(clone({ components: Object.keys(components), action, actions }));
              console.trace();
              console.groupEnd();
            }
          }
        }
      }
      for (const action of actions) {
        action.element.__vido__ = { instance: action.instance, props: action.props };
      }
    },

    render() {
      render(components[app].update(), element);
      vido.executeActions();
    }
  };

  function getComponentInstanceMethods(instance, vidoInstance, props) {
    return {
      instance,
      vidoInstance,
      props,
      destroy() {
        if (vidoInstance.debug) {
          console.groupCollapsed(`destroying component ${instance}`);
          console.log(clone({ components: Object.keys(components), actions }));
          console.trace();
          console.groupEnd();
        }
        return vido.destroyComponent(instance, vidoInstance);
      },
      update() {
        if (vidoInstance.debug) {
          console.groupCollapsed(`updating component ${instance}`);
          console.log(clone({ components: Object.keys(components), actions }));
          console.trace();
          console.groupEnd();
        }
        return vido.updateTemplate(vidoInstance);
      },

      change(_props) {
        if (vidoInstance.debug) {
          console.groupCollapsed(`changing component ${instance}`);
          console.log(clone({ props, _props, components: Object.keys(components), actions }));
          console.trace();
          console.groupEnd();
        }
        components[instance].change(_props, vidoInstance);
      },

      html(props = {}) {
        return components[instance].update(props, vidoInstance);
      }
    };
  }

  return vido;
}
