"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$range = void 0;
var core_1 = require("../../../core");
/**
 * Returns an array whose elements are a generated sequence of numbers.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $range(obj, expr, options) {
    var arr = (0, core_1.computeValue)(obj, expr, null, options);
    var start = arr[0];
    var end = arr[1];
    var step = arr[2] || 1;
    var result = new Array();
    var counter = start;
    while ((counter < end && step > 0) || (counter > end && step < 0)) {
        result.push(counter);
        counter += step;
    }
    return result;
}
exports.$range = $range;
