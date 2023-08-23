"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$stdDevSamp = void 0;
var util_1 = require("../../util");
var _internal_1 = require("./_internal");
var push_1 = require("./push");
/**
 * Returns the sample standard deviation of the input values.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
function $stdDevSamp(collection, expr, options) {
    return (0, _internal_1.stddev)((0, push_1.$push)(collection, expr, options).filter(util_1.isNumber), true);
}
exports.$stdDevSamp = $stdDevSamp;
