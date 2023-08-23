"use strict";
// Miscellaneous Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/rand/#mongodb-expression-exp.-rand
Object.defineProperty(exports, "__esModule", { value: true });
exports.$rand = void 0;
/**
 * Returns a random float between 0 and 1.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
var $rand = function (obj, expr, options) { return Math.random(); };
exports.$rand = $rand;
