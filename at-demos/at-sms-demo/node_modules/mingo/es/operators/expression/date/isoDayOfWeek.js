// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
import { computeDate } from "./_internal";
/**
 * Returns the weekday number in ISO 8601 format, ranging from 1 (Monday) to 7 (Sunday).
 * @param obj
 * @param expr
 */
export function $isoDayOfWeek(obj, expr, options) {
    return computeDate(obj, expr, options).getUTCDay() || 7;
}
