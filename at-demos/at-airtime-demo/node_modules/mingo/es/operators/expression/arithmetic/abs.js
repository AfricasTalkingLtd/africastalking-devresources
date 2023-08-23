// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
import { computeValue } from "../../../core";
import { isNil } from "../../../util";
/**
 * Returns the absolute value of a number.
 *
 * @param obj
 * @param expr
 * @return {Number|null|NaN}
 */
export function $abs(obj, expr, options) {
    const n = computeValue(obj, expr, null, options);
    return isNil(n) ? null : Math.abs(n);
}
