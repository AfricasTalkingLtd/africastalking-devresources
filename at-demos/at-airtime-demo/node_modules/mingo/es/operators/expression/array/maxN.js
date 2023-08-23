// https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN-array-element/
import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $maxN as __maxN } from "../../accumulator/maxN";
/**
 * Returns the n largest values in an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export function $maxN(obj, expr, options) {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return __maxN(obj, expr, options);
    const { input, n } = computeValue(obj, expr, null, options);
    if (isNil(input))
        return null;
    assert(isArray(input), "Must resolve to an array/null or missing");
    return __maxN(input, { n, input: "$$this" }, options);
}
