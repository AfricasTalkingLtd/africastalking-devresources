/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Replaces the first instance of a matched string in a given input.
 *
 * @param  {Object} obj
 * @param  {Array} expr
 */
export declare function $replaceOne(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
