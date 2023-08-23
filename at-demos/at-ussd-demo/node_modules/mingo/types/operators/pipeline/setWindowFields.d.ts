import { Options } from "../../core";
import { Iterator } from "../../lazy";
import { SetWindowFieldsInput } from "./_internal";
/**
 * Randomly selects the specified number of documents from its input. The given iterator must have finite values
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Options} options
 * @return {*}
 */
export declare function $setWindowFields(collection: Iterator, expr: SetWindowFieldsInput, options?: Options): Iterator;
