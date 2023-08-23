"use strict";
// Comparison Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#comparison-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lte = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Matches values that are less than or equal to the value specified in the query.
 */
exports.$lte = (0, _predicates_1.createExpressionOperator)(_predicates_1.$lte);
