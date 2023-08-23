"use strict";
// Query Bitwise Operators: https://docs.mongodb.com/manual/reference/operator/query-bitwise/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bitsAllClear = void 0;
var _internal_1 = require("./_internal");
/**
 * Matches numeric or binary values in which a set of bit positions all have a value of 0.
 */
exports.$bitsAllClear = (0, _internal_1.createBitwiseOperator)(function (result, _) { return result == 0; });
