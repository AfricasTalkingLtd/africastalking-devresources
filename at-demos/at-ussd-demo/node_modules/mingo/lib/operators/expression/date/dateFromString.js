"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateFromString = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var _internal_1 = require("./_internal");
var buildMap = function (letters, sign) {
    var h = {};
    letters.split("").forEach(function (v, i) { return (h[v] = sign * (i + 1)); });
    return h;
};
var TZ_LETTER_OFFSETS = __assign(__assign(__assign({}, buildMap("ABCDEFGHIKLM", 1)), buildMap("NOPQRSTUVWXY", -1)), { Z: 0 });
/**
 * Converts a date/time string to a date object.
 * @param obj
 * @param expr
 */
function $dateFromString(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    args.format = args.format || _internal_1.DATE_FORMAT;
    args.onNull = args.onNull || null;
    var dateString = args.dateString;
    if ((0, util_1.isNil)(dateString))
        return args.onNull;
    // collect all separators of the format string
    var separators = args.format.split(/%[YGmdHMSLuVzZ]/);
    separators.reverse();
    var matches = args.format.match(/(%%|%Y|%G|%m|%d|%H|%M|%S|%L|%u|%V|%z|%Z)/g);
    var dateParts = {};
    // holds the valid regex of parts that matches input date string
    var expectedPattern = "";
    for (var i = 0, len = matches.length; i < len; i++) {
        var formatSpecifier = matches[i];
        var props = _internal_1.DATE_SYM_TABLE[formatSpecifier];
        if ((0, util_1.isObject)(props)) {
            // get pattern and alias from table
            var m_1 = props.re.exec(dateString);
            // get the next separtor
            var delimiter = separators.pop() || "";
            if (m_1 !== null) {
                // store and cut out matched part
                dateParts[props.name] = /^\d+$/.exec(m_1[0]) ? parseInt(m_1[0]) : m_1[0];
                dateString =
                    dateString.substr(0, m_1.index) +
                        dateString.substr(m_1.index + m_1[0].length);
                // construct expected pattern
                expectedPattern +=
                    (0, _internal_1.regexQuote)(delimiter) + (0, _internal_1.regexStrip)(props.re.toString());
            }
            else {
                dateParts[props.name] = null;
            }
        }
    }
    // 1. validate all required date parts exists
    // 2. validate original dateString against expected pattern.
    if ((0, util_1.isNil)(dateParts.year) ||
        (0, util_1.isNil)(dateParts.month) ||
        (0, util_1.isNil)(dateParts.day) ||
        !new RegExp("^" + expectedPattern + "[A-Z]?$").exec(args.dateString)) {
        return args.onError;
    }
    var m = args.dateString.match(/([A-Z])$/);
    (0, util_1.assert)(
    // only one of in-date timeone or timezone argument but not both.
    !(m && args.timezone), "$dateFromString: you cannot pass in a date/time string with time zone information ('".concat(m && m[0], "') together with a timezone argument"));
    var minuteOffset = m
        ? TZ_LETTER_OFFSETS[m[0]] * _internal_1.MINUTES_PER_HOUR
        : (0, _internal_1.parseTimezone)(args.timezone);
    // create the date. month is 0-based in Date
    var d = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, 0, 0, 0));
    if (!(0, util_1.isNil)(dateParts.hour))
        d.setUTCHours(dateParts.hour);
    if (!(0, util_1.isNil)(dateParts.minute))
        d.setUTCMinutes(dateParts.minute);
    if (!(0, util_1.isNil)(dateParts.second))
        d.setUTCSeconds(dateParts.second);
    if (!(0, util_1.isNil)(dateParts.millisecond))
        d.setUTCMilliseconds(dateParts.millisecond);
    // adjust to the correct represention for UTC
    (0, _internal_1.adjustDate)(d, -minuteOffset);
    return d;
}
exports.$dateFromString = $dateFromString;
