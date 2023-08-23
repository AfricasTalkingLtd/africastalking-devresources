import { Options } from "./core";
import { Cursor } from "./cursor";
import { Source } from "./lazy";
import { RawObject } from "./types";
/**
 * An object used to filter input documents
 *
 * @param {Object} criteria The criteria for constructing predicates
 * @param {Options} options Options for use by operators
 * @constructor
 */
export declare class Query {
    private readonly criteria;
    private readonly options?;
    private readonly compiled;
    constructor(criteria: RawObject, options?: Options);
    private compile;
    private processOperator;
    /**
     * Checks if the object passes the query criteria. Returns true if so, false otherwise.
     *
     * @param obj The object to test
     * @returns {boolean} True or false
     */
    test(obj: RawObject): boolean;
    /**
     * Returns a cursor to select matching documents from the input source.
     *
     * @param source A source providing a sequence of documents
     * @param projection An optional projection criteria
     * @returns {Cursor} A Cursor for iterating over the results
     */
    find(collection: Source, projection?: RawObject): Cursor;
    /**
     * Remove matched documents from the collection returning the remainder
     *
     * @param collection An array of documents
     * @returns {Array} A new array with matching elements removed
     */
    remove(collection: RawObject[]): RawObject[];
}
