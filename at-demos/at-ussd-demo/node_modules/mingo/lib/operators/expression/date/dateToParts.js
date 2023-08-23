"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateToParts = void 0;
var core_1 = require("../../../core");
var _internal_1 = require("./_internal");
/**
 * Returns a document that contains the constituent parts of a given Date value as individual properties.
 * The properties returned are year, month, day, hour, minute, second and millisecond.
 *
 * @param obj
 * @param expr
 * @param options
 */
function $dateToParts(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var d = new Date(args.date);
    var tz = (0, _internal_1.parseTimezone)(args.timezone);
    (0, _internal_1.adjustDate)(d, tz);
    var timePart = {
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        millisecond: d.getUTCMilliseconds(),
    };
    if (args.iso8601 == true) {
        return Object.assign(timePart, {
            isoWeekYear: (0, _internal_1.isoWeekYear)(d),
            isoWeek: (0, _internal_1.isoWeek)(d),
            isoDayOfWeek: d.getUTCDay() || 7,
        });
    }
    return Object.assign(timePart, {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
    });
}
exports.$dateToParts = $dateToParts;
