"use strict";
// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$where = void 0;
var util_1 = require("../../../util");
/* eslint-disable */
/**
 * Matches documents that satisfy a JavaScript expression.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
function $where(selector, value, options) {
    (0, util_1.assert)(options.scriptEnabled, "$where operator requires 'scriptEnabled' option to be true");
    var f = value;
    (0, util_1.assert)((0, util_1.isFunction)(f), "$where only accepts a Function object");
    return function (obj) { return f.call(obj) === true; };
}
exports.$where = $where;
