// https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN-array-element/
import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $minN as __minN } from "../../accumulator/minN";
/**
 * Returns the n smallest values in an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export function $minN(obj, expr, options) {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return __minN(obj, expr, options);
    const { input, n } = computeValue(obj, expr, null, options);
    if (isNil(input))
        return null;
    assert(isArray(input), "Must resolve to an array/null or missing");
    return __minN(input, { n, input: "$$this" }, options);
}
