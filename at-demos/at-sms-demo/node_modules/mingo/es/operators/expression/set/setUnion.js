/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { computeValue } from "../../../core";
import { assert, isArray, unique } from "../../../util";
/**
 * Returns a set that holds all elements of the input sets.
 * @param obj
 * @param expr
 */
export function $setUnion(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    assert(isArray(args) && args.length == 2 && args.every(isArray), "$setUnion: arguments must be arrays");
    return unique(args[0].concat(args[1]), options?.hashFunction);
}
