"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$mod = void 0;
var core_1 = require("../../../core");
/**
 * Takes two numbers and calculates the modulo of the first number divided by the second.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $mod(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    return args[0] % args[1];
}
exports.$mod = $mod;
