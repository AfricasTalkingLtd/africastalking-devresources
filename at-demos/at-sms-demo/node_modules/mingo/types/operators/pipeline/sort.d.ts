import { Options } from "../../core";
import { Iterator } from "../../lazy";
/**
 * Takes all input documents and returns them in a stream of sorted documents.
 *
 * @param collection
 * @param sortKeys
 * @param  {Object} options
 * @returns {*}
 */
export declare function $sort(collection: Iterator, sortKeys: Record<string, 1 | -1>, options?: Options): Iterator;
