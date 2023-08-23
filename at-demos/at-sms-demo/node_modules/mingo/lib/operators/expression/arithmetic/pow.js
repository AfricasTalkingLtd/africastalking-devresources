"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$pow = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Raises a number to the specified exponent and returns the result.
 *
 * @param obj
 * @param expr
 * @returns {Object}
 */
function $pow(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    (0, util_1.assert)((0, util_1.isArray)(args) && args.length === 2 && args.every(util_1.isNumber), "$pow expression must resolve to array(2) of numbers");
    (0, util_1.assert)(!(args[0] === 0 && args[1] < 0), "$pow cannot raise 0 to a negative exponent");
    return Math.pow(args[0], args[1]);
}
exports.$pow = $pow;
