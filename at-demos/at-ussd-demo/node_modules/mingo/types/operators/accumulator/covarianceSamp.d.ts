import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Returns the sample covariance of two numeric expressions.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
export declare function $covarianceSamp(collection: RawObject[], expr: AnyVal, options?: Options): number;
