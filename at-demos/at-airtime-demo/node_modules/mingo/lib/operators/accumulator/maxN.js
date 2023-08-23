"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$maxN = void 0;
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN
var core_1 = require("../../core");
var util_1 = require("../../util");
var push_1 = require("./push");
/**
 * Returns an aggregation of the maxmimum value n elements within a group.
 * If the group contains fewer than n elements, $maxN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
function $maxN(collection, expr, options) {
    var _a;
    var copts = core_1.ComputeOptions.init(options);
    var m = collection.length;
    var n = (0, core_1.computeValue)((_a = copts === null || copts === void 0 ? void 0 : copts.local) === null || _a === void 0 ? void 0 : _a.groupId, expr.n, null, copts);
    var arr = (0, push_1.$push)(collection, expr.input, options).filter(function (o) { return !(0, util_1.isNil)(o); });
    arr.sort(util_1.DEFAULT_COMPARATOR);
    arr.reverse();
    return m <= n ? arr : arr.slice(0, n);
}
exports.$maxN = $maxN;
