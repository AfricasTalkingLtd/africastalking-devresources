// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { ComputeOptions, computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $last as __last } from "../../accumulator";
/**
 * Returns the last element in an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export function $last(obj, expr, options) {
    const copts = ComputeOptions.init(options);
    if (obj instanceof Array)
        return __last(obj, expr, copts.update());
    const arr = computeValue(obj, expr, null, options);
    if (isNil(arr))
        return null;
    assert(isArray(arr), "Must resolve to an array/null or missing");
    return __last(arr, "$$this", options);
}
