"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$map = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Applies a sub-expression to each element of an array and returns the array of resulting values in order.
 *
 * @param obj
 * @param expr
 * @returns {Array|*}
 */
function $map(obj, expr, options) {
    var input = (0, core_1.computeValue)(obj, expr.input, null, options);
    (0, util_1.assert)((0, util_1.isArray)(input), "$map 'input' expression must resolve to an array");
    var copts = core_1.ComputeOptions.init(options);
    var k = expr.as || "this";
    return input.map(function (o) {
        var _a;
        return (0, core_1.computeValue)(obj, expr.in, null, copts.update(copts.root, {
            variables: (_a = {}, _a[k] = o, _a),
        }));
    });
}
exports.$map = $map;
