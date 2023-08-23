import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Returns an average of all the values in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {Number}
 */
export declare function $avg(collection: RawObject[], expr: AnyVal, options?: Options): number;
