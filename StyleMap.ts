import { Directive, Part } from 'lit-html-optimised';
import { PropertiesHyphenFallback as CSSProp } from 'csstype';

const toRemove = [],
  toUpdate = [];

export default class StyleMap extends Directive {
  public style: CSSProp;
  private previous: {};
  private detach: boolean;

  constructor(styleInfo: CSSProp, detach: boolean = false) {
    super();
    this.previous = {};
    this.style = styleInfo;
    this.detach = detach;
  }

  public setStyle(styleInfo: CSSProp) {
    this.style = styleInfo;
  }

  public setDetach(detach) {
    this.detach = detach;
  }

  public body(part: Part) {
    toRemove.length = 0;
    toUpdate.length = 0;
    // @ts-ignore
    const element = part.committer.element;
    const style = element.style;
    let previous = this.previous;
    for (const name in previous) {
      if (this.style[name] === undefined) {
        toRemove.push(name);
      }
    }
    for (const name in this.style) {
      const value = this.style[name];
      const prev = previous[name];
      if (prev !== undefined && prev === value) {
        continue;
      }
      toUpdate.push(name);
    }

    if (toRemove.length || toUpdate.length) {
      let parent, nextSibling;
      if (this.detach) {
        parent = element.parentNode;
        if (parent) {
          nextSibling = element.nextSibling;
          element.remove();
        }
      }
      for (const name of toRemove) {
        style.removeProperty(name);
      }
      for (const name of toUpdate) {
        const value = this.style[name];
        if (!name.includes('-')) {
          style[name] = value;
        } else {
          style.setProperty(name, value);
        }
      }
      if (this.detach && parent) {
        parent.insertBefore(element, nextSibling);
      }
      this.previous = { ...this.style };
    }
  }
}
