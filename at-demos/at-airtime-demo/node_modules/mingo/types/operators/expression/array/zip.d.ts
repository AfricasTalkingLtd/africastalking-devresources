import { Options } from "../../../core";
import { AnyVal, RawArray, RawObject } from "../../../types";
/**
 * Merge two lists together.
 *
 * Transposes an array of input arrays so that the first element of the output array would be an array containing,
 * the first element of the first input array, the first element of the second input array, etc.
 *
 * @param  {Obj} obj
 * @param  {*} expr
 * @return {*}
 */
export declare function $zip(obj: RawObject, expr: {
    inputs: RawArray;
    useLongestLength: boolean;
    defaults: AnyVal;
}, options?: Options): AnyVal;
