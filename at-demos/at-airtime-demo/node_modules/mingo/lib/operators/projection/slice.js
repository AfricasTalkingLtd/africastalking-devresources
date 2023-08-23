"use strict";
// $slice operator. https://docs.mongodb.com/manual/reference/operator/projection/slice/#proj._S_slice
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$slice = void 0;
var util_1 = require("../../util");
var slice_1 = require("../expression/array/slice");
/**
 * Limits the number of elements projected from an array. Supports skip and limit slices.
 *
 * @param obj
 * @param field
 * @param expr
 */
function $slice(obj, expr, field, options) {
    var xs = (0, util_1.resolve)(obj, field);
    var exprAsArray = expr;
    if (!(0, util_1.isArray)(xs))
        return xs;
    return (0, slice_1.$slice)(obj, expr instanceof Array ? __spreadArray([xs], exprAsArray, true) : [xs, expr], options);
}
exports.$slice = $slice;
