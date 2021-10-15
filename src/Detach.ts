import { nothing } from 'lit-html';
import { AttributePart, directive, Directive } from 'lit-html/directive';

const detached: WeakMap<AttributePart, ElementData> = new WeakMap();

export interface ElementData {
  element: Element;
  nextSibling: ChildNode | Node | null;
  previousSibling: ChildNode | Node | null;
  parent: (Node & ParentNode) | null;
}

export class Detach extends Directive {
  render() {
    return nothing;
  }

  update(part: AttributePart, props: unknown[]) {
    if (typeof props[0] !== 'function') {
      throw new Error('[vido] Detach directive argument should be a function.');
    }
    const detach = props[0]();
    const element: Element = part.element;
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
    } else {
      const data = detached.get(part);
      if (data) {
        if (data.nextSibling && data.nextSibling.parentNode) {
          data.nextSibling.parentNode.insertBefore(data.element, data.nextSibling);
        } else if (data.previousSibling && data.previousSibling.parentNode) {
          data.previousSibling.parentNode.appendChild(data.element);
        } else if (data.parent) {
          data.parent.appendChild(data.element);
        }
        detached.delete(part);
      }
    }
    return this.render();
  }
}

const detach = directive(Detach);

export default detach;
