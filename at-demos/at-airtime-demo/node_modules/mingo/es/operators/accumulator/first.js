import { computeValue } from "../../core";
/**
 * Returns the first value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @returns {*}
 */
export function $first(collection, expr, options) {
    return collection.length > 0
        ? computeValue(collection[0], expr, null, options)
        : undefined;
}
