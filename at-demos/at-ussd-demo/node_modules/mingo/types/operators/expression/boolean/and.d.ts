import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns true only when all its expressions evaluate to true. Accepts any number of argument expressions.
 *
 * @param obj
 * @param expr
 * @returns {boolean}
 */
export declare function $and(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
