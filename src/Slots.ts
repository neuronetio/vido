import { ComponentInstance, lithtml, Component, AnyVido } from './vido';

export type SlotInstances = {
  [key: string]: ComponentInstance[];
};

export interface SlotStorage {
  [key: string]: Component[];
}

export class Slots {
  private slotInstances: SlotInstances = {};
  private vido: AnyVido;
  private destroyed = false;
  private props: unknown;

  constructor(vido: AnyVido, props: unknown) {
    this.vido = vido;
    this.props = props;
    this.destroy = this.destroy.bind(this);
    this.change = this.change.bind(this);
    this.html = this.html.bind(this);
    this.getInstances = this.getInstances.bind(this);
    this.setComponents = this.setComponents.bind(this);

    this.vido.onDestroy(() => {
      this.destroy();
    });
  }

  public setComponents(slots: SlotStorage) {
    if (!slots || this.destroyed) return;
    for (const slotPlacement in slots) {
      const slotsComponents = slots[slotPlacement];
      if (typeof this.slotInstances[slotPlacement] === 'undefined') {
        this.slotInstances[slotPlacement] = [];
      }
      for (const instance of this.slotInstances[slotPlacement]) {
        instance.destroy();
      }
      this.slotInstances[slotPlacement].length = 0;
      for (const component of slotsComponents) {
        this.slotInstances[slotPlacement].push(this.vido.createComponent(component, this.props));
      }
    }
    this.vido.update();
  }

  public destroy(): void {
    if (this.destroyed) return;
    for (const slotPlacement in this.slotInstances) {
      for (const instance of this.slotInstances[slotPlacement]) {
        instance.destroy();
      }
      this.slotInstances[slotPlacement].length = 0;
    }
    this.destroyed = true;
  }

  public change(changedProps: unknown, options = undefined): void {
    if (this.destroyed) return;
    for (const slotPlacement in this.slotInstances) {
      const instances = this.slotInstances[slotPlacement] as ComponentInstance[];
      for (const slot of instances) {
        slot.change(changedProps, options);
      }
    }
  }

  public getInstances(placement: string | undefined): ComponentInstance[] | SlotInstances {
    if (this.destroyed) return;
    if (placement === undefined) return this.slotInstances;
    return this.slotInstances[placement];
  }

  public html(placement: string, templateProps?: any): lithtml.TemplateResult[] | undefined {
    if (this.destroyed) return;
    if (!this.slotInstances[placement] || this.slotInstances[placement].length === 0) {
      if (templateProps instanceof lithtml.TemplateResult) return [templateProps];
      if (typeof templateProps === 'string') return [lithtml.html`${templateProps}`];
      return templateProps;
    }
    return this.slotInstances[placement].map((instance) => instance.html(templateProps));
  }

  public getProps() {
    return this.props;
  }

  public isDestroyed() {
    return this.destroyed;
  }
}
