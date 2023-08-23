"use strict";
// Query Comparison Operators: https://docs.mongodb.com/manual/reference/operator/query-comparison/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ne = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Matches all values that are not equal to the value specified in the query.
 */
exports.$ne = (0, _predicates_1.createQueryOperator)(_predicates_1.$ne);
