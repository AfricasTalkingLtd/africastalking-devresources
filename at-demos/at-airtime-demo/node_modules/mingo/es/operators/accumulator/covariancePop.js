import { covariance } from "./_internal";
import { $push } from "./push";
/**
 * Returns the population covariance of two numeric expressions.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
export function $covariancePop(collection, expr, options) {
    return covariance($push(collection, expr, options), false);
}
