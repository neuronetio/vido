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
function isObject(item: unknown) {
  return item && typeof item === 'object' && item !== null && item.constructor && item.constructor.name === 'Object';
}

export interface UnknownObject {
  [key: string]: unknown;
}

/**
 * Merge deep - helper function which will merge objects recursively - creating brand new one - like clone
 *
 * @param {object} target
 * @params {[object]} sources
 * @returns {object}
 */
export function mergeDeep(target: any, ...sources: any[]): UnknownObject {
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (typeof source[key].clone === 'function') {
          target[key] = source[key].clone();
        } else {
          if (typeof target[key] === 'undefined') {
            target[key] = {};
          }
          target[key] = mergeDeep(target[key], source[key]);
        }
      } else if (Array.isArray(source[key])) {
        target[key] = new Array(source[key].length);
        let index = 0;
        for (let item of source[key]) {
          if (isObject(item)) {
            if (typeof item.clone === 'function') {
              target[key][index] = item.clone();
            } else {
              target[key][index] = mergeDeep({}, item);
            }
          } else {
            target[key][index] = item;
          }
          index++;
        }
      } else {
        target[key] = source[key];
      }
    }
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
export function clone(source: object) {
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
