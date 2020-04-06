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
exports.__esModule = true;
var lit_html_optimised_1 = require("lit-html-optimised");
var detached = new WeakMap();
var Detach = /** @class */ (function (_super) {
    __extends(Detach, _super);
    function Detach(ifFn) {
        var _this = _super.call(this) || this;
        _this.ifFn = ifFn;
        return _this;
    }
    Detach.prototype.body = function (part) {
        var detach = this.ifFn();
        var element = part.committer.element;
        if (detach) {
            detached.set(part, {
                element: element,
                nextSibling: element.nextSibling,
                previousSibling: element.previousSibling,
                parent: element.parentNode
            });
            element.remove();
        }
        else {
            var data = detached.get(part);
            if (data) {
                if (data.nextSibling) {
                    data.nextSibling.parentNode.insertBefore(data.element, data.nextSibling);
                }
                else if (data.previousSibling) {
                    data.previousSibling.parentNode.appendChild(data.element);
                }
                else if (data.parent) {
                    data.parent.appendChild(data.element);
                }
                detached["delete"](part);
            }
        }
    };
    return Detach;
}(lit_html_optimised_1.Directive));
exports["default"] = Detach;
