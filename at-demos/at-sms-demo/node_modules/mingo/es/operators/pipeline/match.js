import { Query } from "../../query";
/**
 * Filters the document stream, and only allows matching documents to pass into the next pipeline stage.
 * $match uses standard MongoDB queries.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array|*}
 */
export function $match(collection, expr, options) {
    const q = new Query(expr, options);
    return collection.filter((o) => q.test(o));
}
