import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
interface InputExpr {
    n: AnyVal;
    sortBy: Record<string, number>;
    output: AnyVal;
}
/**
 * Returns an aggregation of the top n elements within a group, according to the specified sort order.
 * If the group contains fewer than n elements, $topN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export declare function $topN(collection: RawObject[], expr: InputExpr, options?: Options): AnyVal[];
export {};
