"use strict";
// Query Comparison Operators: https://docs.mongodb.com/manual/reference/operator/query-comparison/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lte = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Matches values that are less than or equal to the value specified in the query.
 */
exports.$lte = (0, _predicates_1.createQueryOperator)(_predicates_1.$lte);
