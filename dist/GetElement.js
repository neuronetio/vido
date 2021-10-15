import { nothing } from 'lit-html';
import { Directive } from 'lit-html/directive';
export default class GetElementDirective extends Directive {
    update(part, props) {
        if (typeof props[0] !== 'function') {
            throw new Error('[vido] GetElementDirective argument should be a function.');
        }
        const callback = props[0];
        callback(part.element);
    }
    render() {
        return nothing;
    }
}
