"use strict";
// Query Array Operators: https://docs.mongodb.com/manual/reference/operator/query-array/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$elemMatch = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Selects documents if element in the array field matches all the specified $elemMatch conditions.
 */
exports.$elemMatch = (0, _predicates_1.createQueryOperator)(_predicates_1.$elemMatch);
