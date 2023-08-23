"use strict";
// Query Bitwise Operators: https://docs.mongodb.com/manual/reference/operator/query-bitwise/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bitsAnySet = void 0;
var _internal_1 = require("./_internal");
/**
 * Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.
 */
exports.$bitsAnySet = (0, _internal_1.createBitwiseOperator)(function (result, _) { return result > 0; });
