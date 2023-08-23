import { Options } from "../../../core";
import { Callback, RawObject } from "../../../types";
/**
 * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $and(selector: string, value: Array<RawObject>, options?: Options): Callback<boolean>;
