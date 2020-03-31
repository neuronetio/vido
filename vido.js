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
var lit_html_optimised_1 = require("lit-html-optimised");
exports.Directive = lit_html_optimised_1.Directive;
var async_append_1 = require("lit-html-optimised/directives/async-append");
exports.asyncAppend = async_append_1.asyncAppend;
var async_replace_1 = require("lit-html-optimised/directives/async-replace");
exports.asyncReplace = async_replace_1.asyncReplace;
var cache_1 = require("lit-html-optimised/directives/cache");
exports.cache = cache_1.cache;
var class_map_1 = require("lit-html-optimised/directives/class-map");
exports.classMap = class_map_1.classMap;
var guard_1 = require("lit-html-optimised/directives/guard");
exports.guard = guard_1.guard;
var if_defined_1 = require("lit-html-optimised/directives/if-defined");
exports.ifDefined = if_defined_1.ifDefined;
var repeat_1 = require("lit-html-optimised/directives/repeat");
exports.repeat = repeat_1.repeat;
var unsafe_html_1 = require("lit-html-optimised/directives/unsafe-html");
exports.unsafeHTML = unsafe_html_1.unsafeHTML;
var until_1 = require("lit-html-optimised/directives/until");
exports.until = until_1.until;
var Detach_1 = require("./Detach");
exports.Detach = Detach_1["default"];
var StyleMap_1 = require("./StyleMap");
exports.StyleMap = StyleMap_1["default"];
var PointerAction_1 = require("./PointerAction");
exports.PointerAction = PointerAction_1["default"];
var PublicComponentMethods_1 = require("./PublicComponentMethods");
var ActionsCollector_1 = require("./ActionsCollector");
var InternalComponentMethods_1 = require("./InternalComponentMethods");
var helpers_1 = require("./helpers");
exports.schedule = helpers_1.schedule;
var Action_1 = require("./Action");
exports.Action = Action_1["default"];
var lithtml = require("lit-html-optimised");
exports.lithtml = lithtml;
/**
 * Vido library
 *
 * @param {any} state - state management for the view (can be anything)
 * @param {any} api - some api's or other globally available services
 * @returns {VidoInstance} vido instance
 */
