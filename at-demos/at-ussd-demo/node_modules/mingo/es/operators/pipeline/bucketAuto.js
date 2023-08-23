import { computeValue } from "../../core";
import { assert, has, into, isNil, memoize, sortBy } from "../../util";
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
export function $bucketAuto(collection, expr, options) {
    const outputExpr = expr.output || { count: { $sum: 1 } };
    const groupByExpr = expr.groupBy;
    const bucketCount = expr.buckets;
    assert(bucketCount > 0, `The $bucketAuto 'buckets' field must be greater than 0, but found: ${bucketCount}`);
    const ID_KEY = "_id";
    return collection.transform((coll) => {
        const approxBucketSize = Math.max(1, Math.round(coll.length / bucketCount));
        const computeValueOptimized = memoize(computeValue, options?.hashFunction);
        const grouped = {};
        const remaining = [];
        const sorted = sortBy(coll, (o) => {
            const key = computeValueOptimized(o, groupByExpr, null, options);
            if (isNil(key)) {
                remaining.push(o);
            }
            else {
                grouped[key] || (grouped[key] = []);
                grouped[key].push(o);
            }
            return key;
        });
        const result = [];
        let index = 0; // counter for sorted collection
        for (let i = 0, len = sorted.length; i < bucketCount && index < len; i++) {
            const boundaries = {};
            const bucketItems = [];
            for (let j = 0; j < approxBucketSize && index < len; j++) {
                let key = computeValueOptimized(sorted[index], groupByExpr, null, options);
                if (isNil(key))
                    key = null;
                // populate current bucket with all values for current key
                into(bucketItems, isNil(key) ? remaining : grouped[key]);
                // increase sort index by number of items added
                index += isNil(key) ? remaining.length : grouped[key].length;
                // set the min key boundary if not already present
                if (!has(boundaries, "min"))
                    boundaries.min = key;
                if (result.length > 0) {
                    const lastBucket = result[result.length - 1];
                    lastBucket[ID_KEY].max = boundaries.min;
                }
            }
            // if is last bucket add remaining items
            if (i == bucketCount - 1) {
                into(bucketItems, sorted.slice(index));
            }
            const values = computeValue(bucketItems, outputExpr, null, options);
            result.push(into(values, {
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
