import { Directive, Part } from 'lit-html-optimised';
import { PropertiesHyphenFallback as CSSProp } from 'csstype';

export default class StyleMap extends Directive {
  public style: CSSProp;
  private previous: {};
  private detach: boolean;
  private toRemove = [];
  private toUpdate = [];

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
    this.toRemove.length = 0;
    this.toUpdate.length = 0;
    // @ts-ignore
    const element = part.committer.element;
    const style = element.style;
    let previous = this.previous;
    for (const name in previous) {
      if (!this.style.hasOwnProperty(name)) continue;
      if (this.style[name] === undefined) {
        this.toRemove.push(name);
      }
    }
    for (const name in this.style) {
      if (!this.style.hasOwnProperty(name)) continue;
      const value = this.style[name];
      const prev = previous[name];
      if (prev !== undefined && prev === value) {
        continue;
      }
      this.toUpdate.push(name);
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
        style.removeProperty(name);
      }
      for (const name of this.toUpdate) {
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
