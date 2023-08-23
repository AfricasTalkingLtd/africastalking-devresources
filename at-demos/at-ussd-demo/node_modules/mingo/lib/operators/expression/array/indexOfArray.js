"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$indexOfArray = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Searches an array for an occurrence of a specified value and returns the array index of the first occurrence.
 * If the substring is not found, returns -1.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $indexOfArray(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(args))
        return null;
    var arr = args[0];
    var searchValue = args[1];
    if ((0, util_1.isNil)(arr))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(arr), "$indexOfArray expression must resolve to an array.");
    var start = args[2] || 0;
    var end = args[3];
    if ((0, util_1.isNil)(end))
        end = arr.length;
    if (start > end)
        return -1;
    (0, util_1.assert)(start >= 0 && end >= 0, "$indexOfArray expression is invalid");
    if (start > 0 || end < arr.length) {
        arr = arr.slice(start, end);
    }
    // Array.prototype.findIndex not supported in IE9 hence this workaround
    var index = -1;
    arr.some(function (v, i) {
        var b = (0, util_1.isEqual)(v, searchValue);
        if (b)
            index = i;
        return b;
    });
    return index + start;
}
exports.$indexOfArray = $indexOfArray;
