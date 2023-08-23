"use strict";
// Comparison Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#comparison-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$cmp = void 0;
var core_1 = require("../../../core");
/**
 * Compares two values and returns the result of the comparison as an integer.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $cmp(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    if (args[0] > args[1])
        return 1;
    if (args[0] < args[1])
        return -1;
    return 0;
}
exports.$cmp = $cmp;
