import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Limits the number of elements projected from an array. Supports skip and limit slices.
 *
 * @param obj
 * @param field
 * @param expr
 */
export declare function $slice(obj: RawObject, expr: AnyVal, field: string, options?: Options): AnyVal;
