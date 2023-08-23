"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$replaceOne = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Replaces the first instance of a matched string in a given input.
 *
 * @param  {Object} obj
 * @param  {Array} expr
 */
function $replaceOne(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var arr = [args.input, args.find, args.replacement];
    if (arr.some(util_1.isNil))
        return null;
    (0, util_1.assert)(arr.every(util_1.isString), "$replaceOne expression fields must evaluate to string");
    return args.input.replace(args.find, args.replacement);
}
exports.$replaceOne = $replaceOne;
