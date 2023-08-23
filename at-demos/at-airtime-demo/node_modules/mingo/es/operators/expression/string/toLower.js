/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { computeValue } from "../../../core";
import { isEmpty } from "../../../util";
/**
 * Converts a string to lowercase.
 *
 * @param obj
 * @param expr
 * @returns {string}
 */
export function $toLower(obj, expr, options) {
    const value = computeValue(obj, expr, null, options);
    return isEmpty(value) ? "" : value.toLowerCase();
}
