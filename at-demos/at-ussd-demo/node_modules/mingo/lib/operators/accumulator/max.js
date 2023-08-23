"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$max = void 0;
var push_1 = require("./push");
/**
 * Returns the highest value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
function $max(collection, expr, options) {
    var nums = (0, push_1.$push)(collection, expr, options);
    var n = nums.reduce(function (acc, n) { return (n > acc ? n : acc); }, -Infinity);
    return n === -Infinity ? undefined : n;
}
exports.$max = $max;
