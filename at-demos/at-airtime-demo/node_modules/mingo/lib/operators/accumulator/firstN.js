"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$firstN = void 0;
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN/
var core_1 = require("../../core");
var push_1 = require("./push");
/**
 * Returns an aggregation of the first n elements within a group. The elements returned are meaningful only if in a specified sort order.
 * If the group contains fewer than n elements, $firstN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
function $firstN(collection, expr, options) {
    var _a;
    var copts = core_1.ComputeOptions.init(options);
    var m = collection.length;
    var n = (0, core_1.computeValue)((_a = copts === null || copts === void 0 ? void 0 : copts.local) === null || _a === void 0 ? void 0 : _a.groupId, expr.n, null, copts);
    return (0, push_1.$push)(m <= n ? collection : collection.slice(0, n), expr.input, options);
}
exports.$firstN = $firstN;
