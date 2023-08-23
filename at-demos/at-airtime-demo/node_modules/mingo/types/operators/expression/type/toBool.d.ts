/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Converts a value to a boolean.
 *
 * @param obj
 * @param expr
 */
export declare function $toBool(obj: RawObject, expr: AnyVal, options?: Options): boolean | null;
