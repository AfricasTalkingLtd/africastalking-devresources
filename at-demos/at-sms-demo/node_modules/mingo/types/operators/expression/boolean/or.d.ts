import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns true when any of its expressions evaluates to true. Accepts any number of argument expressions.
 *
 * @param obj
 * @param expr
 * @returns {boolean}
 */
export declare function $or(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
