import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Returns an array of all the unique values for the selected field among for each document in that group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export declare function $addToSet(collection: RawObject[], expr: AnyVal, options?: Options): RawObject[];
