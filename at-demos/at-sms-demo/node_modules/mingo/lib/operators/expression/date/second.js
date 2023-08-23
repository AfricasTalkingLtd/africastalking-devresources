"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$second = void 0;
var _internal_1 = require("./_internal");
/**
 * Returns the seconds for a date as a number between 0 and 60 (leap seconds).
 * @param obj
 * @param expr
 */
function $second(obj, expr, options) {
    return (0, _internal_1.computeDate)(obj, expr, options).getUTCSeconds();
}
exports.$second = $second;
