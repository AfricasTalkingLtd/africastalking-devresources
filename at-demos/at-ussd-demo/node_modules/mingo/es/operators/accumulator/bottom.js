import { $bottomN } from "./bottomN";
/**
 * Returns the bottom element within a group according to the specified sort order.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export function $bottom(collection, expr, options) {
    return $bottomN(collection, { ...expr, n: 1 }, options);
}
