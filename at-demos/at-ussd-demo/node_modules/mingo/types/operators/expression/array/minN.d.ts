import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
interface InputExpr {
    n: AnyVal;
    input: AnyVal;
}
/**
 * Returns the n smallest values in an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export declare function $minN(obj: RawObject, expr: InputExpr, options?: Options): AnyVal;
export {};
