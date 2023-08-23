"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$allElementsTrue = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Returns true if all elements of a set evaluate to true, and false otherwise.
 * @param obj
 * @param expr
 */
function $allElementsTrue(obj, expr, options) {
    // mongodb nests the array expression in another
    var args = (0, core_1.computeValue)(obj, expr, null, options)[0];
    return args.every(util_1.truthy);
}
exports.$allElementsTrue = $allElementsTrue;
