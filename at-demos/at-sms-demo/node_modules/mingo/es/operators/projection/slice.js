// $slice operator. https://docs.mongodb.com/manual/reference/operator/projection/slice/#proj._S_slice
import { isArray, resolve } from "../../util";
import { $slice as __slice } from "../expression/array/slice";
/**
 * Limits the number of elements projected from an array. Supports skip and limit slices.
 *
 * @param obj
 * @param field
 * @param expr
 */
export function $slice(obj, expr, field, options) {
    const xs = resolve(obj, field);
    const exprAsArray = expr;
    if (!isArray(xs))
        return xs;
    return __slice(obj, expr instanceof Array ? [xs, ...exprAsArray] : [xs, expr], options);
}
