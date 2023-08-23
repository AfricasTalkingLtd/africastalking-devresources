import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
import { WindowOperatorInput } from "../pipeline/_internal";
/**
 * Returns the approximation of the area under a curve.
 */
export declare function $integral(obj: RawObject, collection: RawObject[], expr: WindowOperatorInput, options?: Options): AnyVal;
