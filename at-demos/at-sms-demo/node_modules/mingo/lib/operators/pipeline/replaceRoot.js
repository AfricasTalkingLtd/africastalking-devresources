"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$replaceRoot = void 0;
var core_1 = require("../../core");
var util_1 = require("../../util");
/**
 * Replaces a document with the specified embedded document or new one.
 * The replacement document can be any valid expression that resolves to a document.
 *
 * https://docs.mongodb.com/manual/reference/operator/aggregation/replaceRoot/
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Object} options
 * @return {*}
 */
function $replaceRoot(collection, expr, options) {
    return collection.map(function (obj) {
        obj = (0, core_1.computeValue)(obj, expr.newRoot, null, options);
        (0, util_1.assert)((0, util_1.isObject)(obj), "$replaceRoot expression must return an object");
        return obj;
    });
}
exports.$replaceRoot = $replaceRoot;
