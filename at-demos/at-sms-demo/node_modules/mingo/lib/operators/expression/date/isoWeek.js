"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isoWeek = void 0;
var _internal_1 = require("./_internal");
/**
 * Returns the week number in ISO 8601 format, ranging from 1 to 53.
 * Week numbers start at 1 with the week (Monday through Sunday) that contains the year's first Thursday.
 * @param obj
 * @param expr
 */
function $isoWeek(obj, expr, options) {
    return (0, _internal_1.isoWeek)((0, _internal_1.computeDate)(obj, expr, options));
}
exports.$isoWeek = $isoWeek;
