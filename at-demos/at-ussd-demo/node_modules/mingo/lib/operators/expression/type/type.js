"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$type = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
function $type(obj, expr, options) {
    var val = (0, core_1.computeValue)(obj, expr, null, options);
    var typename = (0, util_1.getType)(val);
    var nativeType = typename.toLowerCase();
    switch (nativeType) {
        case "boolean":
            return "bool";
        case "number":
            if (val.toString().indexOf(".") >= 0)
                return "double";
            return val >= util_1.MIN_INT && val <= util_1.MAX_INT ? "int" : "long";
        case "regexp":
            return "regex";
        default:
            return nativeType;
    }
}
exports.$type = $type;
