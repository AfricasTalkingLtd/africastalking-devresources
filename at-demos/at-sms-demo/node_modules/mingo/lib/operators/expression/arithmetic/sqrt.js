"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sqrt = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Calculates the square root of a positive number and returns the result as a double.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $sqrt(obj, expr, options) {
    var n = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(n))
        return null;
    (0, util_1.assert)(((0, util_1.isNumber)(n) && n > 0) || isNaN(n), "$sqrt expression must resolve to non-negative number.");
    return Math.sqrt(n);
}
exports.$sqrt = $sqrt;
