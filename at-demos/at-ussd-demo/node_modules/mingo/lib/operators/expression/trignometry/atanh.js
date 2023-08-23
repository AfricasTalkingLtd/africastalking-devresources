"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$atanh = void 0;
var _internal_1 = require("./_internal");
/** Returns the inverse hyperbolic tangent (hyperbolic arc tangent) of a value in radians. */
exports.$atanh = (0, _internal_1.createTrignometryOperator)(Math.atanh, {
    1: Infinity,
    "-1": -Infinity,
});
