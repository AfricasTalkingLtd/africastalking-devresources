"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$log = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Calculates the log of a number in the specified base and returns the result as a double.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $log(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var msg = "$log expression must resolve to array(2) of numbers";
    (0, util_1.assert)((0, util_1.isArray)(args) && args.length === 2, msg);
    if (args.some(util_1.isNil))
        return null;
    (0, util_1.assert)(args.some(isNaN) || args.every(util_1.isNumber), msg);
    return Math.log10(args[0]) / Math.log10(args[1]);
}
exports.$log = $log;
