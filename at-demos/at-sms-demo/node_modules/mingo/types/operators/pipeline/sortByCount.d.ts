import { Options } from "../../core";
import { Iterator } from "../../lazy";
import { AnyVal } from "../../types";
/**
 * Groups incoming documents based on the value of a specified expression,
 * then computes the count of documents in each distinct group.
 *
 * https://docs.mongodb.com/manual/reference/operator/aggregation/sortByCount/
 *
 * @param  {Array} collection
 * @param  {Object} expr
 * @param  {Object} options
 * @return {*}
 */
export declare function $sortByCount(collection: Iterator, expr: AnyVal, options?: Options): Iterator;
