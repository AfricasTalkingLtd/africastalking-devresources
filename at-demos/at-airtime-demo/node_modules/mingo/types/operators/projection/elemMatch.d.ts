import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Projects only the first element from an array that matches the specified $elemMatch condition.
 *
 * @param obj
 * @param field
 * @param expr
 * @returns {*}
 */
export declare function $elemMatch(obj: RawObject, expr: RawObject, field: string, options?: Options): AnyVal;
