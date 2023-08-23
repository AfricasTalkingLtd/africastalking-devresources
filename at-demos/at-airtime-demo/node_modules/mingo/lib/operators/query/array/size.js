"use strict";
// Query Array Operators: https://docs.mongodb.com/manual/reference/operator/query-array/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$size = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Selects documents if the array field is a specified size.
 */
exports.$size = (0, _predicates_1.createQueryOperator)(_predicates_1.$size);
