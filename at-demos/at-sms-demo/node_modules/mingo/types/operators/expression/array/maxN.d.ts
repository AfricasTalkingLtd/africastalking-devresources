import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
interface InputExpr {
    n: AnyVal;
    input: AnyVal;
}
/**
 * Returns the n largest values in an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export declare function $maxN(obj: RawObject, expr: InputExpr, options?: Options): AnyVal;
export {};
