"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$size = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Counts and returns the total the number of items in an array.
 *
 * @param obj
 * @param expr
 */
function $size(obj, expr, options) {
    var value = (0, core_1.computeValue)(obj, expr, null, options);
    return (0, util_1.isArray)(value) ? value.length : undefined;
}
exports.$size = $size;
