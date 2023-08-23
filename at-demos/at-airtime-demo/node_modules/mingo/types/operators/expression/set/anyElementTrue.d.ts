/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns true if any elements of a set evaluate to true, and false otherwise.
 * @param obj
 * @param expr
 */
export declare function $anyElementTrue(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
