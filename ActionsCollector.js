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
function getActionsCollector(actionsByInstance) {
    return /** @class */ (function (_super) {
        __extends(ActionsCollector, _super);
        function ActionsCollector(instance) {
            var _this = _super.call(this) || this;
            _this.instance = instance;
            return _this;
        }
        ActionsCollector.prototype.set = function (actions, props) {
            this.actions = actions;
            this.props = props;
            // props must be mutable! (do not do this -> {...props})
            // because we will modify action props with onChange and can reuse existin instance
            return this;
        };
        ActionsCollector.prototype.body = function (part) {
            var e_1, _a, e_2, _b;
            var element = part.committer.element;
            try {
                for (var _c = __values(this.actions), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var create = _d.value;
                    if (typeof create !== 'undefined') {
                        var exists = void 0;
                        if (actionsByInstance.has(this.instance)) {
                            try {
                                for (var _e = (e_2 = void 0, __values(actionsByInstance.get(this.instance))), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var action = _f.value;
                                    if (action.componentAction.create === create && action.element === element) {
                                        exists = action;
                                        break;
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        if (!exists) {
                            // @ts-ignore
                            if (typeof element.vido !== 'undefined')
                                delete element.vido;
                            var componentAction = {
                                create: create,
                                update: function () { },
                                destroy: function () { }
                            };
                            var action = { instance: this.instance, componentAction: componentAction, element: element, props: this.props };
                            var byInstance = [];
                            if (actionsByInstance.has(this.instance)) {
                                byInstance = actionsByInstance.get(this.instance);
                            }
                            byInstance.push(action);
                            actionsByInstance.set(this.instance, byInstance);
                        }
                        else {
                            exists.props = this.props;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        return ActionsCollector;
    }(lit_html_optimised_1.Directive));
}
exports["default"] = getActionsCollector;
