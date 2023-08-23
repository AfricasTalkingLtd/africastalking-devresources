import { Options } from "../../../core";
import { AnyVal, Callback, RawArray, RawObject } from "../../../types";
interface FunctionExpr {
    readonly body: Callback<AnyVal>;
    readonly args: RawArray;
    readonly lang: "js";
}
/**
 * Defines a custom function.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The expression for the operator
 * @param {Options} options Options
 */
export declare function $function(obj: RawObject, expr: FunctionExpr, options?: Options): AnyVal;
export {};
