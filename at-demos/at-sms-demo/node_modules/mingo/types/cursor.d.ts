import { CollationSpec, Options } from "./core";
import { Iterator, Source } from "./lazy";
import { AnyVal, Callback, Predicate, RawArray, RawObject } from "./types";
/**
 * Cursor to iterate and perform filtering on matched objects.
 * This object must not be used directly. A cursor may be obtaine from calling `find()` on an instance of `Query`.
 *
 * @param collection The input source of the collection
 * @param predicate A predicate function to test documents
 * @param projection A projection criteria
 * @param options Options
 * @constructor
 */
export declare class Cursor {
    readonly source: Source;
    readonly predicate: Predicate<AnyVal>;
    readonly projection: RawObject;
    private options;
    private readonly operators;
    private result;
    private buffer;
    constructor(source: Source, predicate: Predicate<AnyVal>, projection: RawObject, options: Options);
    /** Returns the iterator from running the query */
    private fetch;
    /** Returns an iterator with the buffered data included */
    private fetchAll;
    /**
     * Return remaining objects in the cursor as an array. This method exhausts the cursor
     * @returns {Array}
     */
    all(): RawArray;
    /**
     * Returns the number of objects return in the cursor. This method exhausts the cursor
     * @returns {Number}
     */
    count(): number;
    /**
     * Returns a cursor that begins returning results only after passing or skipping a number of documents.
     * @param {Number} n the number of results to skip.
     * @return {Cursor} Returns the cursor, so you can chain this call.
     */
    skip(n: number): Cursor;
    /**
     * Constrains the size of a cursor's result set.
     * @param {Number} n the number of results to limit to.
     * @return {Cursor} Returns the cursor, so you can chain this call.
     */
    limit(n: number): Cursor;
    /**
     * Returns results ordered according to a sort specification.
     * @param {Object} modifier an object of key and values specifying the sort order. 1 for ascending and -1 for descending
     * @return {Cursor} Returns the cursor, so you can chain this call.
     */
    sort(modifier: RawObject): Cursor;
    /**
     * Specifies the collation for the cursor returned by the `mingo.Query.find`
     * @param {*} spec
     */
    collation(spec: CollationSpec): Cursor;
    /**
     * Returns the next document in a cursor.
     * @returns {Object | Boolean}
     */
    next(): AnyVal;
    /**
     * Returns true if the cursor has documents and can be iterated.
     * @returns {boolean}
     */
    hasNext(): boolean;
    /**
     * Applies a function to each document in a cursor and collects the return values in an array.
     * @param callback
     * @returns {Array}
     */
    map(callback: Callback<AnyVal>): RawObject[];
    /**
     * Applies a JavaScript function for every document in a cursor.
     * @param callback
     */
    forEach(callback: Callback<AnyVal>): void;
    [Symbol.iterator](): Iterator;
}
