import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Returns the sum of all the values in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @returns {Number}
 */
export declare function $sum(collection: RawObject[], expr: AnyVal, options?: Options): number;
