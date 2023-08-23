/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { computeValue } from "../../../core";
import { truthy } from "../../../util";
/**
 * Returns true if any elements of a set evaluate to true, and false otherwise.
 * @param obj
 * @param expr
 */
export function $anyElementTrue(obj, expr, options) {
    // mongodb nests the array expression in another
    const args = computeValue(obj, expr, null, options)[0];
    return args.some(truthy);
}
