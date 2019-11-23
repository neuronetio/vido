import Action from './Action';
export interface Options {
  element?: HTMLElement;
  axis?: string;
  threshold?: number;
  onDown?: (data) => void;
  onMove?: (data) => void;
  onUp?: (data) => void;
  onWheel?: (data) => void;
}

const defaultOptions = {
  element: document.createTextNode(''),
  axis: 'xy',
  threshold: 10,
  onDown(data) {},
  onMove(data) {},
  onUp(data) {},
  onWheel(data) {}
};

export default class PointerAction extends Action {
  moving: string = '';
  initialX: number = 0;
  initialY: number = 0;
  lastY: number = 0;
  lastX: number = 0;
  options: Options;

  constructor(element, data) {
    super();
    this.onPointerStart = this.onPointerStart.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerEnd = this.onPointerEnd.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.options = { ...defaultOptions, ...data.pointerOptions } as Options;
    element.addEventListener('touchstart', this.onPointerStart);
    element.addEventListener('mousedown', this.onPointerStart);
    document.addEventListener('touchmove', this.onPointerMove);
    document.addEventListener('touchend', this.onPointerEnd);
    document.addEventListener('mousemove', this.onPointerMove);
    document.addEventListener('mouseup', this.onPointerEnd);
  }

  normalizeMouseWheelEvent(event) {
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

  onWheel(event) {
    const normalized = this.normalizeMouseWheelEvent(event);
    this.options.onWheel(normalized);
  }

  normalizePointerEvent(event) {
    let x = 0,
      y = 0;
    switch (event.type) {
      case 'mousedown':
      case 'mousemove':
      case 'mouseup':
        x = event.x;
        y = event.y;
        break;
      case 'touchstart':
      case 'touchmove':
        x = event.touches[0].screenX;
        y = event.touches[0].screenY;
        break;
      case 'touchend':
        x = event.changedTouches[0].screenX;
        y = event.changedTouches[0].screenY;
        break;
    }
    return { x, y, event };
  }

  onPointerStart(event) {
    if (event.type === 'mousedown' && event.button !== 0) return;
    this.moving = 'xy';
    const normalized = this.normalizePointerEvent(event);
    this.lastX = normalized.x;
    this.lastY = normalized.y;
    this.initialX = normalized.x;
    this.initialY = normalized.y;
    this.options.onDown({ x: normalized.x, y: normalized.y, event });
  }

  handleX(normalized) {
    let movementX = normalized.x - this.lastX;
    this.lastY = normalized.y;
    this.lastX = normalized.x;
    return movementX;
  }

  handleY(normalized) {
    let movementY = normalized.y - this.lastY;
    this.lastY = normalized.y;
    this.lastX = normalized.x;
    return movementY;
  }

  onPointerMove(event) {
    if (this.moving === '' || (event.type === 'mousemove' && event.button !== 0)) return;
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
        event
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
        event
      });
    } else if (this.options.axis === 'x') {
      if (
        this.moving === 'x' ||
        (this.moving === 'xy' && Math.abs(normalized.x - this.initialX) > this.options.threshold)
      ) {
        this.moving = 'x';
        this.options.onMove({
          movementX: this.handleX(normalized),
          movementY: 0,
          initialX: this.initialX,
          initialY: this.initialY,
          lastX: this.lastX,
          lastY: this.lastY,
          event
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
        event
      });
    }
  }

  onPointerEnd(event) {
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
      event
    });
    this.lastY = 0;
    this.lastX = 0;
  }

  destroy(element) {
    element.removeEventListener('touchstart', this.onPointerStart);
    element.removeEventListener('mousedown', this.onPointerStart);
    document.removeEventListener('touchmove', this.onPointerMove);
    document.removeEventListener('touchend', this.onPointerEnd);
    document.removeEventListener('mousemove', this.onPointerMove);
    document.removeEventListener('mouseup', this.onPointerEnd);
  }
}
