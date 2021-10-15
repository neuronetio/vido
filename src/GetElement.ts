import { AttributePart, Directive } from 'lit-html/directive';

export default class GetElementDirective extends Directive {
  update(part: AttributePart, props: unknown[]) {
    const callback = props[0];
    if (typeof callback !== 'function') {
      throw new Error('[vido] Argument for getElement directive should be a function.');
    }
    callback(part.element);
  }

  render() {
    return null;
  }
}
