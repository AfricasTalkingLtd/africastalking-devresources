import { Options } from "../../core";
import { Iterator } from "../../lazy";
import { RawObject } from "../../types";
interface InputExpr {
    readonly coll: RawObject[];
    readonly pipeline?: RawObject[];
}
/**
 * Performs a union of two collections.
 *
 * @param collection
 * @param expr
 * @param opt
 */
export declare function $unionWith(collection: Iterator, expr: InputExpr, options?: Options): Iterator;
export {};
