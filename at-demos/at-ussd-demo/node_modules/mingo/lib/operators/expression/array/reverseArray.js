"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$reverseArray = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Returns an array with the elements in reverse order.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $reverseArray(obj, expr, options) {
    var arr = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(arr))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(arr), "$reverseArray expression must resolve to an array");
    var result = [];
    (0, util_1.into)(result, arr);
    result.reverse();
    return result;
}
exports.$reverseArray = $reverseArray;
