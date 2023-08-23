import { Options } from "../../core";
import { Iterator } from "../../lazy";
import { AnyVal, RawArray, RawObject } from "../../types";
/**
 * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/bucket/
 *
 * @param {*} collection
 * @param {*} expr
 * @param {Options} opt Pipeline options
 */
export declare function $bucket(collection: Iterator, expr: {
    groupBy: AnyVal;
    boundaries: RawArray;
    default: AnyVal;
    output?: RawObject;
}, options?: Options): Iterator;
