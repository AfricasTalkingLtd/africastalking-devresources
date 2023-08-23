"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toDecimal = void 0;
var toDouble_1 = require("./toDouble");
/**
 * Converts a value to a decimal. If the value cannot be converted to a decimal, $toDecimal errors.
 * If the value is null or missing, $toDecimal returns null.
 * This is just an alias for `$toDouble` in this library.
 */
exports.$toDecimal = toDouble_1.$toDouble;
