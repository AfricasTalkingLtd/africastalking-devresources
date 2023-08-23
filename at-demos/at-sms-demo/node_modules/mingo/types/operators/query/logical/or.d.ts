import { Options } from "../../../core";
import { Callback, RawObject } from "../../../types";
/**
 * Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $or(selector: string, value: Array<RawObject>, options?: Options): Callback<boolean>;
