"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateToString = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var _internal_1 = require("./_internal");
var dayOfMonth_1 = require("./dayOfMonth");
var hour_1 = require("./hour");
var isoDayOfWeek_1 = require("./isoDayOfWeek");
var isoWeek_1 = require("./isoWeek");
var millisecond_1 = require("./millisecond");
var minute_1 = require("./minute");
var month_1 = require("./month");
var second_1 = require("./second");
var week_1 = require("./week");
var year_1 = require("./year");
// date functions for format specifiers
var DATE_FUNCTIONS = {
    "%Y": year_1.$year,
    "%G": year_1.$year,
    "%m": month_1.$month,
    "%d": dayOfMonth_1.$dayOfMonth,
    "%H": hour_1.$hour,
    "%M": minute_1.$minute,
    "%S": second_1.$second,
    "%L": millisecond_1.$millisecond,
    "%u": isoDayOfWeek_1.$isoDayOfWeek,
    "%U": week_1.$week,
    "%V": isoWeek_1.$isoWeek,
};
/**
 * Returns the date as a formatted string.
 *
 * %d	Day of Month (2 digits, zero padded)	01-31
 * %G	Year in ISO 8601 format	0000-9999
 * %H	Hour (2 digits, zero padded, 24-hour clock)	00-23
 * %L	Millisecond (3 digits, zero padded)	000-999
 * %m	Month (2 digits, zero padded)	01-12
 * %M	Minute (2 digits, zero padded)	00-59
 * %S	Second (2 digits, zero padded)	00-60
 * %u	Day of week number in ISO 8601 format (1-Monday, 7-Sunday)	1-7
 * %V	Week of Year in ISO 8601 format	1-53
 * %Y	Year (4 digits, zero padded)	0000-9999
 * %z	The timezone offset from UTC.	+/-[hh][mm]
 * %Z	The minutes offset from UTC as a number. For example, if the timezone offset (+/-[hhmm]) was +0445, the minutes offset is +285.	+/-mmm
 * %%	Percent Character as a Literal	%
 *
 * @param obj current object
 * @param expr operator expression
 */
function $dateToString(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(args.onNull))
        args.onNull = null;
    if ((0, util_1.isNil)(args.date))
        return args.onNull;
    var date = (0, _internal_1.computeDate)(obj, args.date, options);
    var format = args.format || _internal_1.DATE_FORMAT;
    var minuteOffset = (0, _internal_1.parseTimezone)(args.timezone);
    var matches = format.match(/(%%|%Y|%G|%m|%d|%H|%M|%S|%L|%u|%U|%V|%z|%Z)/g);
    // adjust the date to reflect timezone
    (0, _internal_1.adjustDate)(date, minuteOffset);
    for (var i = 0, len = matches.length; i < len; i++) {
        var formatSpecifier = matches[i];
        var props = _internal_1.DATE_SYM_TABLE[formatSpecifier];
        var operatorFn = DATE_FUNCTIONS[formatSpecifier];
        var value = void 0;
        if ((0, util_1.isObject)(props)) {
            // reuse date
            if (props.name === "timezone") {
                value = (0, _internal_1.formatTimezone)(minuteOffset);
            }
            else if (props.name === "minuteOffset") {
                value = minuteOffset.toString();
            }
            else {
                (0, util_1.assert)(!!operatorFn, "unsupported date format specifier '".concat(formatSpecifier, "'"));
                value = (0, _internal_1.padDigits)(operatorFn(obj, date, options), props.padding);
            }
        }
        // replace the match with resolved value
        format = format.replace(formatSpecifier, value);
    }
    return format;
}
exports.$dateToString = $dateToString;
