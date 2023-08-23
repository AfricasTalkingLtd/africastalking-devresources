import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Return a value without parsing.
 * @param obj
 * @param expr
 * @param options
 */
export declare function $literal(obj: RawObject, expr: AnyVal, options?: Options): AnyVal;
