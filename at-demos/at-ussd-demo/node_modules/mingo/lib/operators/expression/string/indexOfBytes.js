"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$indexOfBytes = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Searches a string for an occurrence of a substring and returns the UTF-8 code point index of the first occurence.
 * If the substring is not found, returns -1.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $indexOfBytes(obj, expr, options) {
    var arr = (0, core_1.computeValue)(obj, expr, null, options);
    var errorMsg = "$indexOfBytes expression resolves to invalid an argument";
    if ((0, util_1.isNil)(arr[0]))
        return null;
    (0, util_1.assert)((0, util_1.isString)(arr[0]) && (0, util_1.isString)(arr[1]), errorMsg);
    var str = arr[0];
    var searchStr = arr[1];
    var start = arr[2];
    var end = arr[3];
    var valid = (0, util_1.isNil)(start) ||
        ((0, util_1.isNumber)(start) && start >= 0 && Math.round(start) === start);
    valid =
        valid &&
            ((0, util_1.isNil)(end) || ((0, util_1.isNumber)(end) && end >= 0 && Math.round(end) === end));
    (0, util_1.assert)(valid, errorMsg);
    start = start || 0;
    end = end || str.length;
    if (start > end)
        return -1;
    var index = str.substring(start, end).indexOf(searchStr);
    return index > -1 ? index + start : index;
}
exports.$indexOfBytes = $indexOfBytes;
