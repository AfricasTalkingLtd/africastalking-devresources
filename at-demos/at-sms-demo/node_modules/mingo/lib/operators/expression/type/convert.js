"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$convert = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var _internal_1 = require("./_internal");
var toBool_1 = require("./toBool");
var toDate_1 = require("./toDate");
var toDouble_1 = require("./toDouble");
var toInt_1 = require("./toInt");
var toLong_1 = require("./toLong");
var toString_1 = require("./toString");
/**
 * Converts a value to a specified type.
 *
 * @param obj
 * @param expr
 */
function $convert(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    args.onNull = args.onNull === undefined ? null : args.onNull;
    if ((0, util_1.isNil)(args.input))
        return args.onNull;
    try {
        switch (args.to) {
            case 2:
            case "string":
                return (0, toString_1.$toString)(obj, args.input, options);
            case 8:
            case "boolean":
            case "bool":
                return (0, toBool_1.$toBool)(obj, args.input, options);
            case 9:
            case "date":
                return (0, toDate_1.$toDate)(obj, args.input, options);
            case 1:
            case 19:
            case "double":
            case "decimal":
            case "number":
                return (0, toDouble_1.$toDouble)(obj, args.input, options);
            case 16:
            case "int":
                return (0, toInt_1.$toInt)(obj, args.input, options);
            case 18:
            case "long":
                return (0, toLong_1.$toLong)(obj, args.input, options);
        }
    }
    catch (e) {
        /*nothing to do*/
    }
    if (args.onError !== undefined)
        return args.onError;
    throw new _internal_1.TypeConvertError("could not convert to type ".concat(args.to, "."));
}
exports.$convert = $convert;
