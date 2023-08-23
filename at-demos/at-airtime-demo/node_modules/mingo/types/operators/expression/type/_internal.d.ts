import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
export declare class TypeConvertError extends Error {
    constructor(message: string);
}
export declare function toInteger(obj: RawObject, expr: AnyVal, options: Options, max: number, min: number, typename: string): number | null;
