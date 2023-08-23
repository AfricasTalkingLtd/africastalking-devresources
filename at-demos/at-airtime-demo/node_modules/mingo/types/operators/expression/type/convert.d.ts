/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Converts a value to a specified type.
 *
 * @param obj
 * @param expr
 */
export declare function $convert(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
