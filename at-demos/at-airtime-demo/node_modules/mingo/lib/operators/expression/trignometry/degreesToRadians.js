"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$degreesToRadians = void 0;
var _internal_1 = require("./_internal");
var RADIANS_FACTOR = Math.PI / 180;
/** Converts a value from degrees to radians. */
exports.$degreesToRadians = (0, _internal_1.createTrignometryOperator)(function (n) { return n * RADIANS_FACTOR; }, {
    Infinity: Infinity,
    "-Infinity": Infinity,
});
