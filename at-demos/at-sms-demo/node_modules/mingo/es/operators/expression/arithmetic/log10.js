// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
import { computeValue } from "../../../core";
import { assert, isNil, isNumber } from "../../../util";
/**
 * Calculates the log base 10 of a number and returns the result as a double.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
export function $log10(obj, expr, options) {
    const n = computeValue(obj, expr, null, options);
    if (isNil(n))
        return null;
    assert(isNumber(n) || isNaN(n), "$log10 expression must resolve to a number.");
    return Math.log10(n);
}
