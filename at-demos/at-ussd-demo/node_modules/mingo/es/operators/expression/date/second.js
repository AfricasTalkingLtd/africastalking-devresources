// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
import { computeDate } from "./_internal";
/**
 * Returns the seconds for a date as a number between 0 and 60 (leap seconds).
 * @param obj
 * @param expr
 */
export function $second(obj, expr, options) {
    return computeDate(obj, expr, options).getUTCSeconds();
}
