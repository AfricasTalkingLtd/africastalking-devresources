"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isoDayOfWeek = void 0;
var _internal_1 = require("./_internal");
/**
 * Returns the weekday number in ISO 8601 format, ranging from 1 (Monday) to 7 (Sunday).
 * @param obj
 * @param expr
 */
function $isoDayOfWeek(obj, expr, options) {
    return (0, _internal_1.computeDate)(obj, expr, options).getUTCDay() || 7;
}
exports.$isoDayOfWeek = $isoDayOfWeek;
