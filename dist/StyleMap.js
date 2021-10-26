import { Directive, directive } from 'lit-html/directive.js';
import { noChange } from 'lit-html';
const elements = new WeakMap();
class _StyleMap extends Directive {
    update(part, params) {
        const styleMap = params[0];
        styleMap.execute(part);
        return noChange;
    }
    render(styleMap) {
        return styleMap.toString();
    }
}
export class StyleMap {
    constructor(styleInfo, options = { schedule: false }) {
        this.schedule = false;
        this.style = styleInfo;
        this._directive = directive(_StyleMap);
        this.execute = this.execute.bind(this);
        this.schedule = options.schedule;
    }
    directive() {
        return this._directive(this);
    }
    setStyle(styleInfo) {
        this.style = styleInfo;
    }
    toString() {
        return Object.keys(this.style).reduce((style, prop) => {
            const value = this.style[prop];
            if (value == null) {
                return style;
            }
            // Convert property names from camel-case to dash-case, i.e.:
            //  `backgroundColor` -> `background-color`
            // Vendor-prefixed names need an extra `-` appended to front:
            //  `webkitAppearance` -> `-webkit-appearance`
            // Exception is any property name containing a dash, including
            // custom properties; we assume these are already dash-cased i.e.:
            //  `--my-button-color` --> `--my-button-color`
            prop = prop.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, '-$&').toLowerCase();
            return style + `${prop}:${value};`;
        }, '');
    }
    updateStyle(elementStyle, currentElementStyles, style, element) {
        const previous = style.previousStyle;
        for (const name of currentElementStyles) {
            if (name && this.style[name] === undefined) {
                if (!style.toRemove.includes(name))
                    style.toRemove.push(name);
            }
        }
        for (const name in previous) {
            if (!name)
                continue;
            if (!(name in this.style))
                continue;
            // @ts-ignore
            if (this.style[name] === undefined && currentElementStyles.includes(name)) {
                if (!style.toRemove.includes(name))
                    style.toRemove.push(name);
            }
        }
        for (const name in this.style) {
            if (!name)
                continue;
            if (!(name in this.style))
                continue;
            const value = this.style[name];
            if (!value)
                continue;
            const prev = previous[name];
            if (prev !== undefined && prev === value && currentElementStyles.includes(name)) {
                continue;
            }
            style.toUpdate.push(name);
        }
        if (style.toRemove.length || style.toUpdate.length) {
            for (const name of style.toRemove) {
                elementStyle.removeProperty(name);
                if (elementStyle[name])
                    delete elementStyle[name];
                style.elementStyles = style.elementStyles.filter((cur) => cur !== name);
            }
            for (const name of style.toUpdate) {
                const value = this.style[name];
                if (!value)
                    continue;
                if (!name.includes('-')) {
                    elementStyle[name] = value;
                }
                else {
                    elementStyle.setProperty(name, value);
                }
                if (!style.elementStyles.includes(name))
                    style.elementStyles.push(name);
            }
            style.previousStyle = Object.assign({}, this.style);
        }
    }
    execute(part) {
        const element = part.element;
        let style;
        if (!elements.has(element)) {
            style = {
                toUpdate: [],
                toRemove: [],
                previousStyle: {},
                elementStyles: [],
                styleTaken: false,
            };
            elements.set(element, style);
        }
        else {
            style = elements.get(element);
        }
        style.toRemove.length = 0;
        style.toUpdate.length = 0;
        const elementStyle = element.style;
        let currentElementStyles;
        if (!style.styleTaken) {
            style.elementStyles = currentElementStyles = [];
            for (let i = style.length; i--;) {
                currentElementStyles.push(elementStyle[i]);
            }
            style.styleTaken = true;
        }
        else {
            currentElementStyles = style.elementStyles;
        }
        if (this.schedule) {
            requestAnimationFrame(() => {
                this.updateStyle(elementStyle, currentElementStyles, style, element);
            });
        }
        else {
            this.updateStyle(elementStyle, currentElementStyles, style, element);
        }
        elements.set(element, style);
    }
}
