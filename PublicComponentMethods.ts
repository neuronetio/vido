export default function getPublicComponentMethods(components, actionsByInstance, clone) {
  return class PublicComponentMethods {
    public instance: string;
    public name: string;
    public vidoInstance: any;
    public props: any;

    constructor(instance, vidoInstance, props = {}) {
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
    public destroy() {
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`destroying component ${this.instance}`);
        console.log(clone({ components: components.keys(), actionsByInstance }));
        console.trace();
        console.groupEnd();
      }
      return this.vidoInstance.destroyComponent(this.instance, this.vidoInstance);
    }

    /**
     * Update template - trigger rendering process
     */
    public update() {
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`updating component ${this.instance}`);
        console.log(clone({ components: components.keys(), actionsByInstance }));
        console.trace();
        console.groupEnd();
      }
      return this.vidoInstance.updateTemplate(this.vidoInstance);
    }

    /**
     * Change component input properties
     * @param {any} newProps
     */
    public change(newProps, options) {
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`changing component ${this.instance}`);
        console.log(clone({ props: this.props, newProps: newProps, components: components.keys(), actionsByInstance }));
        console.trace();
        console.groupEnd();
      }
      const component = components.get(this.instance);
      if (component) component.change(newProps, options);
    }

    /**
     * Get component lit-html template
     * @param {} templateProps
     */
    public html(templateProps = {}) {
      const component = components.get(this.instance);
      if (component) {
        return component.update(templateProps, this.vidoInstance);
      }
      return undefined;
    }

    public _getComponents() {
      return components;
    }

    public _getActions() {
      return actionsByInstance;
    }
  };
}
