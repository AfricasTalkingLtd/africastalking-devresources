"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$stdDevPop = void 0;
var util_1 = require("../../util");
var _internal_1 = require("./_internal");
var push_1 = require("./push");
/**
 * Returns the population standard deviation of the input values.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @return {Number}
 */
function $stdDevPop(collection, expr, options) {
    return (0, _internal_1.stddev)((0, push_1.$push)(collection, expr, options).filter(util_1.isNumber), false);
}
exports.$stdDevPop = $stdDevPop;
