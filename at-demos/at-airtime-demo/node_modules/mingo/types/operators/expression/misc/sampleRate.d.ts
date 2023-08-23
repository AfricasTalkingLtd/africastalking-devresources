import { Options } from "../../../core";
import { RawObject } from "../../../types";
/**
 * Randomly select documents at a given rate.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
export declare const $sampleRate: (obj: RawObject, expr: number, options?: Options) => boolean;
