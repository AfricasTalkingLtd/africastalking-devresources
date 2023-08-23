"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$integral = void 0;
var accumulator_1 = require("../accumulator");
var _internal_1 = require("./_internal");
/**
 * Returns the approximation of the area under a curve.
 */
function $integral(obj, collection, expr, options) {
    var _a = expr.inputExpr, input = _a.input, unit = _a.unit;
    var sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
    var y = (0, accumulator_1.$push)(collection, input, options);
    // ensure values are represented as numbers for dates
    var x = (0, accumulator_1.$push)(collection, sortKey, options).map(function (n) { return +n; });
    var result = 0;
    var size = collection.length;
    for (var k = 1; k < size; k++) {
        // convert from millis to the unit.
        var deltaX = (x[k] - x[k - 1]) / (_internal_1.MILLIS_PER_UNIT[unit] || 1);
        result += 0.5 * (y[k - 1] + y[k]) * deltaX;
    }
    return result;
}
exports.$integral = $integral;
