"use strict";
// Custom Aggregation Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#custom-aggregation-expression-operators
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$accumulator = void 0;
var core_1 = require("../../core");
var util_1 = require("../../util");
/**
 * Defines a custom accumulator function.
 *
 * @param {Array} collection The input array
 * @param {*} expr The expression for the operator
 * @param {Options} options Options
 */
function $accumulator(collection, expr, options) {
    var _a, _b;
    var _c;
    (0, util_1.assert)(options.scriptEnabled, "$accumulator operator requires 'scriptEnabled' option to be true");
    if (collection.length == 0)
        return expr.initArgs;
    var copts = core_1.ComputeOptions.init(options);
    var initArgs = (0, core_1.computeValue)({}, expr.initArgs || [], null, copts.update(((_c = copts === null || copts === void 0 ? void 0 : copts.local) === null || _c === void 0 ? void 0 : _c.groupId) || {}));
    var state = (_a = expr.init).call.apply(_a, __spreadArray([null], initArgs, false));
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var doc = collection_1[_i];
        // get arguments for document
        var args = (0, core_1.computeValue)(doc, expr.accumulateArgs, null, copts.update(doc));
        // update the state with each documents value
        state = (_b = expr.accumulate).call.apply(_b, __spreadArray([null], __spreadArray([state], args, true), false));
    }
    return (expr.finalize ? expr.finalize.call(null, state) : state);
}
exports.$accumulator = $accumulator;
