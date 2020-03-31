import { Directive, Part } from 'lit-html-optimised';
import { PropertiesHyphenFallback as CSSProp } from 'csstype';
export default class StyleMap extends Directive {
    style: CSSProp;
    private previous;
    private detach;
    constructor(styleInfo: CSSProp, detach?: boolean);
    setStyle(styleInfo: CSSProp): void;
    setDetach(detach: any): void;
    body(part: Part): void;
}
