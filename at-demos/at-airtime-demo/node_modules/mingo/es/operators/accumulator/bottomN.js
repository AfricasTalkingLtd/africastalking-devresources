// https://www.mongodb.com/docs/manual/reference/operator/aggregation/bottomN/#mongodb-group-grp.-bottomN
import { Aggregator } from "../../aggregator";
import { ComputeOptions, computeValue } from "../../core";
import { $push } from "./push";
/**
 * Returns an aggregation of the bottom n elements within a group, according to the specified sort order.
 * If the group contains fewer than n elements, $bottomN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export function $bottomN(collection, expr, options) {
    const copts = ComputeOptions.init(options);
    const { n, sortBy } = computeValue(copts.local.groupId, expr, null, copts);
    const result = new Aggregator([{ $sort: sortBy }], copts.options).run(collection);
    const m = result.length;
    const p = n;
    return $push(m <= p ? result : result.slice(m - p), expr.output, copts);
}
