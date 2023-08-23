import { Options } from "./core";
import { Iterator, Source } from "./lazy";
import { RawObject } from "./types";
/**
 * Provides functionality for the mongoDB aggregation pipeline
 *
 * @param pipeline an Array of pipeline operators
 * @param options An optional Options to pass the aggregator
 * @constructor
 */
export declare class Aggregator {
    private readonly pipeline;
    private readonly options?;
    constructor(pipeline: Array<RawObject>, options?: Options);
    /**
     * Returns an `Lazy` iterator for processing results of pipeline
     *
     * @param {*} collection An array or iterator object
     * @param {Query} query the `Query` object to use as context
     * @returns {Iterator} an iterator object
     */
    stream(collection: Source): Iterator;
    /**
     * Return the results of the aggregation as an array.
     *
     * @param {*} collection
     * @param {*} query
     */
    run(collection: Source): RawObject[];
}
