"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$skip = void 0;
/**
 * Skips over a specified number of documents from the pipeline and returns the rest.
 *
 * @param collection An iterator
 * @param expr
 * @param  {Options} options
 * @returns {*}
 */
function $skip(collection, expr, options) {
    return collection.drop(expr);
}
exports.$skip = $skip;
