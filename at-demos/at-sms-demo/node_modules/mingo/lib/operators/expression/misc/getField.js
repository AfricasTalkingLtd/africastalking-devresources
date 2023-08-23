"use strict";
// Miscellaneous Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/rand/#mongodb-expression-exp.-rand
Object.defineProperty(exports, "__esModule", { value: true });
exports.$getField = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Adds, updates, or removes a specified field in a document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
function $getField(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var input = obj;
    var field = args;
    if ((0, util_1.isObject)(args) && args.input && args.field) {
        input = args.input;
        field = args.field;
    }
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isObject)(input), "$getField expression 'input' must evaluate to an object");
    (0, util_1.assert)((0, util_1.isString)(field), "$getField expression 'field' must evaluate to a string");
    return input[field];
}
exports.$getField = $getField;
