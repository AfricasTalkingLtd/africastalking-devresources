/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Checks if the specified expression resolves to a numeric value
 *
 * @param obj
 * @param expr
 */
export declare function $isNumber(obj: RawObject, expr: AnyVal, options?: Options): boolean | null;
