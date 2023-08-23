import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Returns the highest value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export declare function $max(collection: RawObject[], expr: AnyVal, options?: Options): AnyVal;
