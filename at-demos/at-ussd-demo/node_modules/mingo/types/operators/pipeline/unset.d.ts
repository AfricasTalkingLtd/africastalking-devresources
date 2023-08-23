import { ComputeOptions } from "../../core";
import { Iterator } from "../../lazy";
/**
 * Removes/excludes fields from documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Iterator}
 */
export declare function $unset(collection: Iterator, expr: string | string[], options?: ComputeOptions): Iterator;
