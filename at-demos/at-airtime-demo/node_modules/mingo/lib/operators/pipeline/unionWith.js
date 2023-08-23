"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$unionWith = void 0;
var aggregator_1 = require("../../aggregator");
var lazy_1 = require("../../lazy");
var util_1 = require("../../util");
/**
 * Performs a union of two collections.
 *
 * @param collection
 * @param expr
 * @param opt
 */
function $unionWith(collection, expr, options) {
    var array = (0, util_1.isString)(expr.coll)
        ? options === null || options === void 0 ? void 0 : options.collectionResolver(expr.coll)
        : expr.coll;
    var iterators = [collection];
    iterators.push(expr.pipeline
        ? new aggregator_1.Aggregator(expr.pipeline, options).stream(array)
        : (0, lazy_1.Lazy)(array));
    return lazy_1.compose.apply(void 0, iterators);
}
exports.$unionWith = $unionWith;
