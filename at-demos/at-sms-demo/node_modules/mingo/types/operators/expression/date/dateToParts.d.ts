import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns a document that contains the constituent parts of a given Date value as individual properties.
 * The properties returned are year, month, day, hour, minute, second and millisecond.
 *
 * @param obj
 * @param expr
 * @param options
 */
export declare function $dateToParts(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
