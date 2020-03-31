import { AttributePart, Directive } from 'lit-html-optimised';
export default class Detach extends Directive {
    private ifFn;
    constructor(ifFn: () => boolean);
    body(part: AttributePart): void;
}
