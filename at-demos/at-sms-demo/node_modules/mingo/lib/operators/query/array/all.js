"use strict";
// Query Array Operators: https://docs.mongodb.com/manual/reference/operator/query-array/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$all = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Matches arrays that contain all elements specified in the query.
 */
exports.$all = (0, _predicates_1.createQueryOperator)(_predicates_1.$all);
