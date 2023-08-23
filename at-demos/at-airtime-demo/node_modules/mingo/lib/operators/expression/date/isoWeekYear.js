"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isoWeekYear = void 0;
var _internal_1 = require("./_internal");
/**
 * Returns the year number in ISO 8601 format. The year starts with the Monday of week 1 and ends with the Sunday of the last week.
 * @param obj
 * @param expr
 */
function $isoWeekYear(obj, expr, options) {
    var d = (0, _internal_1.computeDate)(obj, expr, options);
    return (d.getUTCFullYear() -
        Number(d.getUTCMonth() == 0 && d.getUTCDate() == 1 && d.getUTCDay() < 1));
}
exports.$isoWeekYear = $isoWeekYear;
