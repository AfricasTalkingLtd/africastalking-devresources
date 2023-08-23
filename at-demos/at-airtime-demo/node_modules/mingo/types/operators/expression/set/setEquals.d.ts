/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns true if two sets have the same elements.
 * @param obj
 * @param expr
 */
export declare function $setEquals(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
