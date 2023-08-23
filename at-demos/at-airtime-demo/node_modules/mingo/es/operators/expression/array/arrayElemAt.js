// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { computeValue } from "../../../core";
import { assert, isNil } from "../../../util";
/**
 * Returns the element at the specified array index.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export function $arrayElemAt(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    assert(args instanceof Array && args.length === 2, "$arrayElemAt expression must resolve to array(2)");
    if (args.some(isNil))
        return null;
    const index = args[1];
    const arr = args[0];
    if (index < 0 && Math.abs(index) <= arr.length) {
        return arr[(index + arr.length) % arr.length];
    }
    else if (index >= 0 && index < arr.length) {
        return arr[index];
    }
    return undefined;
}
