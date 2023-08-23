"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$subtract = void 0;
var core_1 = require("../../../core");
/**
 * Takes an array that contains two numbers or two dates and subtracts the second value from the first.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $subtract(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    return args[0] - args[1];
}
exports.$subtract = $subtract;
