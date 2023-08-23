"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$reduce = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Applies an expression to each element in an array and combines them into a single value.
 *
 * @param {Object} obj
 * @param {*} expr
 */
function $reduce(obj, expr, options) {
    var copts = core_1.ComputeOptions.init(options);
    var input = (0, core_1.computeValue)(obj, expr.input, null, copts);
    var initialValue = (0, core_1.computeValue)(obj, expr.initialValue, null, copts);
    var inExpr = expr["in"];
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(input), "$reduce 'input' expression must resolve to an array");
    return input.reduce(function (acc, n) {
        return (0, core_1.computeValue)(n, inExpr, null, copts.update(copts.root, {
            variables: { value: acc },
        }));
    }, initialValue);
}
exports.$reduce = $reduce;
