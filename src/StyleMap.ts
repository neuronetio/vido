import { Directive, directive, AttributePart } from 'lit-html/directive.js';
import { noChange } from 'lit-html';
import { StyleInfo } from './vido';
class _StyleMap extends Directive {
  update(part: AttributePart, params: unknown[]) {
    const styleMap = params[0] as StyleMap;
    styleMap.execute(part);
    return noChange;
  }

  render(styleMap: StyleMap) {
    return styleMap.toString();
  }
}

export class StyleMap {
  private toRemove: string[];
  private toUpdate: string[];
  private previousStyle: StyleInfo;
  public style: StyleInfo;
  private _directive;

  constructor(styleInfo) {
    this.toRemove = [];
    this.toUpdate = [];
    this.previousStyle = {};
    this.style = styleInfo;
    this._directive = directive(_StyleMap);
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

  execute(part: AttributePart) {
    this.toRemove.length = 0;
    this.toUpdate.length = 0;
    const element = part.element;
    const elementStyle = element.style;
    const previous = this.previousStyle;
    if (element.attributes.getNamedItem('style')) {
      // @ts-ignore
      const currentElementStyles = element.attributes
        .getNamedItem('style')
        .value.split(';')
        .map((item) => item.substr(0, item.indexOf(':')).trim())
        .filter((item) => !!item);
      for (const name of currentElementStyles) {
        // @ts-ignore
        if (this.style[name] === undefined) {
          if (!this.toRemove.includes(name)) this.toRemove.push(name);
        }
      }
    }
    for (const name in previous) {
      if (!(name in this.style)) continue;
      // @ts-ignore
      if (this.style[name] === undefined) {
        if (!this.toRemove.includes(name)) this.toRemove.push(name);
      }
    }
    for (const name in this.style) {
      if (!(name in this.style)) continue;
      const value = this.style[name];
      const prev = previous[name];
      if (prev !== undefined && prev === value) {
        continue;
      }
      this.toUpdate.push(name);
    }
    if (this.toRemove.length || this.toUpdate.length) {
      for (const name of this.toRemove) {
        elementStyle.removeProperty(name);
        // @ts-ignore
        if (elementStyle[name]) delete elementStyle[name];
      }
      for (const name of this.toUpdate) {
        // @ts-ignore
        const value = this.style[name];
        if (!name.includes('-')) {
          // @ts-ignore
          elementStyle[name] = value;
        } else {
          elementStyle.setProperty(name, value);
        }
      }
      this.previousStyle = Object.assign({}, this.style);
    }
  }
}
