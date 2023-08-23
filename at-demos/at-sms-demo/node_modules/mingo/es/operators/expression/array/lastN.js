// https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN-array-element/#mongodb-expression-exp.-lastN
import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $lastN as __lastN } from "../../accumulator/lastN";
/**
 * Returns a specified number of elements from the end of an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export function $lastN(obj, expr, options) {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return __lastN(obj, expr, options);
    const { input, n } = computeValue(obj, expr, null, options);
    if (isNil(input))
        return null;
    assert(isArray(input), "Must resolve to an array/null or missing");
    return __lastN(input, { n, input: "$$this" }, options);
}
