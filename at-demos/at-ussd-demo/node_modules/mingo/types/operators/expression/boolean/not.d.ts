import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns the boolean value that is the opposite of its argument expression. Accepts a single argument expression.
 *
 * @param obj RawObject from collection
 * @param expr Right hand side expression of operator
 * @returns {boolean}
 */
export declare function $not(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
