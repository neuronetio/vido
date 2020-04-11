"use strict";
exports.__esModule = true;
function getPublicComponentMethods(components, actionsByInstance, clone) {
    return /** @class */ (function () {
        function PublicComponentMethods(instance, vidoInstance, props) {
            if (props === void 0) { props = {}; }
            this.instance = instance;
            this.name = vidoInstance.name;
            this.vidoInstance = vidoInstance;
            this.props = props;
            this.destroy = this.destroy.bind(this);
            this.update = this.update.bind(this);
            this.change = this.change.bind(this);
            this.html = this.html.bind(this);
        }
        /**
         * Destroy component
         */
        PublicComponentMethods.prototype.destroy = function () {
            if (this.vidoInstance.debug) {
                console.groupCollapsed("destroying component " + this.instance);
                console.log(clone({ components: components.keys(), actionsByInstance: actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            return this.vidoInstance.destroyComponent(this.instance, this.vidoInstance);
        };
        /**
         * Update template - trigger rendering process
         */
        PublicComponentMethods.prototype.update = function () {
            if (this.vidoInstance.debug) {
                console.groupCollapsed("updating component " + this.instance);
                console.log(clone({ components: components.keys(), actionsByInstance: actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            return this.vidoInstance.updateTemplate(this.vidoInstance);
        };
        /**
         * Change component input properties
         * @param {any} newProps
         */
        PublicComponentMethods.prototype.change = function (newProps, options) {
            if (this.vidoInstance.debug) {
                console.groupCollapsed("changing component " + this.instance);
                console.log(clone({ props: this.props, newProps: newProps, components: components.keys(), actionsByInstance: actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            var component = components.get(this.instance);
            if (component)
                component.change(newProps, options);
        };
        /**
         * Get component lit-html template
         * @param {} templateProps
         */
        PublicComponentMethods.prototype.html = function (templateProps) {
            if (templateProps === void 0) { templateProps = {}; }
            var component = components.get(this.instance);
            if (component) {
                return component.update(templateProps, this.vidoInstance);
            }
            return undefined;
        };
        PublicComponentMethods.prototype._getComponents = function () {
            return components;
        };
        PublicComponentMethods.prototype._getActions = function () {
            return actionsByInstance;
        };
        return PublicComponentMethods;
    }());
}
exports["default"] = getPublicComponentMethods;
