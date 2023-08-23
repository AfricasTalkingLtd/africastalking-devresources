"use strict";
/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ifNull = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Evaluates an expression and returns the first non-null value.
 *
 * @param obj
 * @param expr
 * @returns {*}
 */
function $ifNull(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    return args.find(function (arg) { return !(0, util_1.isNil)(arg); });
}
exports.$ifNull = $ifNull;
