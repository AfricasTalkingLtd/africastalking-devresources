/**
 * Restricts the number of documents in an aggregation pipeline.
 *
 * @param collection
 * @param value
 * @param options
 * @returns {Object|*}
 */
export function $limit(collection, expr, options) {
    return collection.take(expr);
}
