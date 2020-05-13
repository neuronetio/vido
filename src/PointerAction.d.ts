import Action from './Action';
export interface Options {
    element?: HTMLElement;
    axis?: string;
    threshold?: number;
    onDown?: (data: any) => void;
    onMove?: (data: any) => void;
    onUp?: (data: any) => void;
    onWheel?: (data: any) => void;
}
export default class PointerAction extends Action {
    private id;
    private moving;
    private initialX;
    private initialY;
    private lastY;
    private lastX;
    private element;
    private options;
    constructor(element: any, data: any);
    private normalizeMouseWheelEvent;
    onWheel(event: any): void;
    private normalizePointerEvent;
    private onPointerDown;
    private handleX;
    private handleY;
    private onPointerMove;
    private onPointerUp;
    destroy(element: any): void;
}
//# sourceMappingURL=PointerAction.d.ts.map