/**
 * Schedule - a throttle function that uses requestAnimationFrame to limit the rate at which a function is called.
 *
 * @param {function} fn
 * @returns {function}
 */
export declare function schedule(fn: (argument: any) => void | any): (argument: any) => void;
/**
 * Merge deep - helper function which will merge objects recursively - creating brand new one - like clone
 *
 * @param {object} target
 * @params {[object]} sources
 * @returns {object}
 */
export declare function mergeDeep(target: any, ...sources: any[]): any;
/**
 * Clone helper function
 *
 * @param source
 * @returns {object} cloned source
 */
export declare function clone(source: any): any;
declare const _default: {
    mergeDeep: typeof mergeDeep;
    clone: typeof clone;
    schedule: typeof schedule;
};
export default _default;
