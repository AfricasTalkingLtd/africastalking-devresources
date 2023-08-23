import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
import { WindowOperatorInput } from "../pipeline/_internal";
/**
 * Returns the exponential moving average of numeric expressions applied to documents
 * in a partition defined in the $setWindowFields stage.
 */
export declare function $expMovingAvg(obj: RawObject, collection: RawObject[], expr: WindowOperatorInput, options?: Options): AnyVal;
