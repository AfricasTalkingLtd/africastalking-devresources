import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns the week of the year for a date as a number between 0 and 53.
 * Weeks begin on Sundays, and week 1 begins with the first Sunday of the year. Days preceding the first Sunday of the year are in week 0
 * @param obj
 * @param expr
 */
export declare function $week(obj: RawObject, expr: AnyVal, options?: Options): number;
