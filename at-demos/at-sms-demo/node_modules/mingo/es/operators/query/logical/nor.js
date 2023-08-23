// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
import { assert, isArray } from "../../../util";
import { $or } from "./or";
/**
 * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export function $nor(selector, value, options) {
    assert(isArray(value), "Invalid expression. $nor expects value to be an Array");
    const f = $or("$or", value, options);
    return (obj) => !f(obj);
}
