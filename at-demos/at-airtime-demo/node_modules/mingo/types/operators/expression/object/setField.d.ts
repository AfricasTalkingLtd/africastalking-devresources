import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
interface InputExpr {
    readonly field: string;
    readonly input: RawObject;
    readonly value: AnyVal;
}
/**
 * Adds, updates, or removes a specified field in a document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
export declare function $setField(obj: RawObject, expr: InputExpr, options?: Options): AnyVal;
export {};
