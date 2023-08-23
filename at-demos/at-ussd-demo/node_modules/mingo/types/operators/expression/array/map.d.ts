import { Options } from "../../../core";
import { AnyVal, RawArray, RawObject } from "../../../types";
/**
 * Applies a sub-expression to each element of an array and returns the array of resulting values in order.
 *
 * @param obj
 * @param expr
 * @returns {Array|*}
 */
export declare function $map(obj: RawObject, expr: {
    input: RawArray;
    as: string;
    in: AnyVal;
}, options?: Options): AnyVal;
