import { Options } from "../../../core";
import { AnyVal, RawArray, RawObject } from "../../../types";
/**
 * Trims the resolved string
 *
 * @param obj
 * @param expr
 * @param options
 */
export declare function trimString(obj: RawObject, expr: AnyVal, options: Options, trimOpts: {
    left: boolean;
    right: boolean;
}): string;
/**
 * Performs a regex search
 *
 * @param obj
 * @param expr
 * @param opts
 */
export declare function regexSearch(obj: RawObject, expr: AnyVal, options: Options, reOpts: {
    global: boolean;
}): RawArray | undefined;
