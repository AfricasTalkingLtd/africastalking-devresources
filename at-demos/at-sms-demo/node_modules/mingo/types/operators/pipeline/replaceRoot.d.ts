import { Options } from "../../core";
import { Iterator } from "../../lazy";
import { RawObject } from "../../types";
/**
 * Replaces a document with the specified embedded document or new one.
 * The replacement document can be any valid expression that resolves to a document.
 *
 * https://docs.mongodb.com/manual/reference/operator/aggregation/replaceRoot/
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Object} options
 * @return {*}
 */
export declare function $replaceRoot(collection: Iterator, expr: RawObject, options?: Options): Iterator;
