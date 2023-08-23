import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
interface InputExpr {
    dateString?: string;
    timezone?: string;
    format?: string;
    onError?: AnyVal;
    onNull?: AnyVal;
}
/**
 * Converts a date/time string to a date object.
 * @param obj
 * @param expr
 */
export declare function $dateFromString(obj: RawObject, expr: InputExpr, options?: Options): AnyVal;
export {};
