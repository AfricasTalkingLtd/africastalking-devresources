/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, ArrayOrObject, RawObject } from "../../../types";
/**
 * A ternary operator that evaluates one expression,
 * and depending on the result returns the value of one following expressions.
 *
 * @param obj
 * @param expr
 */
export declare function $cond(obj: RawObject, expr: ArrayOrObject, options?: Options): AnyVal;
