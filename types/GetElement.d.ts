import { AttributePart } from 'lit-html-optimised';
import { DirectiveFactory } from 'lit-html-optimised/lib/directive';
export default function prepareGetElement(directive: <F extends DirectiveFactory>(f: F) => F): (callback: (element: Element) => void) => (part: AttributePart) => void;
