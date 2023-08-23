import { Options } from "../../core";
import { Iterator } from "../../lazy";
/**
 * Randomly selects the specified number of documents from its input. The given iterator must have finite values
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Options} options
 * @return {*}
 */
export declare function $sample(collection: Iterator, expr: {
    size: number;
}, options?: Options): Iterator;
