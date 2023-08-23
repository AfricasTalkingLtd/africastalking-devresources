// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
import { computeValue } from "../../../core";
import { $dateAdd } from "./dateAdd";
/**
 * Decrements a Date object by a specified number of time units.
 * @param obj
 * @param expr
 */
export function $dateSubtract(obj, expr, options) {
    const amount = computeValue(obj, expr?.amount, null, options);
    return $dateAdd(obj, { ...expr, amount: -1 * amount }, options);
}
