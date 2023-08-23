// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { ComputeOptions, computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
import { $first as __first } from "../../accumulator";
/**
 * Returns the first element in an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export function $first(obj, expr, options) {
    const copts = ComputeOptions.init(options);
    if (obj instanceof Array)
        return __first(obj, expr, copts.update());
    const arr = computeValue(obj, expr, null, options);
    if (isNil(arr))
        return null;
    assert(isArray(arr), "Must resolve to an array/null or missing");
    return __first(arr, "$$this", options);
}
