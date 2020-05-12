import { Directive } from 'lit-html-optimised';
export default class StyleMap extends Directive {
    constructor(styleInfo, detach = false) {
        super();
        this.toRemove = [];
        this.toUpdate = [];
        this.debug = false;
        this.previous = {};
        this.style = styleInfo;
        this.detach = detach;
    }
    setStyle(styleInfo) {
        this.style = styleInfo;
    }
    setDebug(debug = true) {
        this.debug = debug;
    }
    setDetach(detach) {
        this.detach = detach;
    }
    body(part) {
        this.toRemove.length = 0;
        this.toUpdate.length = 0;
        // @ts-ignore
        const element = part.committer.element;
        const elementStyle = element.style;
        let previous = this.previous;
        if (element.attributes.getNamedItem('style')) {
            const currentElementStyles = element.attributes
                .getNamedItem('style')
                .value.split(';')
                .map((item) => item.substr(0, item.indexOf(':')).trim())
                .filter((item) => !!item);
            for (const name of currentElementStyles) {
                if (this.style[name] === undefined) {
                    if (!this.toRemove.includes(name))
                        this.toRemove.push(name);
                }
            }
        }
        for (const name in previous) {
            if (!this.style.hasOwnProperty(name))
                continue;
            if (this.style[name] === undefined) {
                if (!this.toRemove.includes(name))
                    this.toRemove.push(name);
            }
        }
        for (const name in this.style) {
            if (!this.style.hasOwnProperty(name))
                continue;
            const value = this.style[name];
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
                if (elementStyle[name])
                    delete elementStyle[name];
            }
            for (const name of this.toUpdate) {
                const value = this.style[name];
                if (!name.includes('-')) {
                    elementStyle[name] = value;
                }
                else {
                    elementStyle.setProperty(name, value);
                }
            }
            if (this.detach && parent) {
                parent.insertBefore(element, nextSibling);
            }
            this.previous = Object.assign({}, this.style);
        }
    }
}
