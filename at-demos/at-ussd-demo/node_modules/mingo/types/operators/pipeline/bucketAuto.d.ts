import { Options } from "../../core";
import { Iterator } from "../../lazy";
import { AnyVal, RawObject } from "../../types";
/**
 * Categorizes incoming documents into a specific number of groups, called buckets,
 * based on a specified expression. Bucket boundaries are automatically determined
 * in an attempt to evenly distribute the documents into the specified number of buckets.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/bucketAuto/
 *
 * @param {*} collection
 * @param {*} expr
 * @param {*} options
 */
export declare function $bucketAuto(collection: Iterator, expr: {
    groupBy: AnyVal;
    buckets: number;
    output?: RawObject;
    granularity: string;
}, options?: Options): Iterator;
