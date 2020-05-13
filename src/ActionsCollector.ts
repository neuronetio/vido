import { Directive, AttributePart } from 'lit-html-optimised';

export default function getActionsCollector(actionsByInstance) {
  return class ActionsCollector extends Directive {
    instance: string;
    actions: unknown[];
    props: unknown;

    constructor(instance) {
      super();
      this.instance = instance;
    }

    public set(actions: unknown[], props: object) {
      this.actions = actions;
      this.props = props;
      // props must be mutable! (do not do this -> {...props})
      // because we will modify action props with onChange and can reuse existin instance
      return this;
    }

    public body(part: AttributePart) {
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
            const componentAction = {
              create,
              update() {},
              destroy() {}
            };
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
  };
}
