"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toBool = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Converts a value to a boolean.
 *
 * @param obj
 * @param expr
 */
function $toBool(obj, expr, options) {
    var val = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(val))
        return null;
    if ((0, util_1.isString)(val))
        return true;
    return Boolean(val);
}
exports.$toBool = $toBool;
