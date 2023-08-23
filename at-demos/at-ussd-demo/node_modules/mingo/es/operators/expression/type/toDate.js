/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { computeValue } from "../../../core";
import { isNil } from "../../../util";
import { TypeConvertError } from "./_internal";
/**
 * Converts a value to a date. If the value cannot be converted to a date, $toDate errors. If the value is null or missing, $toDate returns null.
 *
 * @param obj
 * @param expr
 */
export function $toDate(obj, expr, options) {
    const val = computeValue(obj, expr, null, options);
    if (val instanceof Date)
        return val;
    if (isNil(val))
        return null;
    const d = new Date(val);
    const n = d.getTime();
    if (!isNaN(n))
        return d;
    throw new TypeConvertError(`cannot convert '${val}' to date`);
}
