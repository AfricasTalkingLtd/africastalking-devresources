"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$atan = void 0;
var _internal_1 = require("./_internal");
/** Returns the inverse tangent (arc tangent) of a value in radians. */
exports.$atan = (0, _internal_1.createTrignometryOperator)(Math.atan);
