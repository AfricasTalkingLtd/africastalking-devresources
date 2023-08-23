"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$week = void 0;
var _internal_1 = require("./_internal");
/**
 * Returns the week of the year for a date as a number between 0 and 53.
 * Weeks begin on Sundays, and week 1 begins with the first Sunday of the year. Days preceding the first Sunday of the year are in week 0
 * @param obj
 * @param expr
 */
function $week(obj, expr, options) {
    var d = (0, _internal_1.computeDate)(obj, expr, options);
    var result = (0, _internal_1.isoWeek)(d);
    // check for starting of year and adjust accordingly
    if (d.getUTCDay() > 0 && d.getUTCDate() == 1 && d.getUTCMonth() == 0)
        return 0;
    // adjust for week start on Sunday
    if (d.getUTCDay() == 0)
        return result + 1;
    // else
    return result;
}
exports.$week = $week;
