"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$acos = void 0;
var _internal_1 = require("./_internal");
/** Returns the inverse cosine (arc cosine) of a value in radians. */
exports.$acos = (0, _internal_1.createTrignometryOperator)(Math.acos, {
    Infinity: Infinity,
    0: new Error(),
});
