/**
 * Utility constants and functions
 */
import { AnyVal, ArrayOrObject, Callback, Comparator, HashFunction, RawArray, RawObject } from "./types";
export declare const MAX_INT = 2147483647;
export declare const MIN_INT = -2147483648;
export declare const MAX_LONG: number;
export declare const MIN_LONG: number;
/** Options to resolve() and resolveGraph() functions */
interface ResolveOptions {
    unwrapArray?: boolean;
    preserveMissing?: boolean;
    preserveKeys?: boolean;
}
/**
 * Compare function which adheres to MongoDB comparison order.
 *
 * @param a The first value
 * @param b The second value
 * @returns {Number}
 */
export declare const DEFAULT_COMPARATOR: (a: AnyVal, b: AnyVal) => number;
export declare function assert(condition: boolean, message: string): void;
/**
 * Deep clone an object
 */
export declare function cloneDeep(obj: AnyVal): AnyVal;
/**
 * Returns the name of type as specified in the tag returned by a call to Object.prototype.toString
 * @param v A value
 */
export declare function getType(v: AnyVal): string;
export declare function isBoolean(v: AnyVal): v is boolean;
export declare function isString(v: AnyVal): v is string;
export declare function isNumber(v: AnyVal): v is number;
export declare const isArray: (arg: any) => arg is any[];
export declare function isObject(v: AnyVal): v is object;
export declare function isObjectLike(v: AnyVal): boolean;
export declare function isDate(v: AnyVal): v is Date;
export declare function isRegExp(v: AnyVal): v is RegExp;
export declare function isFunction(v: AnyVal): boolean;
export declare function isNil(v: AnyVal): boolean;
export declare function inArray(arr: AnyVal[], item: AnyVal): boolean;
export declare function notInArray(arr: RawArray, item: AnyVal): boolean;
export declare function truthy(arg: AnyVal): boolean;
export declare function isEmpty(x: AnyVal): boolean;
export declare function isMissing(m: AnyVal): boolean;
export declare function ensureArray(x: AnyVal): RawArray;
export declare function has(obj: RawObject, prop: string): boolean;
/**
 * Transform values in an object
 *
 * @param  {Object}   obj   An object whose values to transform
 * @param  {Function} fn The transform function
 * @return {Array|Object} Result object after applying the transform
 */
export declare function objectMap(obj: RawObject, fn: Callback<AnyVal>): RawObject;
/** Options to merge function */
interface MergeOptions {
    readonly flatten?: boolean;
}
/**
 * Deep merge objects or arrays.
 * When the inputs have unmergeable types, the source value (right hand side) is returned.
 * If inputs are arrays of same length and all elements are mergable, elements in the same position are merged together.
 * If AnyVal of the elements are unmergeable, elements in the source are appended to the target.
 * @param target {Object|Array} the target to merge into
 * @param obj {Object|Array} the source object
 */
export declare function merge(target: ArrayOrObject, obj: ArrayOrObject, options?: MergeOptions): ArrayOrObject;
/**
 * Returns the intersection of multiple arrays.
 *
 * @param  {Array} a The first array
 * @param  {Array} b The second array
 * @param  {Function} hashFunction Custom function to hash values, default the hashCode method
 * @return {Array}    Result array
 */
export declare function intersection(input: RawArray[], hashFunction?: HashFunction): RawArray;
/**
 * Flatten the array
 *
 * @param  {Array} xs The array to flatten
 * @param {Number} depth The number of nested lists to iterate
 */
export declare function flatten(xs: RawArray, depth: number): RawArray;
/**
 * Determine whether two values are the same or strictly equivalent
 *
 * @param  {*}  a The first value
 * @param  {*}  b The second value
 * @return {Boolean}   Result of comparison
 */
export declare function isEqual(a: AnyVal, b: AnyVal): boolean;
/**
 * Return a new unique version of the collection
 * @param  {Array} xs The input collection
 * @return {Array}
 */
