"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toUpper = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Converts a string to uppercase.
 *
 * @param obj
 * @param expr
 * @returns {string}
 */
function $toUpper(obj, expr, options) {
    var value = (0, core_1.computeValue)(obj, expr, null, options);
    return (0, util_1.isEmpty)(value) ? "" : value.toUpperCase();
}
exports.$toUpper = $toUpper;
