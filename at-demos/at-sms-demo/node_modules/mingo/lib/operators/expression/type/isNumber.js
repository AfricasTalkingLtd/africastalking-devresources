"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isNumber = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Checks if the specified expression resolves to a numeric value
 *
 * @param obj
 * @param expr
 */
function $isNumber(obj, expr, options) {
    var n = (0, core_1.computeValue)(obj, expr, null, options);
    return (0, util_1.isNumber)(n);
}
exports.$isNumber = $isNumber;
