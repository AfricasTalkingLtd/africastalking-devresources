/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { computeValue } from "../../../core";
import { inArray } from "../../../util";
/**
 * Concatenates two strings.
 *
 * @param obj
 * @param expr
 * @returns {string|*}
 */
export function $concat(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    // does not allow concatenation with nulls
    if ([null, undefined].some(inArray.bind(null, args)))
        return null;
    return args.join("");
}
