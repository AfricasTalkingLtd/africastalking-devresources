import { $push } from "./push";
/**
 * Returns the highest value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export function $max(collection, expr, options) {
    const nums = $push(collection, expr, options);
    const n = nums.reduce((acc, n) => (n > acc ? n : acc), -Infinity);
    return n === -Infinity ? undefined : n;
}
