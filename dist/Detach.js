import { Directive } from 'lit-html-optimised';
const detached = new WeakMap();
export default class Detach extends Directive {
    constructor(ifFn) {
        super();
        this.ifFn = ifFn;
    }
    body(part) {
        const detach = this.ifFn();
        const element = part.committer.element;
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
    }
}
