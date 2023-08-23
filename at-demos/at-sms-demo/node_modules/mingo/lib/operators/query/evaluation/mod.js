"use strict";
// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$mod = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Performs a modulo operation on the value of a field and selects documents with a specified result.
 */
exports.$mod = (0, _predicates_1.createQueryOperator)(_predicates_1.$mod);
