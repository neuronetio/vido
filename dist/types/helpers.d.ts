/**
 * Schedule - a throttle function that uses requestAnimationFrame to limit the rate at which a function is called.
 *
 * @param {function} fn
 * @returns {function}
 */
export declare function schedule(fn: (argument: unknown) => void | any): (argument: unknown) => void;
export interface UnknownObject {
    [key: string]: unknown;
}
export declare function isPrimitive(value: any): boolean;
export declare function isObject(item: any): boolean;
export declare function mergeDeep<T>(target: any, ...sources: any[]): T;
/**
 * Clone helper function
 *
 * @param source
 * @returns {object} cloned source
 */
export declare function clone<T>(source: object): T;
declare const _default: {
    mergeDeep: typeof mergeDeep;
    clone: typeof clone;
    schedule: typeof schedule;
};
export default _default;
