/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns the common elements of the input sets.
 * @param obj
 * @param expr
 */
export declare function $setIntersection(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
