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

export default function Vido(state, api) {
  let componentId = 0;
  const components = {};
  let actions = [];

  let app, element;

  let shouldUpdateCount = 0;
  const resolved = Promise.resolve();

  function getActions(instance) {
    return directive(function actionsDirective(createFunctions, props) {
      return function partial(part) {
        const element = part.committer.element;
        for (const create of createFunctions) {
          if (typeof create === 'function') {
            const exists = actions.find(
              action =>
                action.instance === instance && action.componentAction.create === create && action.element === element
            );
            if (!exists) {
              if (typeof element.__vido__ !== 'undefined') delete element.__vido__;
              const componentAction = { create, update() {}, destroy() {} };
              actions.push({ instance, componentAction, element, props });
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
    actions(componentActions, props) {},
    onDestroy() {},
    onChange(props) {},

    createComponent(component, props) {
      const instance = componentId++;
      let vidoInstance;
      function update() {
        vido.updateTemplate(vidoInstance);
      }
      const destroyable = [];
      function onDestroy(fn) {
        destroyable.push(fn);
      }
      const onChangeFunctions = [];
      function onChange(fn) {
        onChangeFunctions.push(fn);
      }
      vidoInstance = { ...vido, update, onDestroy, onChange, instance, actions: getActions(instance) };
      const componentInstanceMethods = getComponentInstanceMethods(instance, vidoInstance);
      const methods = {
        instance,
        vidoInstance,
        destroy() {
          for (const d of destroyable) {
            d();
          }
        },
        update: component(vidoInstance, props),
        change(changedProps) {
          for (const prop in props) {
            if (changedProps[prop] === props[prop]) {
              return;
            }
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
        console.log(instance, component, props, components);
        console.trace();
        console.groupEnd();
      }
      return componentInstanceMethods;
    },

    destroyComponent(instance, vidoInstance) {
      if (typeof components[instance].destroy === 'function') {
        components[instance].destroy();
      }
      actions = actions.filter(action => {
        if (action.instance === instance && typeof action.componentAction.destroy === 'function') {
          action.componentAction.destroy(action.element, action.props);
        }
        return action.instance !== instance;
      });
      delete components[instance];
      if (vidoInstance.debug) {
        console.groupCollapsed(`component destroyed ${instance}`);
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
              console.log(action);
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
              console.log(action);
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

  function getComponentInstanceMethods(instance, vidoInstance) {
    return {
      instance,
      vidoInstance,
      destroy() {
        if (vidoInstance.debug) {
          console.groupCollapsed(`destroying component ${instance}`);
          console.log(instance, components[instance], components);
          console.trace();
          console.groupEnd();
        }

        return vido.destroyComponent(instance, vidoInstance);
      },
      update() {
        if (vidoInstance.debug) {
          console.groupCollapsed(`updating component ${instance}`);
          console.log(instance, components[instance], components);
          console.trace();
          console.groupEnd();
        }
        return vido.updateTemplate(vidoInstance);
      },

      change(props) {
        if (vidoInstance.debug) {
          console.groupCollapsed(`changing component ${instance}`);
          console.log(props, instance, components[instance], components);
          console.trace();
          console.groupEnd();
        }
        components[instance].change(props, vidoInstance);
      },

      html(props = {}) {
        return components[instance].update(props, vidoInstance);
      }
    };
  }

  return vido;
}
