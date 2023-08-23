"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sin = void 0;
var _internal_1 = require("./_internal");
/** Returns the sine of a value that is measured in radians. */
exports.$sin = (0, _internal_1.createTrignometryOperator)(Math.sin);
