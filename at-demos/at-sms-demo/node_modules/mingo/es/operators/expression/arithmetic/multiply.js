// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
import { computeValue } from "../../../core";
/**
 * Computes the product of an array of numbers.
 *
 * @param obj
 * @param expr
 * @returns {Object}
 */
export function $multiply(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    return args.reduce((acc, num) => acc * num, 1);
}
