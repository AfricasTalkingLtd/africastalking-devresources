import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Searches an array for an occurrence of a specified value and returns the array index of the first occurrence.
 * If the substring is not found, returns -1.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export declare function $indexOfArray(obj: RawObject, expr: AnyVal, options?: Options): number;
