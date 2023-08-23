// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { ComputeOptions, computeValue } from "../../../core";
import { assert, isArray } from "../../../util";
/**
 * Selects a subset of the array to return an array with only the elements that match the filter condition.
 *
 * @param  {Object} obj  [description]
 * @param  {*} expr [description]
 * @return {*}      [description]
 */
export function $filter(obj, expr, options) {
    const input = computeValue(obj, expr.input, null, options);
    assert(isArray(input), "$filter 'input' expression must resolve to an array");
    const copts = ComputeOptions.init(options, obj);
    const k = expr.as || "this";
    return input.filter((o) => computeValue(obj, expr.cond, null, copts.update(copts.root, {
        variables: { [k]: o },
    })) === true);
}
