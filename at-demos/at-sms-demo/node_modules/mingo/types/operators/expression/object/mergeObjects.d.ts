import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Combines multiple documents into a single document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
export declare function $mergeObjects(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