export declare function unique(xs: RawArray, hashFunction?: HashFunction): RawArray;
/**
 * Encode value to string using a simple non-colliding stable scheme.
 *
 * @param value
 * @returns {*}
 */
export declare function stringify(value: AnyVal): string;
/**
 * Generate hash code
 * This selected function is the result of benchmarking various hash functions.
 * This version performs well and can hash 10^6 documents in ~3s with on average 100 collisions.
 *
 * @param value
 * @returns {number|null}
 */
export declare function hashCode(value: AnyVal, hashFunction?: HashFunction): string | null;
/**
 * Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee
 *
 * This implementation treats null/undefined sort keys as less than every other type
 *
 * @param {Array}   collection
 * @param {Function} keyFn The sort key function used to resolve sort keys
 * @param {Function} comparator The comparator function to use for comparing keys. Defaults to standard comparison via `compare(...)`
 * @return {Array} Returns a new sorted array by the given key and comparator function
 */
export declare function sortBy(collection: RawArray, keyFn: Callback<AnyVal>, comparator?: Comparator<AnyVal>): RawArray;
/**
 * Groups the collection into sets by the returned key
 *
 * @param collection
 * @param keyFn {Function} to compute the group key of an item in the collection
 * @returns {{keys: Array, groups: Array}}
 */
export declare function groupBy(collection: RawArray, keyFn: Callback<AnyVal>, hashFunction?: HashFunction): {
    keys: RawArray;
    groups: RawArray[];
};
/**
 * Merge elements into the dest
 *
 * @param {*} target The target object
 * @param {*} rest The array of elements to merge into dest
 */
export declare function into(target: ArrayOrObject, ...rest: Array<ArrayOrObject>): ArrayOrObject;
/**
 * This is a generic memoization function
 *
 * This implementation uses a cache independent of the function being memoized
 * to allow old values to be garbage collected when the memoized function goes out of scope.
 *
 * @param {*} fn The function object to memoize
 */
export declare function memoize(fn: Callback<AnyVal>, hashFunction?: HashFunction): Callback<AnyVal>;
/**
 * Resolve the value of the field (dot separated) on the given object
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 * @returns {*}
 */
export declare function resolve(obj: ArrayOrObject, selector: string, options?: ResolveOptions): AnyVal;
/**
 * Returns the full object to the resolved value given by the selector.
 * This function excludes empty values as they aren't practically useful.
 *
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 */
export declare function resolveGraph(obj: ArrayOrObject, selector: string, options?: ResolveOptions): ArrayOrObject;
/**
 * Filter out all MISSING values from the object in-place
 *
 * @param obj The object to filter
 */
export declare function filterMissing(obj: ArrayOrObject): void;
interface WalkOptions {
    buildGraph?: boolean;
    descendArray?: boolean;
}
/**
 * Set the value of the given object field
 *
 * @param obj {Object|Array} the object context
 * @param selector {String} path to field
 * @param value {*} the value to set
 */
export declare function setValue(obj: RawObject, selector: string, value: AnyVal): void;
/**
 * Removes an element from the container.
 * If the selector resolves to an array and the leaf is a non-numeric key,
 * the remove operation will be performed on objects of the array.
 *
 * @param obj {ArrayOrObject} object or array
 * @param selector {String} dot separated path to element to remove
 */
export declare function removeValue(obj: ArrayOrObject, selector: string, options?: Pick<WalkOptions, "descendArray">): void;
/**
 * Check whether the given name passes for an operator. We assume AnyVal field name starting with '$' is an operator.
 * This is cheap and safe to do since keys beginning with '$' should be reserved for internal use.
 * @param {String} name
 */
export declare function isOperator(name: string): boolean;
/**
 * Simplify expression for easy evaluation with query operators map
 * @param expr
 * @returns {*}
 */
export declare function normalize(expr: AnyVal): AnyVal;
export {};
