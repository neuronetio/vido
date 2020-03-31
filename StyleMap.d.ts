import { Directive, Part } from 'lit-html-optimised';
import { Properties as CSSProp } from 'csstype';
export interface StyleInfo {
    [key: string]: string;
}
export default class StyleMap extends Directive {
    style: CSSProp;
    private previous;
    private detach;
    constructor(styleInfo: StyleInfo, detach?: boolean);
    setStyle(styleInfo: StyleInfo): void;
    setDetach(detach: any): void;
    body(part: Part): void;
}
