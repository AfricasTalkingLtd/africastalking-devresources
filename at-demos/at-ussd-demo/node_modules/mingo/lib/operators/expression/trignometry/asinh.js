"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$asinh = void 0;
var _internal_1 = require("./_internal");
/** Returns the inverse hyperbolic sine (hyperbolic arc sine) of a value in radians. */
exports.$asinh = (0, _internal_1.createTrignometryOperator)(Math.asinh, {
    Infinity: Infinity,
    "-Infinity": -Infinity,
});
