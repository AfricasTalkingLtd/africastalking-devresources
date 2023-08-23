"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateDiff = void 0;
var core_1 = require("../../../core");
var _internal_1 = require("./_internal");
/**
 * Returns the difference between two dates.
 * @param obj
 * @param expr
 * @param options Options
 */
function $dateDiff(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var d1 = (0, _internal_1.computeDate)(obj, expr.startDate, options);
    var d2 = (0, _internal_1.computeDate)(obj, expr.endDate, options);
    var diff;
    switch (args.unit) {
        case "year":
        case "quarter":
        case "month":
            diff = diffYQM(d1, d2, args.unit);
            break;
        default:
            diff = (d2.getTime() - d1.getTime()) / _internal_1.DURATION_IN_MILLIS[args.unit];
    }
    return diff;
}
exports.$dateDiff = $dateDiff;
var unitMonths = {
    year: 12,
    quarter: 3,
    month: 1,
};
function diffYQM(d1, d2, unit) {
    var months = (d2.getUTCFullYear() - d1.getUTCFullYear()) * 12;
    months -= d1.getUTCMonth();
    months += d2.getUTCMonth();
    return Math.trunc(months / unitMonths[unit]);
}
