"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$expMovingAvg = void 0;
var util_1 = require("../../util");
var accumulator_1 = require("../accumulator");
// internal cache to store precomputed series once to avoid O(N^2) calls to over the collection
var cache = {};
/**
 * Returns the exponential moving average of numeric expressions applied to documents
 * in a partition defined in the $setWindowFields stage.
 */
function $expMovingAvg(obj, collection, expr, options) {
    var key = (0, util_1.hashCode)(collection[0]);
    try {
        var _a = expr.inputExpr, input = _a.input, N = _a.N, alpha = _a.alpha;
        // compute the entire series once and cache
        if (expr.documentNumber === 1) {
            cache[key] = (0, accumulator_1.$push)(collection, input, options);
        }
        var series = cache[key].slice(0, expr.documentNumber);
        var result = series[0];
        var weight = N != undefined ? 2 / (N + 1) : alpha;
        for (var i = 1; i < series.length; i++) {
            result = series[i] * weight + result * (1 - weight);
        }
        return result;
    }
    finally {
        if (expr.documentNumber == collection.length) {
            delete cache[key];
        }
    }
}
exports.$expMovingAvg = $expMovingAvg;
