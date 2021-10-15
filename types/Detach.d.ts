import { AttributePart, Directive } from 'lit-html/directive';
export interface ElementData {
    element: Element;
    nextSibling: ChildNode | Node | null;
    previousSibling: ChildNode | Node | null;
    parent: (Node & ParentNode) | null;
}
export default class Detach extends Directive {
    render(): symbol;
    update(part: AttributePart, props: unknown[]): symbol;
}
