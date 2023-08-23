import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Compares two values and returns the result of the comparison as an integer.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
export declare function $cmp(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
