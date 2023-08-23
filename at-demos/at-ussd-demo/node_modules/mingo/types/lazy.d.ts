import { AnyVal, Callback, Predicate, RawArray } from "./types";
/**
 * A value produced by a generator
 */
interface IteratorResult {
    readonly value?: AnyVal;
    readonly done: boolean;
}
/**
 * Simplified generator interface
 */
interface Generator<T> {
    next: () => T;
}
export type Source = Generator<IteratorResult> | Callback<IteratorResult> | RawArray;
/**
 * Returns an iterator
 * @param {*} source An iterable source (Array, Function, Generator, or Iterator)
 */
export declare function Lazy(source: Source): Iterator;
export declare function compose(...iterators: Iterator[]): Iterator;
/**
 * A lazy collection iterator yields a single value at time upon request
 */
export declare class Iterator {
    private readonly iteratees;
    private readonly yieldedValues;
    private getNext;
    private isDone;
    /**
     * @param {*} source An iterable object or function.
     *    Array - return one element per cycle
     *    Object{next:Function} - call next() for the next value (this also handles generator functions)
     *    Function - call to return the next value
     * @param {Function} fn An optional transformation function
     */
    constructor(source: Source);
    /**
     * Add an iteratee to this lazy sequence
     */
    private push;
    next(): IteratorResult;
    /**
     * Transform each item in the sequence to a new value
     * @param {Function} f
     */
    map<T = AnyVal>(f: Callback<T>): Iterator;
    /**
     * Select only items matching the given predicate
     * @param {Function} pred
     */
    filter<T = AnyVal>(predicate: Predicate<T>): Iterator;
    /**
     * Take given numbe for values from sequence
     * @param {Number} n A number greater than 0
     */
    take(n: number): Iterator;
    /**
     * Drop a number of values from the sequence
     * @param {Number} n Number of items to drop greater than 0
     */
    drop(n: number): Iterator;
    /**
     * Returns a new lazy object with results of the transformation
     * The entire sequence is realized.
     *
     * @param {Function} fn Tranform function of type (Array) => (Any)
     */
    transform(fn: Callback<Source>): Iterator;
    /**
     * Returns the fully realized values of the iterators.
     * The return value will be an array unless `lazy.first()` was used.
     * The realized values are cached for subsequent calls
     */
    value(): AnyVal;
    /**
     * Execute the funcion for each value. Will stop when an execution returns false.
     * @param {Function} f
     * @returns {Boolean} false iff `f` return false for AnyVal execution, otherwise true
     */
    each<T = AnyVal>(f: Callback<T>): boolean;
    /**
     * Returns the reduction of sequence according the reducing function
     *
     * @param {*} f a reducing function
     * @param {*} init
     */
    reduce<T = AnyVal>(f: Callback<T>, initialValue?: AnyVal): T;
    /**
     * Returns the number of matched items in the sequence
     */
    size(): number;
    [Symbol.iterator](): Iterator;
}
export {};
