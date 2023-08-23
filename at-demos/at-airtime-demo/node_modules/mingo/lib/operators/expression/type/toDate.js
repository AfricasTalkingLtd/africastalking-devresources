"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toDate = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var _internal_1 = require("./_internal");
/**
 * Converts a value to a date. If the value cannot be converted to a date, $toDate errors. If the value is null or missing, $toDate returns null.
 *
 * @param obj
 * @param expr
 */
function $toDate(obj, expr, options) {
    var val = (0, core_1.computeValue)(obj, expr, null, options);
    if (val instanceof Date)
        return val;
    if ((0, util_1.isNil)(val))
        return null;
    var d = new Date(val);
    var n = d.getTime();
    if (!isNaN(n))
        return d;
    throw new _internal_1.TypeConvertError("cannot convert '".concat(val, "' to date"));
}
exports.$toDate = $toDate;
