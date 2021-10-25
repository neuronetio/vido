import { Directive, directive, AttributePart } from 'lit-html/directive.js';
import { noChange } from 'lit-html';
import { StyleInfo } from './vido';
import { schedule as _schedule } from './helpers';

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
  public style: StyleInfo;
  private _directive;
  private schedule = false;

  constructor(styleInfo, options: { schedule: boolean } = { schedule: false }) {
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

  updateStyle(elementStyle, currentElementStyles, styleParts) {
    for (const part of styleParts) {
      if (!part) continue;
      let [name, value] = part.split(':');
      name = name.trim().toLowerCase();
      value = value.trim().toLowerCase();
      if (name) currentElementStyles[name] = value;
    }
    for (const name in currentElementStyles) {
      const camelCase = name
        .split('-')
        .map((p, i) => (i >= 0 ? p[0].toUpperCase() + p.substring(1) : p))
        .join();
      if (this.style[name] === undefined && this.style[camelCase] === undefined) {
        if (!name.includes('-')) {
          delete elementStyle[name];
        } else {
          elementStyle.removeProperty(name);
        }
      }
    }
    for (const name in this.style) {
      const value = this.style[name].toLowerCase().trim();
      if (currentElementStyles[name] === value) {
        continue;
      }
      if (!name.includes('-')) {
        elementStyle[name] = value;
      } else {
        elementStyle.setProperty(name, value);
      }
    }
  }

  execute(part: AttributePart) {
    const elementStyle = part.element.style;
    let currentElementStyles = {};
    const styleParts = elementStyle.cssText.split(';');
    if (this.schedule) {
      requestAnimationFrame(() => {
        this.updateStyle(elementStyle, currentElementStyles, styleParts);
      });
    } else {
      this.updateStyle(elementStyle, currentElementStyles, styleParts);
    }
  }
}
