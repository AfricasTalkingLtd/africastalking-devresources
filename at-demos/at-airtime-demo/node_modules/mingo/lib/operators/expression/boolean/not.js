"use strict";
// Boolean Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#boolean-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$not = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Returns the boolean value that is the opposite of its argument expression. Accepts a single argument expression.
 *
 * @param obj RawObject from collection
 * @param expr Right hand side expression of operator
 * @returns {boolean}
 */
function $not(obj, expr, options) {
    var booleanExpr = (0, util_1.ensureArray)(expr);
    // array values are truthy so an emty array is false
    if (booleanExpr.length == 0)
        return false;
    // use provided value non-array value
    if (booleanExpr.length == 1)
        return !(0, core_1.computeValue)(obj, booleanExpr[0], null, options);
    // expects a single argument
    throw "Expression $not takes exactly 1 argument";
}
exports.$not = $not;
