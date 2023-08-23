// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { computeValue } from "../../../core";
import { isArray } from "../../../util";
/**
 * Counts and returns the total the number of items in an array.
 *
 * @param obj
 * @param expr
 */
export function $size(obj, expr, options) {
    const value = computeValue(obj, expr, null, options);
    return isArray(value) ? value.length : undefined;
}
