import { Options } from "../../core";
import { AnyVal, RawObject } from "../../types";
/**
 * Returns the population covariance of two numeric expressions.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
export declare function $covariancePop(collection: RawObject[], expr: AnyVal, options?: Options): number;
