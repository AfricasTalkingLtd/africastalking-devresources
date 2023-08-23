// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
import { computeValue } from "../../../core";
/**
 * Allows the use of aggregation expressions within the query language.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export function $expr(selector, value, options) {
    return (obj) => computeValue(obj, value, null, options);
}
