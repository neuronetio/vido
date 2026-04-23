import { Directive } from 'lit-html/directive.js';
import { nothing } from 'lit-html';
export default function getActionsCollector(actionsByInstance) {
    return class ActionsCollector extends Directive {
        update(part, props) {
            const element = part.element;
            const instance = props[0];
            const userActions = props[1];
            const actionProps = props[2];
            for (const userAction of userActions) {
                if (typeof userAction !== 'undefined') {
                    const currentActions = actionsByInstance.get(instance);
                    let exists;
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
                            // we need to remove old action if element differs, otherwise it may cause memory leaks and unexpected behavior
                            exists.componentAction.destroy(exists.element, exists.props);
                            actionsByInstance.set(instance, currentActions.filter((action) => action !== exists));
                        }
                        // @ts-ignore
                        if (typeof element.vido !== 'undefined')
                            delete element.vido;
                        const componentAction = {
                            create: userAction,
                            update(el, props) { },
                            destroy(el, props) { },
                        };
                        const newAction = {
                            instance: instance,
                            componentAction,
                            element,
                            props: actionProps,
                            created: false,
                        };
                        let byInstance = [];
                        if (actionsByInstance.has(instance)) {
                            byInstance = actionsByInstance.get(instance);
                        }
                        byInstance.push(newAction);
                        actionsByInstance.set(instance, byInstance);
                    }
                    else {
                        exists.props = actionProps;
                    }
                }
            }
        }
        render(instance, actions, props) {
            return nothing;
        }
    };
}
