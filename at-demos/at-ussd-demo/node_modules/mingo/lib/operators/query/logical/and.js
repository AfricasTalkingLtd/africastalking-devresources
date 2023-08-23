"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$and = void 0;
var query_1 = require("../../../query");
var util_1 = require("../../../util");
/**
 * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
function $and(selector, value, options) {
    (0, util_1.assert)((0, util_1.isArray)(value), "Invalid expression: $and expects value to be an Array");
    var queries = new Array();
    value.forEach(function (expr) { return queries.push(new query_1.Query(expr, options)); });
    return function (obj) {
        for (var i = 0; i < queries.length; i++) {
            if (!queries[i].test(obj)) {
                return false;
            }
        }
        return true;
    };
}
exports.$and = $and;
