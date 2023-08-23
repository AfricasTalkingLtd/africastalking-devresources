"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$avg = void 0;
var util_1 = require("../../util");
var push_1 = require("./push");
/**
 * Returns an average of all the values in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {Number}
 */
function $avg(collection, expr, options) {
    var data = (0, push_1.$push)(collection, expr, options).filter(util_1.isNumber);
    var sum = data.reduce(function (acc, n) { return acc + n; }, 0);
    return sum / (data.length || 1);
}
exports.$avg = $avg;
