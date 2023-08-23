"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$split = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Splits a string into substrings based on a delimiter.
 * If the delimiter is not found within the string, returns an array containing the original string.
 *
 * @param  {Object} obj
 * @param  {Array} expr
 * @return {Array} Returns an array of substrings.
 */
function $split(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(args[0]))
        return null;
    (0, util_1.assert)(args.every(util_1.isString), "$split expression must result to array(2) of strings");
    return args[0].split(args[1]);
}
exports.$split = $split;
