"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$radiansToDegrees = void 0;
var _internal_1 = require("./_internal");
var DEGREES_FACTOR = 180 / Math.PI;
/** Converts a value from radians to degrees. */
exports.$radiansToDegrees = (0, _internal_1.createTrignometryOperator)(function (n) { return n * DEGREES_FACTOR; }, {
    Infinity: Infinity,
    "-Infinity": -Infinity,
});
