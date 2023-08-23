"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateAdd = void 0;
var core_1 = require("../../../core");
var _internal_1 = require("./_internal");
/**
 * Increments a Date object by a specified number of time units.
 * @param obj
 * @param expr
 */
function $dateAdd(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var d = (0, _internal_1.computeDate)(obj, expr.startDate, options);
    switch (args.unit) {
        case "year":
            d.setUTCFullYear(d.getUTCFullYear() + args.amount);
            break;
        case "quarter":
            addMonth(d, 3 * args.amount);
            break;
        case "month":
            addMonth(d, args.amount);
            break;
        default:
            d.setTime(d.getTime() + _internal_1.DURATION_IN_MILLIS[args.unit] * args.amount);
    }
    if (args.timezone) {
        var tz = (0, _internal_1.parseTimezone)(args.timezone);
        (0, _internal_1.adjustDate)(d, tz);
    }
    return d;
}
exports.$dateAdd = $dateAdd;
function addMonth(d, amount) {
    // months start from 0 to 11.
    var m = d.getUTCMonth() + amount;
    var yearOffset = Math.floor(m / 12);
    if (m < 0) {
        var month = (m % 12) + 12;
        d.setUTCFullYear(d.getUTCFullYear() + yearOffset, month, d.getUTCDate());
    }
    else {
        d.setUTCFullYear(d.getUTCFullYear() + yearOffset, m % 12, d.getUTCDate());
    }
}
