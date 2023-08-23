"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$tan = void 0;
var _internal_1 = require("./_internal");
/** Returns the tangent of a value that is measured in radians. */
exports.$tan = (0, _internal_1.createTrignometryOperator)(Math.tan);
