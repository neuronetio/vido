export default function getInternalComponentMethods(components, actionsByInstance, clone) {
    return class InternalComponentMethods {
        constructor(instance, vidoInstance, renderFunction, content) {
            this.instance = instance;
            this.vidoInstance = vidoInstance;
            this.renderFunction = renderFunction;
            this.content = content;
            this.destroy = this.destroy.bind(this);
            this.update = this.update.bind(this);
            this.change = this.change.bind(this);
        }
        destroy() {
            if (this.vidoInstance.debug) {
                console.groupCollapsed(`component destroy method fired ${this.instance}`);
                console.log(clone({
                    props: this.vidoInstance.props,
                    components: components.keys(),
                    destroyable: this.vidoInstance.destroyable,
                    actionsByInstance,
                }));
                console.trace();
                console.groupEnd();
            }
            if (this.content && typeof this.content.destroy === 'function') {
                this.content.destroy();
            }
            for (const d of this.vidoInstance.destroyable) {
                d();
            }
            this.vidoInstance.onChangeFunctions.length = 0;
            this.vidoInstance.destroyable.length = 0;
            this.vidoInstance.destroyed = true;
            this.vidoInstance.update();
        }
        update(props = {}) {
            if (this.vidoInstance.debug) {
                console.groupCollapsed(`component update method fired ${this.instance}`);
                console.log(clone({ components: components.keys(), actionsByInstance }));
                console.trace();
                console.groupEnd();
            }
            return this.renderFunction(props);
        }
        change(changedProps, options = { leave: false }) {
            const props = changedProps;
            if (this.vidoInstance.debug) {
                console.groupCollapsed(`component change method fired ${this.instance}`);
                console.log(clone({
                    props,
                    components: components.keys(),
                    onChangeFunctions: this.vidoInstance.onChangeFunctions,
                    changedProps,
                    actionsByInstance,
                }));
                console.trace();
                console.groupEnd();
            }
            for (const fn of this.vidoInstance.onChangeFunctions) {
                fn(changedProps, options);
            }
        }
    };
}
