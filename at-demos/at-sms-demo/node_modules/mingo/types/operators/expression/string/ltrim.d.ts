/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Removes whitespace characters, including null, or the specified characters from the beginning of a string.
 *
 * @param obj
 * @param expr
 */
export declare function $ltrim(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
