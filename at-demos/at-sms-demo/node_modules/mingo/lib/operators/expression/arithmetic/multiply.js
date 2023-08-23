"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$multiply = void 0;
var core_1 = require("../../../core");
/**
 * Computes the product of an array of numbers.
 *
 * @param obj
 * @param expr
 * @returns {Object}
 */
function $multiply(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    return args.reduce(function (acc, num) { return acc * num; }, 1);
}
exports.$multiply = $multiply;
