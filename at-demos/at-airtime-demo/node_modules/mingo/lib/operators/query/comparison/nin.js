"use strict";
// Query Comparison Operators: https://docs.mongodb.com/manual/reference/operator/query-comparison/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$nin = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Matches values that do not exist in an array specified to the query.
 */
exports.$nin = (0, _predicates_1.createQueryOperator)(_predicates_1.$nin);
