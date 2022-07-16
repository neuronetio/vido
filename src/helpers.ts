/**
 * Schedule - a throttle function that uses requestAnimationFrame to limit the rate at which a function is called.
 *
 * @param {function} fn
 * @returns {function}
 */
export function schedule(fn: (argument: unknown) => void | any) {
  let frameId = 0;
  function wrapperFn(argument: unknown) {
    if (frameId) {
      return;
    }
    function executeFrame() {
      frameId = 0;
      fn.apply(undefined, [argument]);
    }
    frameId = requestAnimationFrame(executeFrame);
  }
  return wrapperFn;
}

/**
 * Is object - helper function to determine if specified variable is an object
 *
 * @param {any} item
 * @returns {boolean}
 */
function isObject(item: any) {
  if (item && item.constructor) {
    return item.constructor.name === 'Object';
  }
  return typeof item === 'object' && item !== null;
}

export interface UnknownObject {
  [key: string]: unknown;
}

function getEmpty(value: any, targetValue: any) {
  if (targetValue) return targetValue;
  if (Array.isArray(value)) return new Array(value.length);
  if (isObject(value)) return {};
  return value;
}

export function mergeDeep<T>(target: any, ...sources: any[]): T {
  const source = sources.shift();
  if (source && typeof source.clone === 'function') {
    target = source.clone();
  } else if (isObject(source)) {
    if (!target) {
      target = {};
    }
    for (const key in source) {
      const value = source[key];
      target[key] = mergeDeep(getEmpty(value, target[key]), value);
    }
  } else if (Array.isArray(source)) {
    if (!target || !Array.isArray(target)) {
      target = new Array(source.length);
    } else {
      target.length = source.length;
    }
    let index = 0;
    for (const value of source) {
      target[index] = mergeDeep(getEmpty(value, target[index]), value);
      index++;
    }
    // array has properties too
    index++; // because length is also own property name - wee don't want to set this value
    const arrayKeys = Object.getOwnPropertyNames(source);
    if (arrayKeys.length > source.length + 1) {
      // +1 because of length Array property
      const arrayKeysLen = arrayKeys.length;
      for (let i = index; i < arrayKeysLen; i++) {
        const propName = arrayKeys[i];
        const value = source[propName];
        target[propName] = mergeDeep(getEmpty(value, target[propName]), value);
      }
    }
  } else {
    target = source;
  }
  if (!sources.length) {
    return target;
  }
  return mergeDeep(target, ...sources);
}

/**
 * Clone helper function
 *
 * @param source
 * @returns {object} cloned source
 */
export function clone<T>(source: object): T {
  // @ts-ignore
  if (typeof source.actions !== 'undefined') {
    // @ts-ignore
    const actns = source.actions.map((action) => {
      const result = { ...action };
      const props = { ...result.props };
      delete props.state;
      delete props.api;
      delete result.element;
      result.props = props;
      return result;
    });
    // @ts-ignore
    source.actions = actns;
  }
  return mergeDeep({}, source);
}

export default {
  mergeDeep,
  clone,
  schedule,
};
