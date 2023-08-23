"use strict";
// Miscellaneous Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#miscellaneous-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sampleRate = void 0;
var core_1 = require("../../../core");
/**
 * Randomly select documents at a given rate.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
var $sampleRate = function (obj, expr, options) { return Math.random() <= (0, core_1.computeValue)(obj, expr, null, options); };
exports.$sampleRate = $sampleRate;
