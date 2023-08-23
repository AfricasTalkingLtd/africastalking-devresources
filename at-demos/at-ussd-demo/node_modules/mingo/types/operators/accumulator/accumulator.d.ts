import { Options } from "../../core";
import { AnyVal, Callback, RawArray, RawObject } from "../../types";
interface AccumulatorExpr {
    /** Function used to initialize the state. */
    readonly init: Callback<AnyVal>;
    /** Arguments passed to the init function. */
    readonly initArgs?: RawArray;
    /** Function used to accumulate documents.*/
    readonly accumulate: Callback<AnyVal>;
    /** Arguments passed to the accumulate function. */
    readonly accumulateArgs: RawArray;
    /** unused */
    readonly merge?: Callback<AnyVal>;
    /** Function used to update the result of the accumulation. */
    readonly finalize?: Callback<AnyVal>;
    readonly lang: "js";
}
/**
 * Defines a custom accumulator function.
 *
 * @param {Array} collection The input array
 * @param {*} expr The expression for the operator
 * @param {Options} options Options
 */
export declare function $accumulator(collection: RawObject[], expr: AccumulatorExpr, options?: Options): AnyVal;
export {};
