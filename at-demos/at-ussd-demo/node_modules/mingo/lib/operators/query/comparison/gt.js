"use strict";
// Query Comparison Operators: https://docs.mongodb.com/manual/reference/operator/query-comparison/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$gt = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Matches values that are greater than a specified value.
 */
exports.$gt = (0, _predicates_1.createQueryOperator)(_predicates_1.$gt);
