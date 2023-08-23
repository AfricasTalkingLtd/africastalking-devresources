"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$derivative = void 0;
var accumulator_1 = require("../accumulator");
var _internal_1 = require("./_internal");
/**
 * Returns the average rate of change within the specified window
 */
function $derivative(obj, collection, expr, options) {
    var _a = expr.inputExpr, input = _a.input, unit = _a.unit;
    var sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
    var y1 = (0, accumulator_1.$first)(collection, input, options);
    var y2 = (0, accumulator_1.$last)(collection, input, options);
    // ensure values are represented as numbers for dates
    var x1 = +(0, accumulator_1.$first)(collection, sortKey, options);
    var x2 = +(0, accumulator_1.$last)(collection, sortKey, options);
    // convert from millis to the unit.
    var deltaX = (x2 - x1) / (_internal_1.MILLIS_PER_UNIT[unit] || 1);
    return (y2 - y1) / deltaX;
}
exports.$derivative = $derivative;
