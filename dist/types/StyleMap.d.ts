import { AttributePart } from 'lit-html/directive.js';
import { StyleInfo } from './vido';
export declare class StyleMap {
    style: StyleInfo;
    private _directive;
    private schedule;
    private element;
    constructor(styleInfo: any, options?: {
        schedule: boolean;
    });
    directive(): any;
    setStyle(styleInfo: any): void;
    toString(): string;
    _getInternalStyle(): any;
    updateStyle(elementStyle: any, currentElementStyles: any, style: any): void;
    execute(part: AttributePart): void;
}
