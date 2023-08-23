"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sortByCount = void 0;
var group_1 = require("./group");
var sort_1 = require("./sort");
/**
 * Groups incoming documents based on the value of a specified expression,
 * then computes the count of documents in each distinct group.
 *
 * https://docs.mongodb.com/manual/reference/operator/aggregation/sortByCount/
 *
 * @param  {Array} collection
 * @param  {Object} expr
 * @param  {Object} options
 * @return {*}
 */
function $sortByCount(collection, expr, options) {
    var newExpr = { count: { $sum: 1 } };
    newExpr["_id"] = expr;
    return (0, sort_1.$sort)((0, group_1.$group)(collection, newExpr, options), { count: -1 }, options);
}
exports.$sortByCount = $sortByCount;
