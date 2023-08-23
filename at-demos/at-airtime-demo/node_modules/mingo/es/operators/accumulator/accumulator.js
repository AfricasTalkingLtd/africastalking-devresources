// Custom Aggregation Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#custom-aggregation-expression-operators
import { ComputeOptions, computeValue } from "../../core";
import { assert } from "../../util";
/**
 * Defines a custom accumulator function.
 *
 * @param {Array} collection The input array
 * @param {*} expr The expression for the operator
 * @param {Options} options Options
 */
export function $accumulator(collection, expr, options) {
    assert(options.scriptEnabled, "$accumulator operator requires 'scriptEnabled' option to be true");
    if (collection.length == 0)
        return expr.initArgs;
    const copts = ComputeOptions.init(options);
    const initArgs = computeValue({}, expr.initArgs || [], null, copts.update(copts?.local?.groupId || {}));
    let state = expr.init.call(null, ...initArgs);
    for (const doc of collection) {
        // get arguments for document
        const args = computeValue(doc, expr.accumulateArgs, null, copts.update(doc));
        // update the state with each documents value
        state = expr.accumulate.call(null, ...[state, ...args]);
    }
    return (expr.finalize ? expr.finalize.call(null, state) : state);
}
