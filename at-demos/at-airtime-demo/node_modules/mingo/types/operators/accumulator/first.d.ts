import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Returns the first value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @returns {*}
 */
export declare function $first(collection: RawObject[], expr: AnyVal, options?: Options): AnyVal;
