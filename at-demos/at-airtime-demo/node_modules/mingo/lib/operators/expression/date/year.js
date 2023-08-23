"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$year = void 0;
var _internal_1 = require("./_internal");
/**
 * Returns the year for a date as a number (e.g. 2014).
 * @param obj
 * @param expr
 */
function $year(obj, expr, options) {
    return (0, _internal_1.computeDate)(obj, expr, options).getUTCFullYear();
}
exports.$year = $year;
