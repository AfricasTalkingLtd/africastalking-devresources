"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrignometryOperator = void 0;
var core_1 = require("../../../core");
var FIXED_POINTS = {
    undefined: null,
    null: null,
    NaN: NaN,
    Infinity: new Error(),
    "-Infinity": new Error(),
};
/**
 * Returns an operator for a given trignometric function
 *
 * @param f The trignometric function
 */
function createTrignometryOperator(f, fixedPoints) {
    if (fixedPoints === void 0) { fixedPoints = FIXED_POINTS; }
    var fp = Object.assign({}, FIXED_POINTS, fixedPoints);
    var keySet = new Set(Object.keys(fp));
    return function (obj, expr, options) {
        var n = (0, core_1.computeValue)(obj, expr, null, options);
        if (keySet.has("".concat(n))) {
            var res = fp["".concat(n)];
            if (res instanceof Error) {
                throw new Error("cannot apply $".concat(f.name, " to -inf, value must in (-inf,inf)"));
            }
            return res;
        }
        return f(n);
    };
}
exports.createTrignometryOperator = createTrignometryOperator;
