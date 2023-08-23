import { Options } from "../../../core";
import { AnyVal } from "../../../types";
export type Duration = "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second" | "millisecond";
export declare const isLeapYear: (year: number) => boolean;
export declare const getDayOfYear: (d: Date) => number;
export declare function isoWeek(d: Date): number;
export declare function isoWeekYear(d: Date): number;
export declare const MINUTES_PER_HOUR = 60;
export declare const MILLIS_PER_DAY: number;
export declare const DURATION_IN_MILLIS: Record<string, number>;
export declare const DATE_FORMAT = "%Y-%m-%dT%H:%M:%S.%LZ";
export declare const DATE_PART_INTERVAL: (string | number)[][];
export interface DatePartFormatter {
    name: string;
    padding: number;
    re: RegExp;
}
export declare const DATE_SYM_TABLE: Record<string, DatePartFormatter>;
/**
 * Parse and return the timezone string as a number
 * @param tzstr Timezone string matching '+/-hh[:][mm]'
 */
export declare function parseTimezone(tzstr?: string): number;
/**
 * Formats the timezone for output
 * @param tz A timezone object
 */
export declare function formatTimezone(minuteOffset: number): string;
/**
 * Adjust the date by the given timezone
 * @param d Date object
 * @param minuteOffset number
 */
export declare function adjustDate(d: Date, minuteOffset: number): void;
/**
 * Computes a date expression
 * @param obj The target object
 * @param expr Any value that resolves to a valid date expression. Valid expressions include a number, Date, or Object{date: number|Date, timezone?: string}
 */
export declare function computeDate(obj: AnyVal, expr: AnyVal, options?: Options): Date;
export declare function padDigits(n: number, digits: number): string;
export declare function regexQuote(s: string): string;
export declare function regexStrip(s: string): string;
