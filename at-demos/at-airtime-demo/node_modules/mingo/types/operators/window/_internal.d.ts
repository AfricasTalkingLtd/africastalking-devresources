import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
import { WindowOperatorInput } from "../pipeline/_internal";
export type TimeUnit = "week" | "day" | "hour" | "minute" | "second" | "millisecond";
export declare const MILLIS_PER_UNIT: Record<TimeUnit, number>;
/** Returns the position of a document in the $setWindowFields stage partition. */
export declare function rank(obj: RawObject, collection: RawObject[], expr: WindowOperatorInput, options: Options, dense: boolean): AnyVal;
