"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bottomN = void 0;
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/bottomN/#mongodb-group-grp.-bottomN
var aggregator_1 = require("../../aggregator");
var core_1 = require("../../core");
var push_1 = require("./push");
/**
 * Returns an aggregation of the bottom n elements within a group, according to the specified sort order.
 * If the group contains fewer than n elements, $bottomN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
function $bottomN(collection, expr, options) {
    var copts = core_1.ComputeOptions.init(options);
    var _a = (0, core_1.computeValue)(copts.local.groupId, expr, null, copts), n = _a.n, sortBy = _a.sortBy;
    var result = new aggregator_1.Aggregator([{ $sort: sortBy }], copts.options).run(collection);
    var m = result.length;
    var p = n;
    return (0, push_1.$push)(m <= p ? result : result.slice(m - p), expr.output, copts);
}
exports.$bottomN = $bottomN;
