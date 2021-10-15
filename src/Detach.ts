import { nothing } from 'lit-html';
import { AttributePart, Directive } from 'lit-html/directive';

const detached: WeakMap<AttributePart, ElementData> = new WeakMap();

export interface ElementData {
  element: Element;
  nextSibling: ChildNode | Node | null;
  previousSibling: ChildNode | Node | null;
  parent: (Node & ParentNode) | null;
}

export default class Detach extends Directive {
  private ifFn: () => boolean = () => false;

  set(ifFn: () => boolean) {
    this.ifFn = ifFn;
  }

  render() {
    return nothing;
  }

  update(part: AttributePart) {
    const detach = this.ifFn();
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
