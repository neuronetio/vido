export default function getPublicComponentMethods(components, actionsByInstance, clone) {
  return class PublicComponentMethods {
    instance: string;
    vidoInstance: any;
    props: any;
    name: string;

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
    destroy() {
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
    update() {
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
    change(newProps, options) {
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`changing component ${this.instance}`);
        console.log(clone({ props: this.props, newProps: newProps, components: components.keys(), actionsByInstance }));
        console.trace();
        console.groupEnd();
      }
      components.get(this.instance).change(newProps, options);
    }

    /**
     * Get component lit-html template
     * @param {} templateProps
     */
    html(templateProps = {}) {
      return components.get(this.instance).update(templateProps, this.vidoInstance);
    }
  };
}
