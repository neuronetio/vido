import { AttributePart } from 'lit-html/directive';
import { StyleInfo } from './vido';
export default class StyleMap {
    private toRemove;
    private toUpdate;
    private previousStyle;
    style: StyleInfo;
    private _directive;
    constructor(styleInfo: any);
    directive(): void;
    setStyle(styleInfo: any): void;
    toString(): string;
    execute(part: AttributePart): void;
}
