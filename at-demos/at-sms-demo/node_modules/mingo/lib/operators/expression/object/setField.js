"use strict";
// Object Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setField = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Adds, updates, or removes a specified field in a document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
function $setField(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(args.input))
        return null;
    (0, util_1.assert)((0, util_1.isObject)(args.input), "$setField expression 'input' must evaluate to an object");
    (0, util_1.assert)((0, util_1.isString)(args.field), "$setField expression 'field' must evaluate to a string");
    if (expr.value == "$$REMOVE") {
        delete obj[args.field];
    }
    else {
        obj[args.field] = args.value;
    }
    return obj;
}
exports.$setField = $setField;
