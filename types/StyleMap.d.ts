import { Directive, Part } from 'lit-html-optimised';
import { PropertiesHyphenFallback as CSSProp } from 'csstype';
export default class StyleMap extends Directive {
    style: CSSProp;
    private previous;
    private detach;
    private toRemove;
    private toUpdate;
    private debug;
    constructor(styleInfo: CSSProp, detach?: boolean);
    setStyle(styleInfo: CSSProp): void;
    setDebug(debug?: boolean): void;
    setDetach(detach: any): void;
    body(part: Part): void;
}
