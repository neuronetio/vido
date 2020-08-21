import { lithtml } from './vido';
export class Slots {
    constructor(vido, props) {
        this.slotInstances = {};
        this.destroyed = false;
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
    setComponents(slots) {
        if (!slots || this.destroyed)
            return;
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
    destroy() {
        if (this.destroyed)
            return;
        for (const slotPlacement in this.slotInstances) {
            for (const instance of this.slotInstances[slotPlacement]) {
                instance.destroy();
            }
            this.slotInstances[slotPlacement].length = 0;
        }
        this.destroyed = true;
    }
    change(changedProps, options = undefined) {
        if (this.destroyed)
            return;
        for (const slotPlacement in this.slotInstances) {
            const instances = this.slotInstances[slotPlacement];
            for (const slot of instances) {
                slot.change(changedProps, options);
            }
        }
    }
    getInstances(placement) {
        if (this.destroyed)
            return;
        if (placement === undefined)
            return this.slotInstances;
        return this.slotInstances[placement];
    }
    html(placement, templateProps) {
        if (this.destroyed)
            return;
        if (this.slotInstances[placement].length === 0) {
            if (templateProps instanceof lithtml.TemplateResult)
                return [templateProps];
            if (typeof templateProps === 'string')
                return [lithtml.html `${templateProps}`];
        }
        return this.slotInstances[placement].map((instance) => instance.html(templateProps));
    }
    getProps() {
        return this.props;
    }
    isDestroyed() {
        return this.destroyed;
    }
}
