"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$not = void 0;
var query_1 = require("../../../query");
var util_1 = require("../../../util");
/**
 * Inverts the effect of a query expression and returns documents that do not match the query expression.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
function $not(selector, value, options) {
    var criteria = {};
    criteria[selector] = (0, util_1.normalize)(value);
    var query = new query_1.Query(criteria, options);
    return function (obj) { return !query.test(obj); };
}
exports.$not = $not;
