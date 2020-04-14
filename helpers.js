"use strict";
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
/**
 * Schedule - a throttle function that uses requestAnimationFrame to limit the rate at which a function is called.
 *
 * @param {function} fn
 * @returns {function}
 */
function schedule(fn) {
    var frameId = 0;
    function wrapperFn(argument) {
        if (frameId) {
            return;
        }
        function executeFrame() {
            frameId = 0;
            fn.apply(undefined, [argument]);
        }
        frameId = requestAnimationFrame(executeFrame);
    }
    return wrapperFn;
}
exports.schedule = schedule;
/**
 * Is object - helper function to determine if specified variable is an object
 *
 * @param {any} item
 * @returns {boolean}
 */
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
function getArray(source) {
    var e_1, _a;
    var result = new Array(source.length);
    var index = 0;
    try {
        for (var source_1 = __values(source), source_1_1 = source_1.next(); !source_1_1.done; source_1_1 = source_1.next()) {
            var item = source_1_1.value;
            if (isObject(item)) {
                if (typeof item['clone'] === 'function') {
                    result[index] = item.clone();
                }
                else {
                    result[index] = mergeDeep({}, item);
                }
            }
            else {
                result[index] = item;
            }
            index++;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (source_1_1 && !source_1_1.done && (_a = source_1["return"])) _a.call(source_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
function setObject(source, target, key) {
    if (typeof target[key] === 'undefined') {
        target[key] = {};
    }
    if (typeof source['clone'] === 'function') {
        target[key] = source[key].clone();
    }
    else {
        target[key] = mergeDeep(target[key], source);
    }
}
/**
 * Merge deep - helper function which will merge objects recursively - creating brand new one - like clone
 *
 * @param {object} target
 * @params {object} sources
 * @returns {object}
 */
function mergeDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (var key in source) {
            if (isObject(source[key])) {
                setObject(source[key], target, key);
            }
            else if (Array.isArray(source[key])) {
                target[key] = getArray(source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
    }
    if (!sources.length) {
        return target;
    }
    return mergeDeep.apply(void 0, __spread([target], sources));
}
exports.mergeDeep = mergeDeep;
/**
 * Clone helper function
 *
 * @param source
 * @returns {object} cloned source
 */
function clone(source) {
    if (typeof source.actions !== 'undefined') {
        var actns = source.actions.map(function (action) {
            var result = __assign({}, action);
            var props = __assign({}, result.props);
            delete props.state;
            delete props.api;
            delete result.element;
            result.props = props;
            return result;
        });
        source.actions = actns;
    }
    return mergeDeep({}, source);
}
exports.clone = clone;
exports["default"] = {
    mergeDeep: mergeDeep,
    clone: clone,
    schedule: schedule
};
