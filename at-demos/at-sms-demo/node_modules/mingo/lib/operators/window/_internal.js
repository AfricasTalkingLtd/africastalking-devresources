"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rank = exports.MILLIS_PER_UNIT = void 0;
var util_1 = require("../../util");
var accumulator_1 = require("../accumulator");
var _internal_1 = require("../expression/date/_internal");
// millis map to diffirent time units
exports.MILLIS_PER_UNIT = {
    week: _internal_1.MILLIS_PER_DAY * 7,
    day: _internal_1.MILLIS_PER_DAY,
    hour: _internal_1.MILLIS_PER_DAY / 24,
    minute: 60000,
    second: 1000,
    millisecond: 1,
};
var rankCache = {};
/** Returns the position of a document in the $setWindowFields stage partition. */
function rank(obj, collection, expr, options, dense) {
    var outputExpr = expr.parentExpr.output[expr.field];
    var operator = Object.keys(outputExpr).find(util_1.isOperator);
    (0, util_1.assert)(!outputExpr.window, "$".concat(operator, " does not support 'window' option in $setWindowFields"));
    var key = (0, util_1.hashCode)(collection[0]);
    var sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
    try {
        if (expr.documentNumber === 1) {
            var sortValues_1 = (0, accumulator_1.$push)(collection, sortKey, options);
            var partitions_1 = (0, util_1.groupBy)(collection, function (_, n) { return sortValues_1[n]; }, options.hashFunction);
            // cache the data for subsequent runs
            rankCache[key] = {
                partitions: partitions_1,
                sortValues: sortValues_1,
                lastRank: 1,
                groupIndex: 0,
            };
        }
        var _a = rankCache[key], partitions = _a.partitions, sortValues = _a.sortValues, groupIndex = _a.groupIndex, lastRank = _a.lastRank;
        // same number of paritions as lenght means all sort keys are unique
        if (partitions.keys.length == collection.length) {
            return expr.documentNumber;
        }
        var rank_1 = lastRank;
        var current = sortValues[expr.documentNumber - 1];
        for (var i = groupIndex; i < partitions.keys.length; i++) {
            if ((0, util_1.isEqual)(current, partitions.keys[i])) {
                rankCache[key].groupIndex = i;
                rankCache[key].lastRank = dense ? i + 1 : rank_1;
                return rankCache[key].lastRank;
            }
            rank_1 += partitions.groups[i].length;
        }
    }
    finally {
        if (expr.documentNumber == collection.length) {
            delete rankCache[key];
        }
    }
}
exports.rank = rank;
