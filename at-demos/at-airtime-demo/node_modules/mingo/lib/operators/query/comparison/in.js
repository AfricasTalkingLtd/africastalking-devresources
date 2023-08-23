"use strict";
// Query Comparison Operators: https://docs.mongodb.com/manual/reference/operator/query-comparison/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$in = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Matches any of the values that exist in an array specified in the query.
 */
exports.$in = (0, _predicates_1.createQueryOperator)(_predicates_1.$in);
