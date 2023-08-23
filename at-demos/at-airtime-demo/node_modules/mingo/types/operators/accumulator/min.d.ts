import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Returns the lowest value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} The options to use for this operator
 * @returns {*}
 */
export declare function $min(collection: RawObject[], expr: AnyVal, options?: Options): AnyVal;
