"use strict";
// Custom Aggregation Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#custom-aggregation-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$function = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Defines a custom function.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The expression for the operator
 * @param {Options} options Options
 */
function $function(obj, expr, options) {
    (0, util_1.assert)(options.scriptEnabled, "$function operator requires 'scriptEnabled' option to be true");
    var fn = (0, core_1.computeValue)(obj, expr, null, options);
    return fn.body.apply(null, fn.args);
}
exports.$function = $function;
