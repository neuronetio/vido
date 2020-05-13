export default function getPublicComponentMethods(components, actionsByInstance, clone) {
    return class PublicComponentMethods {
        constructor(instance, vidoInstance, props = {}) {
            this.destroyed = false;
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
        destroy() {
            if (this.destroyed)
                return;
            if (this.vidoInstance.debug) {
                console.groupCollapsed(`destroying component ${this.instance}`);
                console.log(clone({ components: components.keys(), actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            this.vidoInstance.destroyComponent(this.instance, this.vidoInstance);
            this.destroyed = true;
        }
        /**
         * Update template - trigger rendering process
         */
        update(callback = undefined) {
            if (this.vidoInstance.debug) {
                console.groupCollapsed(`updating component ${this.instance}`);
                console.log(clone({ components: components.keys(), actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            return this.vidoInstance.updateTemplate(callback);
        }
        /**
         * Change component input properties
         * @param {any} newProps
         */
        change(newProps, options) {
            if (this.vidoInstance.debug) {
                console.groupCollapsed(`changing component ${this.instance}`);
                console.log(clone({ props: this.props, newProps: newProps, components: components.keys(), actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            const component = components.get(this.instance);
            if (component)
                component.change(newProps, options);
        }
        /**
         * Get component lit-html template
         * @param {} templateProps
         */
        html(templateProps = {}) {
            const component = components.get(this.instance);
            if (component && !component.destroyed) {
                return component.update(templateProps, this.vidoInstance);
            }
            return undefined;
        }
        _getComponents() {
            return components;
        }
        _getActions() {
            return actionsByInstance;
        }
    };
}
