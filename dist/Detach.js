import { nothing } from 'lit-html';
import { directive, Directive } from 'lit-html/directive';
const detached = new WeakMap();
export class Detach extends Directive {
    render(shouldDetach) {
        return nothing;
    }
    update(part, props) {
        if (typeof props[0] !== 'boolean') {
            throw new Error('[vido] Detach directive argument should be a boolean.');
        }
        let detach = props[0];
        const element = part.element;
        if (detach) {
            if (!detached.has(part)) {
                detached.set(part, {
                    element,
                    nextSibling: element.nextSibling,
                    previousSibling: element.previousSibling,
                    parent: element.parentNode,
                });
            }
            element.remove();
        }
        else {
            const data = detached.get(part);
            if (data) {
                if (data.nextSibling && data.nextSibling.parentNode) {
                    data.nextSibling.parentNode.insertBefore(data.element, data.nextSibling);
                }
                else if (data.previousSibling && data.previousSibling.parentNode) {
                    data.previousSibling.parentNode.appendChild(data.element);
                }
                else if (data.parent) {
                    data.parent.appendChild(data.element);
                }
                detached.delete(part);
            }
        }
        return this.render(detach);
    }
}
const detach = directive(Detach);
export default detach;
