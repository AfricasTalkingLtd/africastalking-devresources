import { Options } from "../../core";
import { Iterator } from "../../lazy";
import { RawObject } from "../../types";
interface InputExpr {
    readonly into: string | RawObject[];
    readonly on?: string | [string];
    readonly let?: RawObject;
    readonly whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | RawObject[];
    readonly whenNotMatched?: "insert" | "discard" | "fail";
}
/**
 * Writes the resulting documents of the aggregation pipeline to a collection.
 *
 * The stage can incorporate (insert new documents, merge documents, replace documents,
 * keep existing documents, fail the operation, process documents with a custom update pipeline)
 * the results into an output collection. To use the $merge stage, it must be the last stage in the pipeline.
 *
 * Note: Object are deep cloned for outputing regardless of the ProcessingMode.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {*}
 */
export declare function $merge(collection: Iterator, expr: InputExpr, options?: Options): Iterator;
export {};
