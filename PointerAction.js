"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Action_1 = require("./Action");
var defaultOptions = {
    element: document.createTextNode(''),
    axis: 'xy',
    threshold: 10,
    onDown: function (data) { },
    onMove: function (data) { },
    onUp: function (data) { },
    onWheel: function (data) { }
};
var pointerEventsExists = typeof PointerEvent !== 'undefined';
var id = 0;
var PointerAction = /** @class */ (function (_super) {
    __extends(PointerAction, _super);
    function PointerAction(element, data) {
        var _this = _super.call(this) || this;
        _this.moving = '';
        _this.initialX = 0;
        _this.initialY = 0;
        _this.lastY = 0;
        _this.lastX = 0;
        _this.onPointerDown = _this.onPointerDown.bind(_this);
        _this.onPointerMove = _this.onPointerMove.bind(_this);
        _this.onPointerUp = _this.onPointerUp.bind(_this);
        _this.onWheel = _this.onWheel.bind(_this);
        _this.element = element;
        _this.id = ++id;
        _this.options = __assign(__assign({}, defaultOptions), data.pointerOptions);
        if (pointerEventsExists) {
            element.addEventListener('pointerdown', _this.onPointerDown);
            document.addEventListener('pointermove', _this.onPointerMove);
            document.addEventListener('pointerup', _this.onPointerUp);
        }
        else {
            element.addEventListener('touchstart', _this.onPointerDown);
            document.addEventListener('touchmove', _this.onPointerMove, { passive: false });
            document.addEventListener('touchend', _this.onPointerUp);
            document.addEventListener('touchcancel', _this.onPointerUp);
            element.addEventListener('mousedown', _this.onPointerDown);
            document.addEventListener('mousemove', _this.onPointerMove, { passive: false });
            document.addEventListener('mouseup', _this.onPointerUp);
        }
        return _this;
    }
    PointerAction.prototype.normalizeMouseWheelEvent = function (event) {
        // @ts-ignore
        var x = event.deltaX || 0;
        // @ts-ignore
        var y = event.deltaY || 0;
        // @ts-ignore
        var z = event.deltaZ || 0;
        // @ts-ignore
        var mode = event.deltaMode;
        // @ts-ignore
        var lineHeight = parseInt(getComputedStyle(event.target).getPropertyValue('line-height'));
        var scale = 1;
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
        return { x: x, y: y, z: z, event: event };
    };
    PointerAction.prototype.onWheel = function (event) {
        var normalized = this.normalizeMouseWheelEvent(event);
        this.options.onWheel(normalized);
    };
    PointerAction.prototype.normalizePointerEvent = function (event) {
        var result = { x: 0, y: 0, pageX: 0, pageY: 0, clientX: 0, clientY: 0, screenX: 0, screenY: 0, event: event };
        switch (event.type) {
            case 'wheel':
                var wheel = this.normalizeMouseWheelEvent(event);
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
                result.x = event.changedTouches[0].screenX;
                result.y = event.changedTouches[0].screenY;
                result.pageX = event.changedTouches[0].pageX;
                result.pageY = event.changedTouches[0].pageY;
                result.screenX = event.changedTouches[0].screenX;
                result.screenY = event.changedTouches[0].screenY;
                result.clientX = event.changedTouches[0].clientX;
                result.clientY = event.changedTouches[0].clientY;
                break;
            default:
                result.x = event.x;
                result.y = event.y;
                result.pageX = event.pageX;
                result.pageY = event.pageY;
                result.screenX = event.screenX;
                result.screenY = event.screenY;
                result.clientX = event.clientX;
                result.clientY = event.clientY;
                break;
        }
        return result;
    };
    PointerAction.prototype.onPointerDown = function (event) {
        if (event.type === 'mousedown' && event.button !== 0)
            return;
        this.moving = 'xy';
        var normalized = this.normalizePointerEvent(event);
        this.lastX = normalized.x;
        this.lastY = normalized.y;
        this.initialX = normalized.x;
        this.initialY = normalized.y;
        this.options.onDown(normalized);
    };
    PointerAction.prototype.handleX = function (normalized) {
        var movementX = normalized.x - this.lastX;
        this.lastY = normalized.y;
        this.lastX = normalized.x;
        return movementX;
    };
    PointerAction.prototype.handleY = function (normalized) {
        var movementY = normalized.y - this.lastY;
        this.lastY = normalized.y;
        this.lastX = normalized.x;
        return movementY;
    };
    PointerAction.prototype.onPointerMove = function (event) {
        if (this.moving === '' || (event.type === 'mousemove' && event.button !== 0))
            return;
        var normalized = this.normalizePointerEvent(event);
        if (this.options.axis === 'x|y') {
            var movementX = 0, movementY = 0;
            if (this.moving === 'x' ||
                (this.moving === 'xy' && Math.abs(normalized.x - this.initialX) > this.options.threshold)) {
                this.moving = 'x';
                movementX = this.handleX(normalized);
            }
            if (this.moving === 'y' ||
                (this.moving === 'xy' && Math.abs(normalized.y - this.initialY) > this.options.threshold)) {
                this.moving = 'y';
                movementY = this.handleY(normalized);
            }
            this.options.onMove({
                movementX: movementX,
                movementY: movementY,
                x: normalized.x,
                y: normalized.y,
                initialX: this.initialX,
                initialY: this.initialY,
                lastX: this.lastX,
                lastY: this.lastY,
                event: event
            });
        }
        else if (this.options.axis === 'xy') {
            var movementX = 0, movementY = 0;
            if (Math.abs(normalized.x - this.initialX) > this.options.threshold) {
                movementX = this.handleX(normalized);
            }
            if (Math.abs(normalized.y - this.initialY) > this.options.threshold) {
                movementY = this.handleY(normalized);
            }
            this.options.onMove({
                movementX: movementX,
                movementY: movementY,
                x: normalized.x,
                y: normalized.y,
                initialX: this.initialX,
                initialY: this.initialY,
                lastX: this.lastX,
                lastY: this.lastY,
                event: event
            });
        }
        else if (this.options.axis === 'x') {
            if (this.moving === 'x' ||
                (this.moving === 'xy' && Math.abs(normalized.x - this.initialX) > this.options.threshold)) {
                this.moving = 'x';
                this.options.onMove({
                    movementX: this.handleX(normalized),
                    movementY: 0,
                    initialX: this.initialX,
                    initialY: this.initialY,
                    lastX: this.lastX,
                    lastY: this.lastY,
                    event: event
                });
            }
        }
        else if (this.options.axis === 'y') {
            var movementY = 0;
            if (this.moving === 'y' ||
                (this.moving === 'xy' && Math.abs(normalized.y - this.initialY) > this.options.threshold)) {
                this.moving = 'y';
                movementY = this.handleY(normalized);
            }
            this.options.onMove({
                movementX: 0,
                movementY: movementY,
                x: normalized.x,
                y: normalized.y,
                initialX: this.initialX,
                initialY: this.initialY,
                lastX: this.lastX,
                lastY: this.lastY,
                event: event
            });
        }
    };
    PointerAction.prototype.onPointerUp = function (event) {
        this.moving = '';
        var normalized = this.normalizePointerEvent(event);
        this.options.onUp({
            movementX: 0,
            movementY: 0,
            x: normalized.x,
            y: normalized.y,
            initialX: this.initialX,
            initialY: this.initialY,
            lastX: this.lastX,
            lastY: this.lastY,
            event: event
        });
        this.lastY = 0;
        this.lastX = 0;
    };
    PointerAction.prototype.destroy = function (element) {
        if (pointerEventsExists) {
            element.removeEventListener('pointerdown', this.onPointerDown);
            document.removeEventListener('pointermove', this.onPointerMove);
            document.removeEventListener('pointerup', this.onPointerUp);
        }
        else {
            element.removeEventListener('mousedown', this.onPointerDown);
            document.removeEventListener('mousemove', this.onPointerMove);
            document.removeEventListener('mouseup', this.onPointerUp);
            element.removeEventListener('touchstart', this.onPointerDown);
            document.removeEventListener('touchmove', this.onPointerMove);
            document.removeEventListener('touchend', this.onPointerUp);
            document.removeEventListener('touchcancel', this.onPointerUp);
        }
    };
    return PointerAction;
}(Action_1["default"]));
exports["default"] = PointerAction;
