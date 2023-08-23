/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { computeValue } from "../../../core";
import { intersection, unique } from "../../../util";
/**
 * Returns true if two sets have the same elements.
 * @param obj
 * @param expr
 */
export function $setEquals(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    const xs = unique(args[0], options?.hashFunction);
    const ys = unique(args[1], options?.hashFunction);
    return (xs.length === ys.length &&
        xs.length === intersection([xs, ys], options?.hashFunction).length);
}
