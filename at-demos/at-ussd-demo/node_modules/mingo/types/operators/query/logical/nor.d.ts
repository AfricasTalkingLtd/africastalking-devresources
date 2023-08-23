import { Options } from "../../../core";
import { Callback, RawObject } from "../../../types";
/**
 * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $nor(selector: string, value: Array<RawObject>, options?: Options): Callback<boolean>;
