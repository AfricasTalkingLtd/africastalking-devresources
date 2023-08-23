import { isNumber } from "../../util";
import { stddev } from "./_internal";
import { $push } from "./push";
/**
 * Returns the sample standard deviation of the input values.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
export function $stdDevSamp(collection, expr, options) {
    return stddev($push(collection, expr, options).filter(isNumber), true);
}
