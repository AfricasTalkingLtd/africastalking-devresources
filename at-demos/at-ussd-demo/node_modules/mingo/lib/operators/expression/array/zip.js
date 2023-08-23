"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$zip = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Merge two lists together.
 *
 * Transposes an array of input arrays so that the first element of the output array would be an array containing,
 * the first element of the first input array, the first element of the second input array, etc.
 *
 * @param  {Obj} obj
 * @param  {*} expr
 * @return {*}
 */
function $zip(obj, expr, options) {
    var inputs = (0, core_1.computeValue)(obj, expr.inputs, null, options);
    var useLongestLength = expr.useLongestLength || false;
    (0, util_1.assert)((0, util_1.isArray)(inputs), "'inputs' expression must resolve to an array");
    (0, util_1.assert)((0, util_1.isBoolean)(useLongestLength), "'useLongestLength' must be a boolean");
    if ((0, util_1.isArray)(expr.defaults)) {
        (0, util_1.assert)((0, util_1.truthy)(useLongestLength), "'useLongestLength' must be set to true to use 'defaults'");
    }
    var zipCount = 0;
    for (var i = 0, len = inputs.length; i < len; i++) {
        var arr = inputs[i];
        if ((0, util_1.isNil)(arr))
            return null;
        (0, util_1.assert)((0, util_1.isArray)(arr), "'inputs' expression values must resolve to an array or null");
        zipCount = useLongestLength
            ? Math.max(zipCount, arr.length)
            : Math.min(zipCount || arr.length, arr.length);
    }
    var result = [];
    var defaults = expr.defaults || [];
    var _loop_1 = function (i) {
        var temp = inputs.map(function (val, index) {
            return (0, util_1.isNil)(val[i]) ? defaults[index] || null : val[i];
        });
        result.push(temp);
    };
    for (var i = 0; i < zipCount; i++) {
        _loop_1(i);
    }
    return result;
}
exports.$zip = $zip;
