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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var lit_html_optimised_1 = require("lit-html-optimised");
var toRemove = [], toUpdate = [];
var StyleMap = /** @class */ (function (_super) {
    __extends(StyleMap, _super);
    function StyleMap(styleInfo, detach) {
        if (detach === void 0) { detach = false; }
        var _this = _super.call(this) || this;
        _this.previous = {};
        _this.style = styleInfo;
        _this.detach = detach;
        return _this;
    }
    StyleMap.prototype.setStyle = function (styleInfo) {
        this.style = styleInfo;
    };
    StyleMap.prototype.setDetach = function (detach) {
        this.detach = detach;
    };
    StyleMap.prototype.body = function (part) {
        var e_1, _a, e_2, _b;
        toRemove.length = 0;
        toUpdate.length = 0;
        // @ts-ignore
        var element = part.committer.element;
        var style = element.style;
        var previous = this.previous;
        for (var name_1 in previous) {
            if (this.style[name_1] === undefined) {
                toRemove.push(name_1);
            }
        }
        for (var name_2 in this.style) {
            var value = this.style[name_2];
            var prev = previous[name_2];
            if (prev !== undefined && prev === value) {
                continue;
            }
            toUpdate.push(name_2);
        }
        if (toRemove.length || toUpdate.length) {
            var parent_1, nextSibling = void 0;
            if (this.detach) {
                parent_1 = element.parentNode;
                if (parent_1) {
                    nextSibling = element.nextSibling;
                    element.remove();
                }
            }
            try {
                for (var toRemove_1 = __values(toRemove), toRemove_1_1 = toRemove_1.next(); !toRemove_1_1.done; toRemove_1_1 = toRemove_1.next()) {
                    var name_3 = toRemove_1_1.value;
                    style.removeProperty(name_3);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (toRemove_1_1 && !toRemove_1_1.done && (_a = toRemove_1["return"])) _a.call(toRemove_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var toUpdate_1 = __values(toUpdate), toUpdate_1_1 = toUpdate_1.next(); !toUpdate_1_1.done; toUpdate_1_1 = toUpdate_1.next()) {
                    var name_4 = toUpdate_1_1.value;
                    var value = this.style[name_4];
                    if (!name_4.includes('-')) {
                        style[name_4] = value;
                    }
                    else {
                        style.setProperty(name_4, value);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (toUpdate_1_1 && !toUpdate_1_1.done && (_b = toUpdate_1["return"])) _b.call(toUpdate_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (this.detach && parent_1) {
                parent_1.insertBefore(element, nextSibling);
            }
            this.previous = __assign({}, this.style);
        }
    };
    return StyleMap;
}(lit_html_optimised_1.Directive));
exports["default"] = StyleMap;
