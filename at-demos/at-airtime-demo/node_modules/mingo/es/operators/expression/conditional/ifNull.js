/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
import { computeValue } from "../../../core";
import { isNil } from "../../../util";
/**
 * Evaluates an expression and returns the first non-null value.
 *
 * @param obj
 * @param expr
 * @returns {*}
 */
export function $ifNull(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    return args.find((arg) => !isNil(arg));
}
