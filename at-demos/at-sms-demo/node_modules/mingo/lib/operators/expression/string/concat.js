"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$concat = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Concatenates two strings.
 *
 * @param obj
 * @param expr
 * @returns {string|*}
 */
function $concat(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    // does not allow concatenation with nulls
    if ([null, undefined].some(util_1.inArray.bind(null, args)))
        return null;
    return args.join("");
}
exports.$concat = $concat;
