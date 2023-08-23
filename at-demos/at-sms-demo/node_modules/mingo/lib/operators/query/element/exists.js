"use strict";
// Query Element Operators: https://docs.mongodb.com/manual/reference/operator/query-element/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$exists = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Matches documents that have the specified field.
 */
exports.$exists = (0, _predicates_1.createQueryOperator)(_predicates_1.$exists);
