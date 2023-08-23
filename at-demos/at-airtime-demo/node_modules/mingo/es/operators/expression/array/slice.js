// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { computeValue } from "../../../core";
import { assert, isNil } from "../../../util";
/**
 * Returns a subset of an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export function $slice(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    const arr = args[0];
    let skip = args[1];
    let limit = args[2];
    // MongoDB $slice works a bit differently from Array.slice
    // Uses single argument for 'limit' and array argument [skip, limit]
    if (isNil(limit)) {
        if (skip < 0) {
            skip = Math.max(0, arr.length + skip);
            limit = arr.length - skip + 1;
        }
        else {
            limit = skip;
            skip = 0;
        }
    }
    else {
        if (skip < 0) {
            skip = Math.max(0, arr.length + skip);
        }
        assert(limit > 0, `Invalid argument for $slice operator. Limit must be a positive number`);
        limit += skip;
    }
    return arr.slice(skip, limit);
}
