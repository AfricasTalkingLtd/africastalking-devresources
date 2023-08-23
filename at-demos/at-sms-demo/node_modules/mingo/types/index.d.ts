import "./init/basic";
import { Aggregator } from "./aggregator";
import { Options } from "./core";
import { Cursor } from "./cursor";
import { Source } from "./lazy";
import { Query } from "./query";
import { RawObject } from "./types";
export { Aggregator } from "./aggregator";
export { Query } from "./query";
/**
 * Performs a query on a collection and returns a cursor object.
 * Shorthand for `Query(criteria).find(collection, projection)`
 *
 * @param collection Array of objects
 * @param criteria Query criteria
 * @param projection Projection criteria
 * @param options
 * @returns {Cursor} A cursor of results
 */
export declare function find(collection: Source, criteria: RawObject, projection?: RawObject, options?: Options): Cursor;
/**
 * Returns a new array without objects which match the criteria
 *
 * @param collection Array of objects
 * @param criteria Query criteria of objects to remove
 * @param options
 * @returns {Array} New filtered array
 */
export declare function remove(collection: RawObject[], criteria: RawObject, options?: Options): RawObject[];
/**
 * Return the result collection after running the aggregation pipeline for the given collection.
 * Shorthand for `(new Aggregator(pipeline, options)).run(collection)`
 *
 * @param collection array or stream of objects
 * @param pipeline The pipeline operators to use
 * @param options
 * @returns {Array} New array of results
 */
export declare function aggregate(collection: Source, pipeline: RawObject[], options?: Options): RawObject[];
declare const _default: {
    Aggregator: typeof Aggregator;
    Query: typeof Query;
    aggregate: typeof aggregate;
    find: typeof find;
    remove: typeof remove;
};
export default _default;
