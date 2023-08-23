import { Options } from "../../core";
import { Iterator } from "../../lazy";
import { RawObject } from "../../types";
/**
 * Filters the document stream, and only allows matching documents to pass into the next pipeline stage.
 * $match uses standard MongoDB queries.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array|*}
 */
export declare function $match(collection: Iterator, expr: RawObject, options?: Options): Iterator;
