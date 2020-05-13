import { AttributePart, Directive } from 'lit-html-optimised';
export interface ElementData {
    element: Element;
    nextSibling: Node;
    previousSibling: Node;
    parent: Node;
}
export default class Detach extends Directive {
    private ifFn;
    constructor(ifFn: () => boolean);
    body(part: AttributePart): void;
}
