// https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN
import { ComputeOptions, computeValue } from "../../core";
import { DEFAULT_COMPARATOR, isNil } from "../../util";
import { $push } from "./push";
/**
 * Returns an aggregation of the minimum value n elements within a group.
 * If the group contains fewer than n elements, $minN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export function $minN(collection, expr, options) {
    const copts = ComputeOptions.init(options);
    const m = collection.length;
    const n = computeValue(copts?.local?.groupId, expr.n, null, copts);
    const arr = $push(collection, expr.input, options).filter((o) => !isNil(o));
    arr.sort(DEFAULT_COMPARATOR);
    return m <= n ? arr : arr.slice(0, n);
}
