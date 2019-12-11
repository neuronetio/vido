import { AttributePart, Directive } from 'lit-html-optimised';

const detached = new WeakMap();

export default class Detach extends Directive {
  private ifFn: () => boolean;

  constructor(ifFn: () => boolean) {
    super();
    this.ifFn = ifFn;
  }

  public body(part: AttributePart) {
    const detach = this.ifFn();
    const element = part.committer.element;
    if (detach) {
      if (!detached.has(part)) {
        const nextSibling = element.nextSibling;
        detached.set(part, { element, nextSibling });
      }
      element.remove();
    } else {
      const data = detached.get(part);
      if (typeof data !== 'undefined' && data !== null) {
        data.nextSibling.parentNode.insertBefore(data.element, data.nextSibling);
        detached.delete(part);
      }
    }
  }
}
