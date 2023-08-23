/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { computeValue } from "../../../core";
import { isNumber } from "../../../util";
/**
 * Checks if the specified expression resolves to a numeric value
 *
 * @param obj
 * @param expr
 */
export function $isNumber(obj, expr, options) {
    const n = computeValue(obj, expr, null, options);
    return isNumber(n);
}
