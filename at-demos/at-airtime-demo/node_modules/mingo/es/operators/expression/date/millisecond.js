// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
import { computeDate } from "./_internal";
/**
 * Returns the milliseconds of a date as a number between 0 and 999.
 * @param obj
 * @param expr
 */
export function $millisecond(obj, expr, options) {
    return computeDate(obj, expr, options).getUTCMilliseconds();
}
