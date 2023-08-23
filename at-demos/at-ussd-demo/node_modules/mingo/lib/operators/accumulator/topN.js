"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$topN = void 0;
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/topN/#mongodb-group-grp.-topN
var aggregator_1 = require("../../aggregator");
var core_1 = require("../../core");
var push_1 = require("./push");
/**
 * Returns an aggregation of the top n elements within a group, according to the specified sort order.
 * If the group contains fewer than n elements, $topN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
function $topN(collection, expr, options) {
    var copts = core_1.ComputeOptions.init(options);
    var _a = (0, core_1.computeValue)(copts.local.groupId, expr, null, copts), n = _a.n, sortBy = _a.sortBy;
    var result = new aggregator_1.Aggregator([{ $sort: sortBy }, { $limit: n }], copts.options).run(collection);
    return (0, push_1.$push)(result, expr.output, copts);
}
exports.$topN = $topN;
