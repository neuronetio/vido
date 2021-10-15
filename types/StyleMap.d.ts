import { AttributePart } from 'lit-html/directive.js';
import { StyleInfo } from './vido';
export declare class StyleMap {
    private toRemove;
    private toUpdate;
    private previousStyle;
    style: StyleInfo;
    private _directive;
    constructor(styleInfo: any);
    directive(): any;
    setStyle(styleInfo: any): void;
    toString(): string;
    execute(part: AttributePart): void;
}
