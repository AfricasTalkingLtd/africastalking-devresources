// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
import { assert, isFunction } from "../../../util";
/* eslint-disable */
/**
 * Matches documents that satisfy a JavaScript expression.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export function $where(selector, value, options) {
    assert(options.scriptEnabled, "$where operator requires 'scriptEnabled' option to be true");
    const f = value;
    assert(isFunction(f), "$where only accepts a Function object");
    return (obj) => f.call(obj) === true;
}
