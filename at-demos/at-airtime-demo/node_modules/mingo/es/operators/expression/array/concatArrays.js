// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { computeValue } from "../../../core";
import { assert, into, isArray, isNil } from "../../../util";
/**
 * Concatenates arrays to return the concatenated array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export function $concatArrays(obj, expr, options) {
    const arr = computeValue(obj, expr, null, options);
    assert(isArray(arr), "$concatArrays must resolve to an array");
    if (arr.some(isNil))
        return null;
    return arr.reduce((acc, item) => into(acc, item), []);
}
