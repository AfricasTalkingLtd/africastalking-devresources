"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$nor = void 0;
var util_1 = require("../../../util");
var or_1 = require("./or");
/**
 * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
function $nor(selector, value, options) {
    (0, util_1.assert)((0, util_1.isArray)(value), "Invalid expression. $nor expects value to be an Array");
    var f = (0, or_1.$or)("$or", value, options);
    return function (obj) { return !f(obj); };
}
exports.$nor = $nor;
