import { Directive, Part, AttributePart } from 'lit-html/directive';
import { PropertiesHyphenFallback as CSSProp } from 'csstype';
export default class StyleMap extends Directive {
    style: CSSProp;
    private previous;
    private detach;
    private toRemove;
    private toUpdate;
    private debug;
    update(part: AttributePart, props: unknown[]): void;
    render(styleMap: CSSProp, detach?: boolean): void;
    setStyle(styleInfo: CSSProp): void;
    setDebug(debug?: boolean): void;
    setDetach(detach: boolean): void;
    body(part: Part): void;
}
