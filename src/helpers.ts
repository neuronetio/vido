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

export interface UnknownObject {
  [key: string]: unknown;
}

export function isPrimitive(value) {
  return (
    value === undefined ||
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint' ||
    typeof value === 'symbol'
  );
}

export function isObject(item) {
  if (isPrimitive(item)) return false;
  if (item && item.constructor) {
    return item.constructor.name === 'Object';
  }
  return typeof item === 'object' && item !== null;
}

function shouldMerge(item) {
  if (isPrimitive(item)) return false;
  return Array.isArray(item) || isObject(item);
}

export function mergeDeep<T>(target, ...sources): T {
  const source = sources.shift();
  // if (source && typeof source.clone === 'function') {
  //   target = source.clone();
  // } else
  if (isObject(source)) {
    if (!isObject(target)) {
      target = Object.create(null);
    }
    for (const key in source) {
      const value = source[key];
      if (shouldMerge(value)) {
        target[key] = mergeDeep(target[key], value);
      } else {
        target[key] = value;
      }
    }
  } else if (Array.isArray(source)) {
    const sourceLen = source.length;
    if (!Array.isArray(target)) {
      target = new Array(sourceLen);
    } else {
      target.length = sourceLen;
    }
    let index = 0;
    for (; index < sourceLen; index++) {
      const value = source[index];
      if (shouldMerge(value)) {
        target[index] = mergeDeep(target[index], value);
      } else {
        target[index] = value;
      }
    }
    // array has properties too
    // index++; // because length is also own property name - wee don't want to set this value
    // const arrayKeys = Object.getOwnPropertyNames(source);
    // if (arrayKeys.length > sourceLen + 1) {
    //   // +1 because of length Array property
    //   const arrayKeysLen = arrayKeys.length;
    //   for (; index < arrayKeysLen; index++) {
    //     const propName = arrayKeys[index];
    //     const value = source[propName];
    //     if (shouldMerge(value)) {
    //       target[propName] = mergeDeep(target[propName], value);
    //     } else {
    //       target[propName] = value;
    //     }
    //   }
    // }

    // lit templates array has a raw not enumerable property
    // @ts-ignore
    if (source.raw !== undefined) {
      // @ts-ignore
      target.raw = mergeDeep(target.raw, source.raw);
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
