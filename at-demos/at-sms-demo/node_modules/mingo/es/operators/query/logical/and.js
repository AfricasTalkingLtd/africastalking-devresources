// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
import { Query } from "../../../query";
import { assert, isArray } from "../../../util";
/**
 * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export function $and(selector, value, options) {
    assert(isArray(value), "Invalid expression: $and expects value to be an Array");
    const queries = new Array();
    value.forEach((expr) => queries.push(new Query(expr, options)));
    return (obj) => {
        for (let i = 0; i < queries.length; i++) {
            if (!queries[i].test(obj)) {
                return false;
            }
        }
        return true;
    };
}
