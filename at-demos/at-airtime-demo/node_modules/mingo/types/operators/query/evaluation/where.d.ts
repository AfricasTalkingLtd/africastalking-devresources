import { Options } from "../../../core";
import { AnyVal, Callback } from "../../../types";
/**
 * Matches documents that satisfy a JavaScript expression.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $where(selector: string, value: AnyVal, options?: Options): Callback<boolean>;
