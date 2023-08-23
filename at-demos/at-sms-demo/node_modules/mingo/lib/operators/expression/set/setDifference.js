"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setDifference = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Returns elements of a set that do not appear in a second set.
 * @param obj
 * @param expr
 */
function $setDifference(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    return args[0].filter(util_1.notInArray.bind(null, args[1]));
}
exports.$setDifference = $setDifference;
