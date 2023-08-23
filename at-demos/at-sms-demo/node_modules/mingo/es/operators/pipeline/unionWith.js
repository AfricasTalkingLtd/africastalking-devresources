import { Aggregator } from "../../aggregator";
import { compose, Lazy } from "../../lazy";
import { isString } from "../../util";
/**
 * Performs a union of two collections.
 *
 * @param collection
 * @param expr
 * @param opt
 */
export function $unionWith(collection, expr, options) {
    const array = isString(expr.coll)
        ? options?.collectionResolver(expr.coll)
        : expr.coll;
    const iterators = [collection];
    iterators.push(expr.pipeline
        ? new Aggregator(expr.pipeline, options).stream(array)
        : Lazy(array));
    return compose(...iterators);
}
