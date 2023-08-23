"use strict";
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortArray/#mongodb-expression-exp.-sortArray
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
exports.$sortArray = void 0;
var aggregator_1 = require("../../../aggregator");
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Sorts an array based on its elements. The sort order is user specified.
 *
 * @param obj The target object
 * @param expr The expression argument
 * @param options Options
 * @returns
 */
function $sortArray(obj, expr, options) {
    var _a = (0, core_1.computeValue)(obj, expr, null, options), input = _a.input, sortBy = _a.sortBy;
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(input), "$sortArray expression must resolve to an array");
    if ((0, util_1.isObject)(sortBy)) {
        return new aggregator_1.Aggregator([{ $sort: sortBy }]).run(input);
    }
    var result = __spreadArray([], input, true);
    result.sort(util_1.DEFAULT_COMPARATOR);
    if (sortBy === -1)
        result.reverse();
    return result;
}
exports.$sortArray = $sortArray;
