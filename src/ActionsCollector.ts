import { Directive, AttributePart } from 'lit-html/directive.js';
import { nothing } from 'lit-html';

export interface IAction {
  instance: string;
  componentAction: {
    create: any;
    update: (el: any, props: any) => void;
    destroy: (el: any, props: any) => void;
  };
  element: any;
  props: object;
  isActive?: () => boolean;
  created: boolean;
}

export default function getActionsCollector(actionsByInstance: Map<string, IAction[]>) {
  return class ActionsCollector extends Directive {
    public update(part: AttributePart, props: unknown[]) {
      const element = part.element;
      const instance = props[0] as string;
      const userActions = props[1] as any[];
      const actionProps = props[2] as object;

      for (const userAction of userActions) {
        if (typeof userAction !== 'undefined') {
          const currentActions = actionsByInstance.get(instance);
          let exists: IAction;
          if (currentActions) {
            for (const currentAction of currentActions) {
              if (currentAction.componentAction.create === userAction) {
                exists = currentAction;
                break;
              }
            }
          }
          if (!exists || exists.element !== element) {
            if (exists && exists.created && exists.element !== element) {
              if (!exists.element.isConnected) {
                // we need to remove old action if element is detached
                // because in react it will fire multiple times probably because of hydration
                exists.componentAction.destroy(exists.element, exists.props);
                actionsByInstance.set(
                  instance,
                  currentActions.filter((action) => action !== exists),
                );
              } else {
                // just update and return (probably other element is reused)
                exists.element = element;
                exists.props = actionProps;
                return;
              }
            }
            // @ts-ignore
            if (typeof element.vido !== 'undefined') delete element.vido;
            const componentAction = {
              create: userAction,
              update(el: any, props: any) {},
              destroy(el: any, props: any) {},
            };
            const newAction: IAction = {
              instance: instance,
              componentAction,
              element,
              props: actionProps,
              created: false,
            };
            let byInstance: IAction[] = [];
            if (actionsByInstance.has(instance)) {
              byInstance = actionsByInstance.get(instance);
            }
            byInstance.push(newAction);
            actionsByInstance.set(instance, byInstance);
          } else {
            exists.props = actionProps;
          }
        }
      }
    }

    render(instance: string, actions: IAction[], props: object) {
      return nothing;
    }
  };
}
