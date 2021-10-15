import { Directive, AttributePart } from 'lit-html/directive';
import { nothing } from 'lit-html';

export default function getActionsCollector(actionsByInstance: Map<string, any>) {
  return class ActionsCollector extends Directive {
    public update(part: AttributePart, props: unknown[]) {
      const element = part.element;
      const instance = props[0] as string;
      const actions = props[1] as unknown[];
      const actionProps = props[2] as object;

      for (const create of actions) {
        if (typeof create !== 'undefined') {
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
            // @ts-ignore
            if (typeof element.vido !== 'undefined') delete element.vido;
            const componentAction = {
              create,
              update() {},
              destroy() {},
            };
            const action = { instance: instance, componentAction, element, props: actionProps };
            let byInstance = [];
            if (actionsByInstance.has(instance)) {
              byInstance = actionsByInstance.get(instance);
            }
            byInstance.push(action);
            actionsByInstance.set(instance, byInstance);
          } else {
            exists.props = actionProps;
          }
        }
      }
    }

    render(instance: string, actions: any[], props: object) {
      return nothing;
    }
  };
}
