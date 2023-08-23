/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawArray, RawObject } from "../../../types";
/**
 * Evaluates an expression and returns the first non-null value.
 *
 * @param obj
 * @param expr
 * @returns {*}
 */
export declare function $ifNull(obj: RawObject, expr: RawArray, options?: Options): AnyVal;
