"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$cosh = void 0;
var _internal_1 = require("./_internal");
/** Returns the hyperbolic cosine of a value that is measured in radians. */
exports.$cosh = (0, _internal_1.createTrignometryOperator)(Math.cosh, {
    "-Infinity": Infinity,
    Infinity: Infinity,
    // [Math.PI]: -1,
});
