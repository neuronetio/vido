/**
 * Schedule - a throttle function that uses requestAnimationFrame to limit the rate at which a function is called.
 *
 * @param {function} fn
 * @returns {function}
 */
export function schedule(fn: (argument) => void | any) {
  let frameId = 0;
  function wrapperFn(argument) {
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
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function getArray(source): any[] {
  const result = new Array(source.length);
  let index = 0;
  for (let item of source) {
    if (isObject(item)) {
      if (typeof item['clone'] === 'function') {
        result[index] = item.clone();
      } else {
        result[index] = mergeDeep({}, item);
      }
    } else {
      result[index] = item;
    }
    index++;
  }
  return result;
}

function setObject(source: object, target: unknown, key) {
  if (typeof target[key] === 'undefined') {
    target[key] = {};
  }
  if (typeof source['clone'] === 'function') {
    target[key] = source[key].clone();
  } else {
    target[key] = mergeDeep(target[key], source);
  }
}

/**
 * Merge deep - helper function which will merge objects recursively - creating brand new one - like clone
 *
 * @param {object} target
 * @params {object} sources
 * @returns {object}
 */
export function mergeDeep(target, ...sources) {
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        setObject(source[key], target, key);
      } else if (Array.isArray(source[key])) {
        target[key] = getArray(source[key]);
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
export function clone(source) {
  if (typeof source.actions !== 'undefined') {
    const actns = source.actions.map((action) => {
      const result = { ...action };
      const props = { ...result.props };
      delete props.state;
      delete props.api;
      delete result.element;
      result.props = props;
      return result;
    });
    source.actions = actns;
  }
  return mergeDeep({}, source);
}

export default {
  mergeDeep,
  clone,
  schedule,
};
