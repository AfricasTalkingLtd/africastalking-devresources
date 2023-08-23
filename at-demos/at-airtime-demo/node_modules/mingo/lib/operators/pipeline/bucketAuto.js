"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bucketAuto = void 0;
var core_1 = require("../../core");
var util_1 = require("../../util");
/**
 * Categorizes incoming documents into a specific number of groups, called buckets,
 * based on a specified expression. Bucket boundaries are automatically determined
 * in an attempt to evenly distribute the documents into the specified number of buckets.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/bucketAuto/
 *
 * @param {*} collection
 * @param {*} expr
 * @param {*} options
 */
function $bucketAuto(collection, expr, options) {
    var outputExpr = expr.output || { count: { $sum: 1 } };
    var groupByExpr = expr.groupBy;
    var bucketCount = expr.buckets;
    (0, util_1.assert)(bucketCount > 0, "The $bucketAuto 'buckets' field must be greater than 0, but found: ".concat(bucketCount));
    var ID_KEY = "_id";
    return collection.transform(function (coll) {
        var approxBucketSize = Math.max(1, Math.round(coll.length / bucketCount));
        var computeValueOptimized = (0, util_1.memoize)(core_1.computeValue, options === null || options === void 0 ? void 0 : options.hashFunction);
        var grouped = {};
        var remaining = [];
        var sorted = (0, util_1.sortBy)(coll, function (o) {
            var key = computeValueOptimized(o, groupByExpr, null, options);
            if ((0, util_1.isNil)(key)) {
                remaining.push(o);
            }
            else {
                grouped[key] || (grouped[key] = []);
                grouped[key].push(o);
            }
            return key;
        });
        var result = [];
        var index = 0; // counter for sorted collection
        for (var i = 0, len = sorted.length; i < bucketCount && index < len; i++) {
            var boundaries = {};
            var bucketItems = [];
            for (var j = 0; j < approxBucketSize && index < len; j++) {
                var key = computeValueOptimized(sorted[index], groupByExpr, null, options);
                if ((0, util_1.isNil)(key))
                    key = null;
                // populate current bucket with all values for current key
                (0, util_1.into)(bucketItems, (0, util_1.isNil)(key) ? remaining : grouped[key]);
                // increase sort index by number of items added
                index += (0, util_1.isNil)(key) ? remaining.length : grouped[key].length;
                // set the min key boundary if not already present
                if (!(0, util_1.has)(boundaries, "min"))
                    boundaries.min = key;
                if (result.length > 0) {
                    var lastBucket = result[result.length - 1];
                    lastBucket[ID_KEY].max = boundaries.min;
                }
            }
            // if is last bucket add remaining items
            if (i == bucketCount - 1) {
                (0, util_1.into)(bucketItems, sorted.slice(index));
            }
            var values = (0, core_1.computeValue)(bucketItems, outputExpr, null, options);
            result.push((0, util_1.into)(values, {
                _id: boundaries,
            }));
        }
        if (result.length > 0) {
            result[result.length - 1][ID_KEY].max =
                computeValueOptimized(sorted[sorted.length - 1], groupByExpr, null, options);
        }
        return result;
    });
}
exports.$bucketAuto = $bucketAuto;
