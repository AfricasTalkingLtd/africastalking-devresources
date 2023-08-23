"use strict";
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
exports.$bucket = void 0;
var core_1 = require("../../core");
var lazy_1 = require("../../lazy");
var util_1 = require("../../util");
/**
 * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/bucket/
 *
 * @param {*} collection
 * @param {*} expr
 * @param {Options} opt Pipeline options
 */
function $bucket(collection, expr, options) {
    var boundaries = __spreadArray([], expr.boundaries, true);
    var defaultKey = expr.default;
    var lower = boundaries[0]; // inclusive
    var upper = boundaries[boundaries.length - 1]; // exclusive
    var outputExpr = expr.output || { count: { $sum: 1 } };
    (0, util_1.assert)(expr.boundaries.length > 2, "$bucket 'boundaries' expression must have at least 3 elements");
    var boundType = (0, util_1.getType)(lower);
    for (var i = 0, len = boundaries.length - 1; i < len; i++) {
        (0, util_1.assert)(boundType === (0, util_1.getType)(boundaries[i + 1]), "$bucket 'boundaries' must all be of the same type");
        (0, util_1.assert)(boundaries[i] < boundaries[i + 1], "$bucket 'boundaries' must be sorted in ascending order");
    }
    !(0, util_1.isNil)(defaultKey) &&
        (0, util_1.getType)(expr.default) === (0, util_1.getType)(lower) &&
        (0, util_1.assert)(expr.default >= upper || expr.default < lower, "$bucket 'default' expression must be out of boundaries range");
    var grouped = {};
    for (var _i = 0, boundaries_1 = boundaries; _i < boundaries_1.length; _i++) {
        var k = boundaries_1[_i];
        grouped[k] = [];
    }
    // add default key if provided
    if (!(0, util_1.isNil)(defaultKey))
        grouped[defaultKey] = [];
    var iterator = null;
    return (0, lazy_1.Lazy)(function () {
        if (iterator === null) {
            collection.each(function (obj) {
                var key = (0, core_1.computeValue)(obj, expr.groupBy, null, options);
                if ((0, util_1.isNil)(key) || key < lower || key >= upper) {
                    (0, util_1.assert)(!(0, util_1.isNil)(defaultKey), "$bucket require a default for out of range values");
                    grouped[defaultKey].push(obj);
                }
                else {
                    (0, util_1.assert)(key >= lower && key < upper, "$bucket 'groupBy' expression must resolve to a value in range of boundaries");
                    var index = findInsertIndex(boundaries, key);
                    var boundKey = boundaries[Math.max(0, index - 1)];
                    grouped[boundKey].push(obj);
                }
            });
            // upper bound is exclusive so we remove it
            boundaries.pop();
            if (!(0, util_1.isNil)(defaultKey))
                boundaries.push(defaultKey);
            iterator = (0, lazy_1.Lazy)(boundaries).map(function (key) {
                var acc = (0, core_1.computeValue)(grouped[key], outputExpr, null, options);
                return (0, util_1.into)(acc, { _id: key });
            });
        }
        return iterator.next();
    });
}
exports.$bucket = $bucket;
/**
 * Find the insert index for the given key in a sorted array.
 *
 * @param {*} sorted The sorted array to search
 * @param {*} item The search key
 */
function findInsertIndex(sorted, item) {
    // uses binary search
    var lo = 0;
    var hi = sorted.length - 1;
    while (lo <= hi) {
        var mid = Math.round(lo + (hi - lo) / 2);
        if (item < sorted[mid]) {
            hi = mid - 1;
        }
        else if (item > sorted[mid]) {
            lo = mid + 1;
        }
        else {
            return mid;
        }
    }
    return lo;
}
