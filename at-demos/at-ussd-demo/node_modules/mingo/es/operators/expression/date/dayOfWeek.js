// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
import { computeDate } from "./_internal";
/**
 * Returns the day of the week for a date as a number between 1 (Sunday) and 7 (Saturday).
 * @param obj
 * @param expr
 */
export function $dayOfWeek(obj, expr, options) {
    return computeDate(obj, expr, options).getUTCDay() + 1;
}
