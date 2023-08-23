"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$filter = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Selects a subset of the array to return an array with only the elements that match the filter condition.
 *
 * @param  {Object} obj  [description]
 * @param  {*} expr [description]
 * @return {*}      [description]
 */
function $filter(obj, expr, options) {
    var input = (0, core_1.computeValue)(obj, expr.input, null, options);
    (0, util_1.assert)((0, util_1.isArray)(input), "$filter 'input' expression must resolve to an array");
    var copts = core_1.ComputeOptions.init(options, obj);
    var k = expr.as || "this";
    return input.filter(function (o) {
        var _a;
        return (0, core_1.computeValue)(obj, expr.cond, null, copts.update(copts.root, {
            variables: (_a = {}, _a[k] = o, _a),
        })) === true;
    });
}
exports.$filter = $filter;
