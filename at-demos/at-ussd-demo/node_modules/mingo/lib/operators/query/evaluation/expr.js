"use strict";
// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$expr = void 0;
var core_1 = require("../../../core");
/**
 * Allows the use of aggregation expressions within the query language.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
function $expr(selector, value, options) {
    return function (obj) { return (0, core_1.computeValue)(obj, value, null, options); };
}
exports.$expr = $expr;
