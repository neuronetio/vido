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

const defaultOptions = {
  element: document.createTextNode(''),
  axis: 'xy',
  threshold: 10,
  onDown() {},
  onMove() {},
  onUp() {},
  onWheel() {},
};

const pointerEventsExists = typeof PointerEvent !== 'undefined';
let id = 0;

export default class PointerAction extends Action {
  private id: number;
  private moving: string = '';
  private initialX: number = 0;
  private initialY: number = 0;
  private lastY: number = 0;
  private lastX: number = 0;
  private element: Element;
  private options: InternalOptions;

  constructor(element: Element, data: Props) {
    super();
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.element = element;
    this.id = ++id;
    this.options = { ...defaultOptions, ...data.pointerOptions } as InternalOptions;
    if (pointerEventsExists) {
      element.addEventListener('pointerdown', this.onPointerDown);
      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.onPointerUp);
    } else {
      element.addEventListener('touchstart', this.onPointerDown);
      document.addEventListener('touchmove', this.onPointerMove, { passive: false });
      document.addEventListener('touchend', this.onPointerUp);
      document.addEventListener('touchcancel', this.onPointerUp);
      element.addEventListener('mousedown', this.onPointerDown);
      document.addEventListener('mousemove', this.onPointerMove, { passive: false });
      document.addEventListener('mouseup', this.onPointerUp);
    }
  }

  private normalizeMouseWheelEvent(event: EventToNormalize): NormalizedEvent {
    // @ts-ignore
    let x = event.deltaX || 0;
    // @ts-ignore
    let y = event.deltaY || 0;
    // @ts-ignore
    let z = event.deltaZ || 0;
    // @ts-ignore
    const mode = event.deltaMode;
    // @ts-ignore
    const lineHeight = parseInt(getComputedStyle(event.target).getPropertyValue('line-height'));
    let scale = 1;
    switch (mode) {
      case 1:
        scale = lineHeight;
        break;
      case 2:
        // @ts-ignore
        scale = window.height;
        break;
    }
    x *= scale;
    y *= scale;
    z *= scale;
    return { x, y, z, event };
  }

  public onWheel(event: WheelEvent) {
    const normalized = this.normalizeMouseWheelEvent(event);
    this.options.onWheel(normalized);
  }

  private normalizePointerEvent(event: EventToNormalize): NormalizedEvent {
    let result = { x: 0, y: 0, pageX: 0, pageY: 0, clientX: 0, clientY: 0, screenX: 0, screenY: 0, event };
    switch (event.type) {
      case 'wheel':
        const wheel = this.normalizeMouseWheelEvent(event);
        result.x = wheel.x;
        result.y = wheel.y;
        result.pageX = result.x;
        result.pageY = result.y;
        result.screenX = result.x;
        result.screenY = result.y;
        result.clientX = result.x;
        result.clientY = result.y;
        break;
      case 'touchstart':
      case 'touchmove':
      case 'touchend':
      case 'touchcancel':
        result.x = (event as TouchEvent).changedTouches[0].screenX;
        result.y = (event as TouchEvent).changedTouches[0].screenY;
        result.pageX = (event as TouchEvent).changedTouches[0].pageX;
        result.pageY = (event as TouchEvent).changedTouches[0].pageY;
        result.screenX = (event as TouchEvent).changedTouches[0].screenX;
        result.screenY = (event as TouchEvent).changedTouches[0].screenY;
        result.clientX = (event as TouchEvent).changedTouches[0].clientX;
        result.clientY = (event as TouchEvent).changedTouches[0].clientY;
        break;
      default:
        result.x = (event as PointerEvent).x;
        result.y = (event as PointerEvent).y;
        result.pageX = (event as PointerEvent).pageX;
        result.pageY = (event as PointerEvent).pageY;
        result.screenX = (event as PointerEvent).screenX;
        result.screenY = (event as PointerEvent).screenY;
        result.clientX = (event as PointerEvent).clientX;
        result.clientY = (event as PointerEvent).clientY;
        break;
    }
    return result;
  }

  private onPointerDown(event: EventToNormalize) {
    if (event.type === 'mousedown' && (event as MouseEvent).button !== 0) return;
    this.moving = 'xy';
    const normalized = this.normalizePointerEvent(event);
    this.lastX = normalized.x;
    this.lastY = normalized.y;
    this.initialX = normalized.x;
    this.initialY = normalized.y;
    this.options.onDown(normalized);
  }

  private handleX(normalized: NormalizedEvent) {
    let movementX = normalized.x - this.lastX;
    this.lastY = normalized.y;
    this.lastX = normalized.x;
    return movementX;
  }

  private handleY(normalized: NormalizedEvent) {
    let movementY = normalized.y - this.lastY;
    this.lastY = normalized.y;
    this.lastX = normalized.x;
    return movementY;
  }

  private onPointerMove(event: EventToNormalize) {
    if (this.moving === '' || (event.type === 'mousemove' && (event as MouseEvent).button !== 0)) return;
    const normalized = this.normalizePointerEvent(event);
    if (this.options.axis === 'x|y') {
      let movementX = 0,
        movementY = 0;
      if (
        this.moving === 'x' ||
        (this.moving === 'xy' && Math.abs(normalized.x - this.initialX) > this.options.threshold)
      ) {
        this.moving = 'x';
        movementX = this.handleX(normalized);
      }
      if (
        this.moving === 'y' ||
        (this.moving === 'xy' && Math.abs(normalized.y - this.initialY) > this.options.threshold)
      ) {
        this.moving = 'y';
        movementY = this.handleY(normalized);
      }
      this.options.onMove({
        movementX,
        movementY,
        x: normalized.x,
        y: normalized.y,
        initialX: this.initialX,
        initialY: this.initialY,
        lastX: this.lastX,
        lastY: this.lastY,
        event,
      });
    } else if (this.options.axis === 'xy') {
      let movementX = 0,
        movementY = 0;
      if (Math.abs(normalized.x - this.initialX) > this.options.threshold) {
        movementX = this.handleX(normalized);
      }
      if (Math.abs(normalized.y - this.initialY) > this.options.threshold) {
        movementY = this.handleY(normalized);
      }
      this.options.onMove({
        movementX,
        movementY,
        x: normalized.x,
        y: normalized.y,
        initialX: this.initialX,
        initialY: this.initialY,
        lastX: this.lastX,
        lastY: this.lastY,
        event,
      });
    } else if (this.options.axis === 'x') {
      if (
        this.moving === 'x' ||
        (this.moving === 'xy' && Math.abs(normalized.x - this.initialX) > this.options.threshold)
      ) {
        this.moving = 'x';
        // @ts-ignore
        this.options.onMove({
          movementX: this.handleX(normalized),
          movementY: 0,
          initialX: this.initialX,
          initialY: this.initialY,
          lastX: this.lastX,
          lastY: this.lastY,
          event,
        });
      }
    } else if (this.options.axis === 'y') {
      let movementY = 0;
      if (
        this.moving === 'y' ||
        (this.moving === 'xy' && Math.abs(normalized.y - this.initialY) > this.options.threshold)
      ) {
        this.moving = 'y';
        movementY = this.handleY(normalized);
      }
      this.options.onMove({
        movementX: 0,
        movementY,
        x: normalized.x,
        y: normalized.y,
        initialX: this.initialX,
        initialY: this.initialY,
        lastX: this.lastX,
        lastY: this.lastY,
        event,
      });
    }
  }

  private onPointerUp(event: EventToNormalize) {
    this.moving = '';
    const normalized = this.normalizePointerEvent(event);
    this.options.onUp({
      movementX: 0,
      movementY: 0,
      x: normalized.x,
      y: normalized.y,
      initialX: this.initialX,
      initialY: this.initialY,
      lastX: this.lastX,
      lastY: this.lastY,
      event,
    });
    this.lastY = 0;
    this.lastX = 0;
  }

  public destroy(element: Element) {
    if (pointerEventsExists) {
      element.removeEventListener('pointerdown', this.onPointerDown);
      document.removeEventListener('pointermove', this.onPointerMove);
      document.removeEventListener('pointerup', this.onPointerUp);
    } else {
      element.removeEventListener('mousedown', this.onPointerDown);
      document.removeEventListener('mousemove', this.onPointerMove);
      document.removeEventListener('mouseup', this.onPointerUp);
      element.removeEventListener('touchstart', this.onPointerDown);
      document.removeEventListener('touchmove', this.onPointerMove);
      document.removeEventListener('touchend', this.onPointerUp);
      document.removeEventListener('touchcancel', this.onPointerUp);
    }
  }
}
