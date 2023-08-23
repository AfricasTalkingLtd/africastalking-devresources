// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
import { computeValue } from "../../../core";
import { assert, isNil, isNumber } from "../../../util";
/**
 * Raises Euler’s number (i.e. e ) to the specified exponent and returns the result.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
export function $exp(obj, expr, options) {
    const n = computeValue(obj, expr, null, options);
    if (isNil(n))
        return null;
    assert(isNumber(n) || isNaN(n), "$exp expression must resolve to a number.");
    return Math.exp(n);
}
