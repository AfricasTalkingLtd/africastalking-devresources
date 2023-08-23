"use strict";
// Query Bitwise Operators: https://docs.mongodb.com/manual/reference/operator/query-bitwise/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bitsAnyClear = void 0;
var _internal_1 = require("./_internal");
/**
 * Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.
 */
exports.$bitsAnyClear = (0, _internal_1.createBitwiseOperator)(function (result, mask) { return result < mask; });
