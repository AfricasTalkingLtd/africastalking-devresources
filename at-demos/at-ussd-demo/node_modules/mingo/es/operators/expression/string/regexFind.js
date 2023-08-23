/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { regexSearch } from "./_internal";
/**
 * Applies a regular expression (regex) to a string and returns information on the first matched substring.
 *
 * @param obj
 * @param expr
 */
export function $regexFind(obj, expr, options) {
    const result = regexSearch(obj, expr, options, { global: false });
    return result.length === 0 ? null : result[0];
}
