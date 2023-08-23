import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
import { WindowOperatorInput } from "../pipeline/_internal";
/** Returns the document position relative to other documents in the $setWindowFields stage partition. */
export declare function $denseRank(obj: RawObject, collection: RawObject[], expr: WindowOperatorInput, options: Options): AnyVal;
