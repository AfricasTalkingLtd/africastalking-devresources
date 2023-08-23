"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$nin = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Returns a boolean indicating whether a specified value is not an array.
 * Note: This expression operator is missing from the documentation
 *
 * @param {Object} obj
 * @param {Array} expr
 */
exports.$nin = (0, _predicates_1.createExpressionOperator)(_predicates_1.$nin);
