import { AttributePart, Directive } from 'lit-html-optimised';
export interface ElementData {
    element: Element;
    nextSibling: ChildNode | Node | null;
    previousSibling: ChildNode | Node | null;
    parent: (Node & ParentNode) | null;
}
export default class Detach extends Directive {
    private ifFn;
    constructor(ifFn: () => boolean);
    body(part: AttributePart): void;
}
