import { AttributePart, Directive } from 'lit-html/directive';
export interface ElementData {
    element: Element;
    nextSibling: ChildNode | Node | null;
    previousSibling: ChildNode | Node | null;
    parent: (Node & ParentNode) | null;
}
export default class Detach extends Directive {
    private ifFn;
    set(ifFn: () => boolean): void;
    render(): symbol;
    update(part: AttributePart): symbol;
}
