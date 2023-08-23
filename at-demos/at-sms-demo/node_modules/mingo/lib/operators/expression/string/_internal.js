"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexSearch = exports.trimString = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var WHITESPACE_CHARS = [
    0x0000,
    0x0020,
    0x0009,
    0x000a,
    0x000b,
    0x000c,
    0x000d,
    0x00a0,
    0x1680,
    0x2000,
    0x2001,
    0x2002,
    0x2003,
    0x2004,
    0x2005,
    0x2006,
    0x2007,
    0x2008,
    0x2009,
    0x200a, // Hair space
];
/**
 * Trims the resolved string
 *
 * @param obj
 * @param expr
 * @param options
 */
function trimString(obj, expr, options, trimOpts) {
    var val = (0, core_1.computeValue)(obj, expr, null, options);
    var s = val.input;
    if ((0, util_1.isNil)(s))
        return null;
    var codepoints = (0, util_1.isNil)(val.chars)
        ? WHITESPACE_CHARS
        : val.chars.split("").map(function (c) { return c.codePointAt(0); });
    var i = 0;
    var j = s.length - 1;
    while (trimOpts.left &&
        i <= j &&
        codepoints.indexOf(s[i].codePointAt(0)) !== -1)
        i++;
    while (trimOpts.right &&
        i <= j &&
        codepoints.indexOf(s[j].codePointAt(0)) !== -1)
        j--;
    return s.substring(i, j + 1);
}
exports.trimString = trimString;
/**
 * Performs a regex search
 *
 * @param obj
 * @param expr
 * @param opts
 */
function regexSearch(obj, expr, options, reOpts) {
    var val = (0, core_1.computeValue)(obj, expr, null, options);
    if (!(0, util_1.isString)(val.input))
        return [];
    var regexOptions = val.options;
    if (regexOptions) {
        (0, util_1.assert)(regexOptions.indexOf("x") === -1, "extended capability option 'x' not supported");
        (0, util_1.assert)(regexOptions.indexOf("g") === -1, "global option 'g' not supported");
    }
    var input = val.input;
    var re = new RegExp(val.regex, regexOptions);
    var m;
    var matches = [];
    var offset = 0;
    while ((m = re.exec(input))) {
        var result = {
            match: m[0],
            idx: m.index + offset,
            captures: [],
        };
        for (var i = 1; i < m.length; i++) {
            result.captures.push(m[i] || null);
        }
        matches.push(result);
        if (!reOpts.global)
            break;
        offset = m.index + m[0].length;
        input = input.substr(offset);
    }
    return matches;
}
exports.regexSearch = regexSearch;
