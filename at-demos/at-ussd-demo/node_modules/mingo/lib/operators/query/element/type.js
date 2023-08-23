"use strict";
// Query Element Operators: https://docs.mongodb.com/manual/reference/operator/query-element/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$type = void 0;
var _predicates_1 = require("../../_predicates");
/**
 * Selects documents if a field is of the specified type.
 */
exports.$type = (0, _predicates_1.createQueryOperator)(_predicates_1.$type);
