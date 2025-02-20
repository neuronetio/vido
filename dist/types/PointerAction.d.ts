import Action from './Action';
export type EventToNormalize = PointerEvent | TouchEvent | WheelEvent | Event;
export interface Options {
    element?: HTMLElement;
    axis?: string;
    threshold?: number;
    onDown?: (data: NormalizedEvent) => void;
    onMove?: (data: NormalizedEvent) => void;
    onUp?: (data: NormalizedEvent) => void;
    onWheel?: (data: NormalizedEvent) => void;
}
export interface InternalOptions extends Options {
    element: HTMLElement;
    axis: string;
    threshold: number;
    onDown: (data: NormalizedEvent) => void;
    onMove: (data: NormalizedEvent) => void;
    onUp: (data: NormalizedEvent) => void;
    onWheel: (data: NormalizedEvent) => void;
}
export interface Props {
    pointerOptions: InternalOptions;
    [key: string]: unknown;
}
export interface NormalizedEvent {
    x: number;
    y: number;
    z?: number;
    pageX?: number;
    pageY?: number;
    clientX?: number;
    clientY?: number;
    screenX?: number;
    screenY?: number;
    movementX?: number;
    movementY?: number;
    initialX?: number;
    initialY?: number;
    lastX?: number;
    lastY?: number;
    event: Event;
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
    constructor(element: Element, data: Props);
    private normalizeMouseWheelEvent;
    onWheel(event: WheelEvent): void;
    private normalizePointerEvent;
    private onPointerDown;
    private handleX;
    private handleY;
    private onPointerMove;
    private onPointerUp;
    destroy(element: Element): void;
}
