// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { ComputeOptions, computeValue } from "../../../core";
import { assert, isArray } from "../../../util";
/**
 * Applies a sub-expression to each element of an array and returns the array of resulting values in order.
 *
 * @param obj
 * @param expr
 * @returns {Array|*}
 */
export function $map(obj, expr, options) {
    const input = computeValue(obj, expr.input, null, options);
    assert(isArray(input), `$map 'input' expression must resolve to an array`);
    const copts = ComputeOptions.init(options);
    const k = expr.as || "this";
    return input.map((o) => {
        return computeValue(obj, expr.in, null, copts.update(copts.root, {
            variables: { [k]: o },
        }));
    });
}
