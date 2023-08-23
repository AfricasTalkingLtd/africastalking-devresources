import { Options } from "../../core";
import { Iterator } from "../../lazy";
import { RawObject } from "../../types";
/**
 * Performs a left outer join to another collection in the same database to filter in documents from the “joined” collection for processing.
 *
 * @param collection
 * @param expr
 * @param opt
 */
export declare function $lookup(collection: Iterator, expr: {
    from: string | RawObject[];
    localField: string;
    foreignField: string;
    as: string;
}, options?: Options): Iterator;
