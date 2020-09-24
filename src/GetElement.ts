import { AttributePart } from 'lit-html-optimised';
import { DirectiveFactory } from 'lit-html-optimised/lib/directive';

export default function prepareGetElement(directive: <F extends DirectiveFactory>(f: F) => F) {
  return function getElement(callback: (element: Element) => void) {
    return directive(() => (part: AttributePart) => {
      callback(part.committer.element);
    })();
  };
}
