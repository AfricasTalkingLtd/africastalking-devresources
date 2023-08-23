"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$limit = void 0;
/**
 * Restricts the number of documents in an aggregation pipeline.
 *
 * @param collection
 * @param value
 * @param options
 * @returns {Object|*}
 */
function $limit(collection, expr, options) {
    return collection.take(expr);
}
exports.$limit = $limit;
