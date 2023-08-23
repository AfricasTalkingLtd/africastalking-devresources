// Boolean Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#boolean-expression-operators
import { computeValue } from "../../../core";
import { truthy } from "../../../util";
/**
 * Returns true only when all its expressions evaluate to true. Accepts any number of argument expressions.
 *
 * @param obj
 * @param expr
 * @returns {boolean}
 */
export function $and(obj, expr, options) {
    const value = computeValue(obj, expr, null, options);
    return truthy(value) && value.every(truthy);
}
