/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns elements of a set that do not appear in a second set.
 * @param obj
 * @param expr
 */
export declare function $setDifference(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
