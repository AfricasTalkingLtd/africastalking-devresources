// https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN-array-element/#mongodb-expression-exp.-firstN
import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $firstN as __firstN } from "../../accumulator/firstN";
/**
 * Returns a specified number of elements from the beginning of an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export function $firstN(obj, expr, options) {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return __firstN(obj, expr, options);
    const { input, n } = computeValue(obj, expr, null, options);
    if (isNil(input))
        return null;
    assert(isArray(input), "Must resolve to an array/null or missing");
    return __firstN(input, { n, input: "$$this" }, options);
}
