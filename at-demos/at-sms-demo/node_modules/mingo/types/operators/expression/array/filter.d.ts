import { Options } from "../../../core";
import { AnyVal, RawArray, RawObject } from "../../../types";
/**
 * Selects a subset of the array to return an array with only the elements that match the filter condition.
 *
 * @param  {Object} obj  [description]
 * @param  {*} expr [description]
 * @return {*}      [description]
 */
export declare function $filter(obj: RawObject, expr: {
    input: RawArray;
    as: string;
    cond: AnyVal;
}, options?: Options): RawArray;
