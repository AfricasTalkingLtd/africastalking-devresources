import { Options } from "../../core";
import { Iterator } from "../../lazy";
/**
 * Takes an array of documents and returns them as a stream of documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array}
 */
export declare function $unwind(collection: Iterator, expr: string | {
    path: string;
    includeArrayIndex?: string;
    preserveNullAndEmptyArrays?: boolean;
}, options?: Options): Iterator;
