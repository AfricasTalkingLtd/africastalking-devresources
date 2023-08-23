"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isArray = void 0;
var core_1 = require("../../../core");
/**
 * Determines if the operand is an array. Returns a boolean.
 *
 * @param  {Object}  obj
 * @param  {*}  expr
 * @return {Boolean}
 */
function $isArray(obj, expr, options) {
    return (0, core_1.computeValue)(obj, expr[0], null, options) instanceof Array;
}
exports.$isArray = $isArray;
