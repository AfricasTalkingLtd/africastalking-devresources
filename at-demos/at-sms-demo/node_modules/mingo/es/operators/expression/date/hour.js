// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
import { computeDate } from "./_internal";
/**
 * Returns the hour for a date as a number between 0 and 23.
 * @param obj
 * @param expr
 */
export function $hour(obj, expr, options) {
    return computeDate(obj, expr, options).getUTCHours();
}