function Vido(state, api) {
    var componentId = 0;
    var components = new Map();
    var actionsByInstance = new Map();
    var app, element;
    var shouldUpdateCount = 0;
    var resolved = Promise.resolve();
    var additionalMethods = {};
    var ActionsCollector = ActionsCollector_1["default"](actionsByInstance);
    var InstanceActionsCollector = /** @class */ (function () {
        function InstanceActionsCollector(instance) {
            this.instance = instance;
        }
        InstanceActionsCollector.prototype.create = function (actions, props) {
            var actionsInstance = new ActionsCollector(this.instance);
            actionsInstance.set(actions, props);
            return actionsInstance;
        };
        return InstanceActionsCollector;
    }());
    var PublicComponentMethods = PublicComponentMethods_1["default"](components, actionsByInstance, helpers_1.clone);
    var InternalComponentMethods = InternalComponentMethods_1["default"](components, actionsByInstance, helpers_1.clone);
    var VidoInstance = /** @class */ (function () {
        function VidoInstance() {
            this.destroyable = [];
            this.onChangeFunctions = [];
            this.debug = false;
            this.state = state;
            this.api = api;
            this.lastProps = {};
            this.html = lit_html_optimised_1.html;
            this.svg = lit_html_optimised_1.svg;
            this.directive = lit_html_optimised_1.directive;
            this.asyncAppend = async_append_1.asyncAppend;
            this.asyncReplace = async_replace_1.asyncReplace;
            this.cache = cache_1.cache;
            this.classMap = class_map_1.classMap;
            this.guard = guard_1.guard;
            this.ifDefined = if_defined_1.ifDefined;
            this.repeat = repeat_1.repeat;
            this.unsafeHTML = unsafe_html_1.unsafeHTML;
            this.until = until_1.until;
            this.schedule = helpers_1.schedule;
            this.actionsByInstance = function (componentActions, props) { };
            this.StyleMap = StyleMap_1["default"];
            this.Detach = Detach_1["default"];
            this.PointerAction = PointerAction_1["default"];
            this.Action = Action_1["default"];
            this._components = components;
            this._actions = actionsByInstance;
            this.reuseComponents = this.reuseComponents.bind(this);
            this.onDestroy = this.onDestroy.bind(this);
            this.onChange = this.onChange.bind(this);
            this.update = this.update.bind(this);
            for (var name_1 in additionalMethods) {
                this[name_1] = additionalMethods[name_1];
            }
        }
        VidoInstance.prototype.addMethod = function (name, body) {
            additionalMethods[name] = body;
        };
        VidoInstance.prototype.onDestroy = function (fn) {
            this.destroyable.push(fn);
        };
        VidoInstance.prototype.onChange = function (fn) {
            this.onChangeFunctions.push(fn);
        };
        VidoInstance.prototype.update = function (callback) {
            return this.updateTemplate(callback);
        };
        /**
         * Reuse existing components when your data was changed
         *
         * @param {array} currentComponents - array of components
         * @param {array} dataArray  - any data as array for each component
         * @param {function} getProps - you can pass params to component from array item ( example: item=>({id:item.id}) )
         * @param {function} component - what kind of components do you want to create?
         * @param {boolean} leaveTail - leave last elements and do not destroy corresponding components
         * @returns {array} of components (with updated/destroyed/created ones)
         */
        VidoInstance.prototype.reuseComponents = function (currentComponents, dataArray, getProps, component, leaveTail) {
            var e_1, _a;
            if (leaveTail === void 0) { leaveTail = true; }
            var modified = [];
            var currentLen = currentComponents.length;
            var dataLen = dataArray.length;
            var leave = false;
            if (leaveTail && (dataArray === undefined || dataArray.length === 0)) {
                leave = true;
            }
            var leaveStartingAt = 0;
            if (currentLen < dataLen) {
                var diff = dataLen - currentLen;
                while (diff) {
                    var item = dataArray[dataLen - diff];
                    var newComponent = this.createComponent(component, getProps(item));
                    currentComponents.push(newComponent);
                    modified.push(newComponent.instance);
                    diff--;
                }
            }
            else if (currentLen > dataLen) {
                var diff = currentLen - dataLen;
                if (leaveTail) {
                    leave = true;
                    leaveStartingAt = currentLen - diff;
                }
                while (diff) {
                    var index_1 = currentLen - diff;
                    if (!leaveTail) {
                        modified.push(currentComponents[index_1].instance);
                        currentComponents[index_1].destroy();
                    }
                    diff--;
                }
                if (!leaveTail) {
                    currentComponents.length = dataLen;
                }
            }
            var index = 0;
            try {
                for (var currentComponents_1 = __values(currentComponents), currentComponents_1_1 = currentComponents_1.next(); !currentComponents_1_1.done; currentComponents_1_1 = currentComponents_1.next()) {
                    var component_1 = currentComponents_1_1.value;
                    var item = dataArray[index];
                    if (!modified.includes(component_1.instance)) {
                        component_1.change(getProps(item), { leave: leave && index >= leaveStartingAt });
                    }
                    index++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (currentComponents_1_1 && !currentComponents_1_1.done && (_a = currentComponents_1["return"])) _a.call(currentComponents_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        VidoInstance.prototype.createComponent = function (component, props, content) {
            if (props === void 0) { props = {}; }
            if (content === void 0) { content = null; }
            var instance = component.name + ':' + componentId++;
            var vidoInstance;
            vidoInstance = new VidoInstance();
            vidoInstance.instance = instance;
            vidoInstance.name = component.name;
            vidoInstance.Actions = new InstanceActionsCollector(instance);
            var publicMethods = new PublicComponentMethods(instance, vidoInstance, props);
            var internalMethods = new InternalComponentMethods(instance, vidoInstance, component(vidoInstance, props, content), content);
            components.set(instance, internalMethods);
            components.get(instance).change(props);
            if (vidoInstance.debug) {
                console.groupCollapsed("component created " + instance);
                console.log(helpers_1.clone({ props: props, components: components.keys(), actionsByInstance: actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            return publicMethods;
        };
        VidoInstance.prototype.destroyComponent = function (instance, vidoInstance) {
            var e_2, _a;
            if (vidoInstance.debug) {
                console.groupCollapsed("destroying component " + instance + "...");
                console.log(helpers_1.clone({ components: components.keys(), actionsByInstance: actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            if (actionsByInstance.has(instance)) {
                try {
                    for (var _b = __values(actionsByInstance.get(instance)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var action = _c.value;
                        if (typeof action.componentAction.destroy === 'function') {
                            action.componentAction.destroy(action.element, action.props);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            actionsByInstance["delete"](instance);
            var component = components.get(instance);
            component.update();
            component.destroy();
            components["delete"](instance);
            if (vidoInstance.debug) {
                console.groupCollapsed("component destroyed " + instance);
                console.log(helpers_1.clone({ components: components.keys(), actionsByInstance: actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
        };
        VidoInstance.prototype.executeActions = function () {
            var e_3, _a, e_4, _b, e_5, _c;
            var _d, _e, _f;
            try {
                for (var _g = __values(actionsByInstance.values()), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var actions = _h.value;
                    try {
                        for (var actions_1 = (e_4 = void 0, __values(actions)), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
                            var action = actions_1_1.value;
                            if (action.element.vido === undefined) {
                                var componentAction = action.componentAction;
                                var create = componentAction.create;
                                if (typeof create !== 'undefined') {
                                    var result = void 0;
                                    if (((_d = create.prototype) === null || _d === void 0 ? void 0 : _d.isAction) !== true &&
                                        create.isAction === undefined &&
                                        ((_e = create.prototype) === null || _e === void 0 ? void 0 : _e.update) === undefined &&
                                        ((_f = create.prototype) === null || _f === void 0 ? void 0 : _f.destroy) === undefined) {
                                        result = create(action.element, action.props);
                                    }
                                    else {
                                        result = new create(action.element, action.props);
                                    }
                                    if (result !== undefined) {
                                        if (typeof result === 'function') {
                                            componentAction.destroy = result;
                                        }
                                        else {
                                            if (typeof result.update === 'function') {
                                                componentAction.update = result.update.bind(result);
                                            }
                                            if (typeof result.destroy === 'function') {
                                                componentAction.destroy = result.destroy.bind(result);
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                action.element.vido = action.props;
                                if (typeof action.componentAction.update === 'function') {
                                    action.componentAction.update(action.element, action.props);
                                }
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (actions_1_1 && !actions_1_1.done && (_b = actions_1["return"])) _b.call(actions_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    try {
                        for (var actions_2 = (e_5 = void 0, __values(actions)), actions_2_1 = actions_2.next(); !actions_2_1.done; actions_2_1 = actions_2.next()) {
                            var action = actions_2_1.value;
                            action.element.vido = action.props;
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (actions_2_1 && !actions_2_1.done && (_c = actions_2["return"])) _c.call(actions_2);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_a = _g["return"])) _a.call(_g);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        VidoInstance.prototype.updateTemplate = function (callback) {
            var _this = this;
            return new Promise(function (resolve) {
                var currentShouldUpdateCount = ++shouldUpdateCount;
                var self = _this;
                function flush() {
                    if (currentShouldUpdateCount === shouldUpdateCount) {
                        shouldUpdateCount = 0;
                        self.render();
                        if (typeof callback === 'function')
                            callback();
                        resolve();
                    }
                }
                resolved.then(flush);
            });
        };
        VidoInstance.prototype.createApp = function (config) {
            element = config.element;
            var App = this.createComponent(config.component, config.props);
            app = App.instance;
            this.render();
            return App;
        };
        VidoInstance.prototype.render = function () {
            var appComponent = components.get(app);
            if (appComponent) {
                lit_html_optimised_1.render(appComponent.update(), element);
                this.executeActions();
            }
            else if (element) {
                element.remove();
            }
        };
        return VidoInstance;
    }());
    return new VidoInstance();
}
exports["default"] = Vido;
Vido.prototype.lithtml = lithtml;
Vido.prototype.Action = Action_1["default"];
Vido.prototype.Directive = lit_html_optimised_1.Directive;
Vido.prototype.schedule = helpers_1.schedule;
Vido.prototype.Detach = Detach_1["default"];
Vido.prototype.StyleMap = StyleMap_1["default"];
Vido.prototype.PointerAction = PointerAction_1["default"];
Vido.prototype.asyncAppend = async_append_1.asyncAppend;
Vido.prototype.asyncReplace = async_replace_1.asyncReplace;
Vido.prototype.cache = cache_1.cache;
Vido.prototype.classMap = class_map_1.classMap;
Vido.prototype.guard = guard_1.guard;
Vido.prototype.ifDefined = if_defined_1.ifDefined;
Vido.prototype.repeat = repeat_1.repeat;
Vido.prototype.unsafeHTML = unsafe_html_1.unsafeHTML;
Vido.prototype.unti = until_1.until;
