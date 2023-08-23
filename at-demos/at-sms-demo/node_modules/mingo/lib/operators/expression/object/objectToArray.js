"use strict";
// Object Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$objectToArray = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Converts a document to an array of documents representing key-value pairs.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
function $objectToArray(obj, expr, options) {
    var val = (0, core_1.computeValue)(obj, expr, null, options);
    (0, util_1.assert)((0, util_1.isObject)(val), "$objectToArray expression must resolve to an object");
    var result = [];
    for (var _i = 0, _a = Object.entries(val); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        result.push({ k: k, v: v });
    }
    return result;
}
exports.$objectToArray = $objectToArray;
