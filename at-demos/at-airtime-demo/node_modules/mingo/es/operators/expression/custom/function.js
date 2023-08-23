// Custom Aggregation Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#custom-aggregation-expression-operators
import { computeValue } from "../../../core";
import { assert } from "../../../util";
/**
 * Defines a custom function.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The expression for the operator
 * @param {Options} options Options
 */
export function $function(obj, expr, options) {
    assert(options.scriptEnabled, "$function operator requires 'scriptEnabled' option to be true");
    const fn = computeValue(obj, expr, null, options);
    return fn.body.apply(null, fn.args);
}
