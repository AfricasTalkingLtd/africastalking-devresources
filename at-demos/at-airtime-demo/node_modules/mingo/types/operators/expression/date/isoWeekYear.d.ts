import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns the year number in ISO 8601 format. The year starts with the Monday of week 1 and ends with the Sunday of the last week.
 * @param obj
 * @param expr
 */
export declare function $isoWeekYear(obj: RawObject, expr: AnyVal, options?: Options): number;
