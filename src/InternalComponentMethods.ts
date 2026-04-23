import { IAction } from './ActionsCollector';
import { AnyVido, htmlResult } from './vido';

export interface IInternalComponentMethods {
  instance: string;
  vidoInstance: AnyVido;
  renderFunction: (changedProps: any) => void;
  content: any;
  destroyed: boolean;
  destroying: boolean;
  destroy(): void;
  update(props?: any): any;
  change(changedProps: unknown, options?: { leave: boolean }): void;
}

export type IInternalComponentMethodsConstructor = new (
  instance: string,
  vidoInstance: AnyVido,
  renderFunction: (arg: any) => htmlResult,
) => IInternalComponentMethods;

export default function getInternalComponentMethods(
  components: Map<string, any>,
  actionsByInstance: Map<string, IAction[]>,
  clone: (obj: object) => object,
): IInternalComponentMethodsConstructor {
  return class InternalComponentMethods implements IInternalComponentMethods {
    public instance: string;
    public vidoInstance: any;
    public renderFunction: (changedProps: any) => void;
    public content: any;
    public destroyed = false;
    public destroying = false;

    constructor(instance: string, vidoInstance: AnyVido, renderFunction: (arg: any) => htmlResult) {
      this.instance = instance;
      this.vidoInstance = vidoInstance;
      this.renderFunction = renderFunction;
      this.destroy = this.destroy.bind(this);
      this.update = this.update.bind(this);
      this.change = this.change.bind(this);
    }

    public destroy() {
      if (this.destroyed) return;
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`component destroy method fired ${this.instance}`);
        console.log(
          clone({
            props: this.vidoInstance.props,
            components: components.keys(),
            destroyable: this.vidoInstance.destroyable,
            actionsByInstance,
          }),
        );
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
      this.vidoInstance.destroying = false;
      this.destroying = false;
      this.vidoInstance.destroyed = true;
      this.destroyed = true;
      this.vidoInstance.update();
    }

    public update(props = {}) {
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`component update method fired ${this.instance}`);
        console.log(clone({ components: components.keys(), actionsByInstance }));
        console.trace();
        console.groupEnd();
      }
      return this.renderFunction(props);
    }

    public change(changedProps: unknown, options = { leave: false }) {
      const props = changedProps;
      if (this.vidoInstance.debug) {
        console.groupCollapsed(`component change method fired ${this.instance}`);
        console.log(
          clone({
            props,
            components: components.keys(),
            onChangeFunctions: this.vidoInstance.onChangeFunctions,
            changedProps,
            actionsByInstance,
          }),
        );
        console.trace();
        console.groupEnd();
      }
      for (const fn of this.vidoInstance.onChangeFunctions) {
        fn(changedProps, options);
      }
    }
  };
}
