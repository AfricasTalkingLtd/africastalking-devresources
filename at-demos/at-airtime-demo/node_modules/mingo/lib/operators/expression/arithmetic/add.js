"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$add = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Computes the sum of an array of numbers.
 *
 * @param obj
 * @param expr
 * @returns {Object}
 */
function $add(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var foundDate = false;
    var result = args.reduce(function (acc, val) {
        if ((0, util_1.isDate)(val)) {
            (0, util_1.assert)(!foundDate, "'$add' can only have one date value");
            foundDate = true;
            val = val.getTime();
        }
        // assume val is a number
        acc += val;
        return acc;
    }, 0);
    return foundDate ? new Date(result) : result;
}
exports.$add = $add;
