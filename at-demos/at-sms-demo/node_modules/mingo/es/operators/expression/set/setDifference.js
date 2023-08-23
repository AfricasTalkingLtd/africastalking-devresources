/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { computeValue } from "../../../core";
import { notInArray } from "../../../util";
/**
 * Returns elements of a set that do not appear in a second set.
 * @param obj
 * @param expr
 */
export function $setDifference(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    return args[0].filter(notInArray.bind(null, args[1]));
}
