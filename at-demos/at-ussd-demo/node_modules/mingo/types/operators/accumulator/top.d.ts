import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Returns the top element within a group according to the specified sort order.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export declare function $top(collection: RawObject[], expr: {
    sortBy: Record<string, number>;
    output: AnyVal;
}, options?: Options): AnyVal[];
