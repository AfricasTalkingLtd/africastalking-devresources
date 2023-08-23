/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { computeValue } from "../../../core";
import { isNil, isString } from "../../../util";
/**
 * Converts a value to a boolean.
 *
 * @param obj
 * @param expr
 */
export function $toBool(obj, expr, options) {
    const val = computeValue(obj, expr, null, options);
    if (isNil(val))
        return null;
    if (isString(val))
        return true;
    return Boolean(val);
}
