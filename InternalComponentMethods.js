"use strict";
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
function getInternalComponentMethods(components, actionsByInstance, clone) {
    return /** @class */ (function () {
        function InternalComponentMethods(instance, vidoInstance, renderFunction, content) {
            this.instance = instance;
            this.vidoInstance = vidoInstance;
            this.renderFunction = renderFunction;
            this.content = content;
        }
        InternalComponentMethods.prototype.destroy = function () {
            var e_1, _a;
            var _b;
            if (this.vidoInstance.debug) {
                console.groupCollapsed("component destroy method fired " + this.instance);
                console.log(clone({
                    props: this.vidoInstance.props,
                    components: components.keys(),
                    destroyable: this.vidoInstance.destroyable,
                    actionsByInstance: actionsByInstance
                }));
                console.trace();
                console.groupEnd();
            }
            if (typeof ((_b = this.content) === null || _b === void 0 ? void 0 : _b.destroy) === 'function') {
                this.content.destroy();
            }
            try {
                for (var _c = __values(this.vidoInstance.destroyable), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var d = _d.value;
                    d();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.vidoInstance.onChangeFunctions.length = 0;
            this.vidoInstance.destroyable.length = 0;
            this.vidoInstance.destroyed = true;
            this.vidoInstance.update();
        };
        InternalComponentMethods.prototype.update = function (props) {
            if (props === void 0) { props = {}; }
            if (this.vidoInstance.debug) {
                console.groupCollapsed("component update method fired " + this.instance);
                console.log(clone({ components: components.keys(), actionsByInstance: actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            return this.renderFunction(props);
        };
        InternalComponentMethods.prototype.change = function (changedProps, options) {
            var e_2, _a;
            if (options === void 0) { options = { leave: false }; }
            var props = changedProps;
            if (this.vidoInstance.debug) {
                console.groupCollapsed("component change method fired " + this.instance);
                console.log(clone({
                    props: props,
                    components: components.keys(),
                    onChangeFunctions: this.vidoInstance.onChangeFunctions,
                    changedProps: changedProps,
                    actionsByInstance: actionsByInstance
                }));
                console.trace();
                console.groupEnd();
            }
            try {
                for (var _b = __values(this.vidoInstance.onChangeFunctions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fn = _c.value;
                    fn(changedProps, options);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        return InternalComponentMethods;
    }());
}
exports["default"] = getInternalComponentMethods;
