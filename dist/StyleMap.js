import { Directive } from 'lit-html/directive';
export default class StyleMap extends Directive {
    constructor() {
        super(...arguments);
        this.style = {};
        this.previous = {};
        this.detach = false;
        this.toRemove = [];
        this.toUpdate = [];
        this.debug = false;
    }
    update(part, props) {
        var _a;
        this.previous = {};
        this.style = props[0];
        this.detach = (_a = props[1]) !== null && _a !== void 0 ? _a : false;
        this.toRemove.length = 0;
        this.toUpdate.length = 0;
        const element = part.element;
        const elementStyle = element.style;
        let previous = this.previous;
        const namedItem = element.attributes.getNamedItem('style');
        if (namedItem) {
            const currentElementStyles = namedItem.value
                .split(';')
                .map((item) => item.substr(0, item.indexOf(':')).trim())
                .filter((item) => !!item);
            for (const name of currentElementStyles) {
                // @ts-ignore
                if (this.style[name] === undefined) {
                    if (!this.toRemove.includes(name))
                        this.toRemove.push(name);
                }
            }
        }
        for (const name in previous) {
            if (!this.style.hasOwnProperty(name))
                continue;
            // @ts-ignore
            if (this.style[name] === undefined) {
                if (!this.toRemove.includes(name))
                    this.toRemove.push(name);
            }
        }
        for (const name in this.style) {
            if (!this.style.hasOwnProperty(name))
                continue;
            // @ts-ignore
            const value = this.style[name];
            // @ts-ignore
            const prev = previous[name];
            if (prev !== undefined && prev === value) {
                continue;
            }
            this.toUpdate.push(name);
        }
        if (this.debug) {
            console.log('[StyleMap] to remove', [...this.toRemove]);
            console.log('[StyleMap] to update', [...this.toUpdate]);
        }
        if (this.toRemove.length || this.toUpdate.length) {
            let parent, nextSibling;
            if (this.detach) {
                parent = element.parentNode;
                if (parent) {
                    nextSibling = element.nextSibling;
                    element.remove();
                }
            }
            for (const name of this.toRemove) {
                elementStyle.removeProperty(name);
                // @ts-ignore
                if (elementStyle[name])
                    delete elementStyle[name];
            }
            for (const name of this.toUpdate) {
                // @ts-ignore
                const value = this.style[name];
                if (!name.includes('-')) {
                    // @ts-ignore
                    elementStyle[name] = value;
                }
                else {
                    elementStyle.setProperty(name, value);
                }
            }
            if (this.detach && parent) {
                // @ts-ignore
                parent.insertBefore(element, nextSibling);
            }
            this.previous = Object.assign({}, this.style);
        }
        return this.render(this.style, this.detach);
    }
    render(styleMap, detach = false) { }
    setStyle(styleInfo) {
        this.style = styleInfo;
    }
    setDebug(debug = true) {
        this.debug = debug;
    }
    setDetach(detach) {
        this.detach = detach;
    }
    body(part) { }
}
