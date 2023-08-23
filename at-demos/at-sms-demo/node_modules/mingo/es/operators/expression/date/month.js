// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
import { computeDate } from "./_internal";
/**
 * Returns the month for a date as a number between 1 (January) and 12 (December).
 * @param obj
 * @param expr
 */
export function $month(obj, expr, options) {
    return computeDate(obj, expr, options).getUTCMonth() + 1;
}
