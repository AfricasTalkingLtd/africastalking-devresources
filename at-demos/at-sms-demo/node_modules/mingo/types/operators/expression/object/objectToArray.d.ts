import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Converts a document to an array of documents representing key-value pairs.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
export declare function $objectToArray(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
