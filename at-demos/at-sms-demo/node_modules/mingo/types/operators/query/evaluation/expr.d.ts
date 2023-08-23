import { Options } from "../../../core";
import { AnyVal, Callback } from "../../../types";
/**
 * Allows the use of aggregation expressions within the query language.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $expr(selector: string, value: AnyVal, options?: Options): Callback<boolean>;
