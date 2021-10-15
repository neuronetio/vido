import { Directive, Part, AttributePart } from 'lit-html/directive';
import { StyleInfo } from './vido';
export default class StyleMap extends Directive {
    style: StyleInfo;
    private previous;
    private detach;
    private toRemove;
    private toUpdate;
    private debug;
    update(part: AttributePart, props: unknown[]): void;
    render(styleMap: StyleInfo, detach?: boolean): void;
    setStyle(styleInfo: StyleInfo): void;
    setDebug(debug?: boolean): void;
    setDetach(detach: boolean): void;
    body(part: Part): void;
}
