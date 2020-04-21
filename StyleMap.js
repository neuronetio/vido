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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var lit_html_optimised_1 = require("lit-html-optimised");
var StyleMap = /** @class */ (function (_super) {
    __extends(StyleMap, _super);
    function StyleMap(styleInfo, detach) {
        if (detach === void 0) { detach = false; }
        var _this = _super.call(this) || this;
        _this.toRemove = [];
        _this.toUpdate = [];
        _this.debug = false;
        _this.previous = {};
        _this.style = styleInfo;
        _this.detach = detach;
        return _this;
    }
    StyleMap.prototype.setStyle = function (styleInfo) {
        this.style = styleInfo;
    };
    StyleMap.prototype.setDebug = function (debug) {
        if (debug === void 0) { debug = true; }
        this.debug = debug;
    };
    StyleMap.prototype.setDetach = function (detach) {
        this.detach = detach;
    };
    StyleMap.prototype.body = function (part) {
        var e_1, _a, e_2, _b, e_3, _c;
        this.toRemove.length = 0;
        this.toUpdate.length = 0;
        // @ts-ignore
        var element = part.committer.element;
        var elementStyle = element.style;
        var previous = this.previous;
        if (element.attributes.getNamedItem('style')) {
            var currentElementStyles = element.attributes
                .getNamedItem('style')
                .value.split(';')
                .map(function (item) { return item.substr(0, item.indexOf(':')).trim(); })
                .filter(function (item) { return !!item; });
            try {
                for (var currentElementStyles_1 = __values(currentElementStyles), currentElementStyles_1_1 = currentElementStyles_1.next(); !currentElementStyles_1_1.done; currentElementStyles_1_1 = currentElementStyles_1.next()) {
                    var name_1 = currentElementStyles_1_1.value;
                    if (this.style[name_1] === undefined) {
                        if (!this.toRemove.includes(name_1))
                            this.toRemove.push(name_1);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (currentElementStyles_1_1 && !currentElementStyles_1_1.done && (_a = currentElementStyles_1["return"])) _a.call(currentElementStyles_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        for (var name_2 in previous) {
            if (!this.style.hasOwnProperty(name_2))
                continue;
            if (this.style[name_2] === undefined) {
                if (!this.toRemove.includes(name_2))
                    this.toRemove.push(name_2);
            }
        }
        for (var name_3 in this.style) {
            if (!this.style.hasOwnProperty(name_3))
                continue;
            var value = this.style[name_3];
            var prev = previous[name_3];
            if (prev !== undefined && prev === value) {
                continue;
            }
            this.toUpdate.push(name_3);
        }
        if (this.debug) {
            console.log('[StyleMap] to remove', __spread(this.toRemove));
            console.log('[StyleMap] to update', __spread(this.toUpdate));
        }
        if (this.toRemove.length || this.toUpdate.length) {
            var parent_1, nextSibling = void 0;
            if (this.detach) {
                parent_1 = element.parentNode;
                if (parent_1) {
                    nextSibling = element.nextSibling;
                    element.remove();
                }
            }
            try {
                for (var _d = __values(this.toRemove), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var name_4 = _e.value;
                    elementStyle.removeProperty(name_4);
                    if (elementStyle[name_4])
                        delete elementStyle[name_4];
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_b = _d["return"])) _b.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                for (var _f = __values(this.toUpdate), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var name_5 = _g.value;
                    var value = this.style[name_5];
                    if (!name_5.includes('-')) {
                        elementStyle[name_5] = value;
                    }
                    else {
                        elementStyle.setProperty(name_5, value);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_c = _f["return"])) _c.call(_f);
                }
                finally { if (e_3) throw e_3.error; }
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
