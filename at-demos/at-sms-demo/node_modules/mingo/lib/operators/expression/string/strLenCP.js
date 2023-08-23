"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$strLenCP = void 0;
var core_1 = require("../../../core");
/**
 * Returns the number of UTF-8 code points in the specified string.
 *
 * @param  {Object} obj
 * @param  {String} expr
 * @return {Number}
 */
function $strLenCP(obj, expr, options) {
    return (0, core_1.computeValue)(obj, expr, null, options).length;
}
exports.$strLenCP = $strLenCP;
