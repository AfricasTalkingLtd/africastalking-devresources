"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$concatArrays = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Concatenates arrays to return the concatenated array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $concatArrays(obj, expr, options) {
    var arr = (0, core_1.computeValue)(obj, expr, null, options);
    (0, util_1.assert)((0, util_1.isArray)(arr), "$concatArrays must resolve to an array");
    if (arr.some(util_1.isNil))
        return null;
    return arr.reduce(function (acc, item) { return (0, util_1.into)(acc, item); }, []);
}
exports.$concatArrays = $concatArrays;
