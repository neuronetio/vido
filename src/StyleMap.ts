import { Directive, Part, AttributePart } from 'lit-html/directive';
import { PropertiesHyphenFallback as CSSProp } from 'csstype';

export default class StyleMap extends Directive {
  public style: CSSProp = {};
  private previous = {};
  private detach: boolean = false;
  private toRemove: string[] = [];
  private toUpdate: string[] = [];
  private debug = false;

  update(part: AttributePart, props: unknown[]) {
    this.previous = {};
    this.style = props[0] as CSSProp;
    this.detach = (props[1] as boolean) ?? false;
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
          if (!this.toRemove.includes(name)) this.toRemove.push(name);
        }
      }
    }

    for (const name in previous) {
      if (!this.style.hasOwnProperty(name)) continue;
      // @ts-ignore
      if (this.style[name] === undefined) {
        if (!this.toRemove.includes(name)) this.toRemove.push(name);
      }
    }
    for (const name in this.style) {
      if (!this.style.hasOwnProperty(name)) continue;
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
      if (this.detach && parent) {
        // @ts-ignore
        parent.insertBefore(element, nextSibling);
      }
      this.previous = { ...this.style };
    }
    return this.render(this.style, this.detach);
  }

  render(styleMap: CSSProp, detach: boolean = false) {}

  public setStyle(styleInfo: CSSProp) {
    this.style = styleInfo;
  }

  public setDebug(debug = true) {
    this.debug = debug;
  }

  public setDetach(detach: boolean) {
    this.detach = detach;
  }

  public body(part: Part) {}
}
