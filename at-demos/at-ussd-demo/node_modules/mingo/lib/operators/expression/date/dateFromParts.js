"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateFromParts = void 0;
var core_1 = require("../../../core");
var _internal_1 = require("./_internal");
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var getDaysInMonth = function (date) {
    return date.month == 2 && (0, _internal_1.isLeapYear)(date.year)
        ? 29
        : DAYS_IN_MONTH[date.month - 1];
};
/**
 * Constructs and returns a Date object given the date’s constituent properties.
 *
 * @param obj The document
 * @param expr The date expression
 * @param options Options
 */
function $dateFromParts(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var minuteOffset = (0, _internal_1.parseTimezone)(args.timezone);
    // assign default and adjust value ranges of the different parts
    for (var i = _internal_1.DATE_PART_INTERVAL.length - 1, remainder = 0; i >= 0; i--) {
        var datePartInterval = _internal_1.DATE_PART_INTERVAL[i];
        var k = datePartInterval[0];
        var min = datePartInterval[1];
        var max = datePartInterval[2];
        // add remainder from previous part. units should already be correct
        var part = (args[k] || 0) + remainder;
        // reset remainder now that it's been used.
        remainder = 0;
        // 1. compute the remainder for the next part
        // 2. adjust the current part to a valid range
        // 3. assign back to 'args'
        var limit = max + 1;
        // invert timezone to adjust the hours to UTC
        if (k == "hour")
            part += Math.floor(minuteOffset / _internal_1.MINUTES_PER_HOUR) * -1;
        if (k == "minute")
            part += (minuteOffset % _internal_1.MINUTES_PER_HOUR) * -1;
        // smaller than lower bound
        if (part < min) {
            var delta = min - part;
            remainder = -1 * Math.ceil(delta / limit);
            part = limit - (delta % limit);
        }
        else if (part > max) {
            // offset with the 'min' value to adjust non-zero date parts correctly
            part += min;
            remainder = Math.trunc(part / limit);
            part %= limit;
        }
        // reassign
        args[k] = part;
    }
    // adjust end of month to correctly handle overflows
    args.day = Math.min(args.day, getDaysInMonth(args));
    return new Date(Date.UTC(args.year, args.month - 1, args.day, args.hour, args.minute, args.second, args.millisecond));
}
exports.$dateFromParts = $dateFromParts;
