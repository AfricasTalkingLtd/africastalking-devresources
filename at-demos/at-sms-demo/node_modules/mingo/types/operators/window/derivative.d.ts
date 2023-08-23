import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
import { WindowOperatorInput } from "../pipeline/_internal";
/**
 * Returns the average rate of change within the specified window
 */
export declare function $derivative(obj: RawObject, collection: RawObject[], expr: WindowOperatorInput, options?: Options): AnyVal;
