import { Directive, Part } from 'lit-html';
export interface StyleInfo {
  [key: string]: string;
}

const toRemove = [],
  toUpdate = [];

export default class StyleMap extends Directive {
  previous: {};
  style: {};
  detach: boolean;

  constructor(styleInfo: StyleInfo, detach: boolean = false) {
    super();
    this.previous = {};
    this.style = styleInfo;
    this.detach = detach;
  }

  setStyle(styleInfo: StyleInfo) {
    this.style = styleInfo;
  }

  setDetach(detach) {
    this.detach = detach;
  }

  body(part: Part) {
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
