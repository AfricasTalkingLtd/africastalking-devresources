"use strict";
// $sample operator -  https://docs.mongodb.com/manual/reference/operator/aggregation/sample/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sample = void 0;
/**
 * Randomly selects the specified number of documents from its input. The given iterator must have finite values
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Options} options
 * @return {*}
 */
function $sample(collection, expr, options) {
    return collection.transform(function (xs) {
        var len = xs.length;
        var i = -1;
        return function () {
            if (++i === expr.size)
                return { done: true };
            var n = Math.floor(Math.random() * len);
            return { value: xs[n], done: false };
        };
    });
}
exports.$sample = $sample;
