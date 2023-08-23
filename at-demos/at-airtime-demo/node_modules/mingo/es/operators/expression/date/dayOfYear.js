// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
import { computeDate, getDayOfYear } from "./_internal";
/**
 * Returns the day of the year for a date as a number between 1 and 366 (leap year).
 * @param obj
 * @param expr
 */
export function $dayOfYear(obj, expr, options) {
    return getDayOfYear(computeDate(obj, expr, options));
}
