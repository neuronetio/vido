import { AttributePart, Directive } from 'lit-html/directive';
export default class GetElementDirective extends Directive {
    update(part: AttributePart, props: unknown[]): void;
    render(): symbol;
}
