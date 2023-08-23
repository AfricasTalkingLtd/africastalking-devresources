import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Applies an expression to each element in an array and combines them into a single value.
 *
 * @param {Object} obj
 * @param {*} expr
 */
export declare function $reduce(obj: RawObject, expr: RawObject, options?: Options): AnyVal;
