/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { computeValue } from "../../../core";
import { isNil } from "../../../util";
import { $dateToString } from "../date/dateToString";
export function $toString(obj, expr, options) {
    const val = computeValue(obj, expr, null, options);
    if (isNil(val))
        return null;
    if (val instanceof Date) {
        const dateExpr = {
            date: expr,
            format: "%Y-%m-%dT%H:%M:%S.%LZ",
        };
        return $dateToString(obj, dateExpr, options);
    }
    else {
        return val.toString();
    }
}
