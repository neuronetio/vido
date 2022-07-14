import { AttributePart, Directive } from 'lit-html/directive.js';
export interface ElementData {
    element: Element;
    nextSibling: ChildNode | Node | null;
    previousSibling: ChildNode | Node | null;
    parent: (Node & ParentNode) | null;
}
export declare class Detach extends Directive {
    render(shouldDetach: boolean): symbol;
    update(part: AttributePart, props: unknown[]): symbol;
}
declare const detach: (shouldDetach: boolean) => import("lit-html/directive.js").DirectiveResult<typeof Detach>;
export default detach;
