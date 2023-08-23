import { Options } from "../../../core";
import { AnyVal, Callback } from "../../../types";
/**
 * Inverts the effect of a query expression and returns documents that do not match the query expression.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $not(selector: string, value: AnyVal, options?: Options): Callback<boolean>;
