"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$millisecond = void 0;
var _internal_1 = require("./_internal");
/**
 * Returns the milliseconds of a date as a number between 0 and 999.
 * @param obj
 * @param expr
 */
function $millisecond(obj, expr, options) {
    return (0, _internal_1.computeDate)(obj, expr, options).getUTCMilliseconds();
}
exports.$millisecond = $millisecond;
