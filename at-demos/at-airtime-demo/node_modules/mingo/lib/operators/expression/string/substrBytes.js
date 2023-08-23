"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$substrBytes = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var UTF8_MASK = [0xc0, 0xe0, 0xf0];
// encodes a unicode code point to a utf8 byte sequence
// https://encoding.spec.whatwg.org/#utf-8
function toUtf8(n) {
    if (n < 0x80)
        return [n];
    var count = (n < 0x0800 && 1) || (n < 0x10000 && 2) || 3;
    var offset = UTF8_MASK[count - 1];
    var utf8 = [(n >> (6 * count)) + offset];
    while (count > 0)
        utf8.push(0x80 | ((n >> (6 * --count)) & 0x3f));
    return utf8;
}
function utf8Encode(s) {
    var buf = [];
    for (var i = 0, len = s.length; i < len; i++) {
        buf.push(toUtf8(s.codePointAt(i)));
    }
    return buf;
}
/**
 * Returns a substring of a string, starting at a specified index position and including the specified number of characters.
 * The index is zero-based.
 *
 * @param obj
 * @param expr
 * @returns {string}
 */
function $substrBytes(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var s = args[0];
    var index = args[1];
    var count = args[2];
    (0, util_1.assert)((0, util_1.isString)(s) &&
        (0, util_1.isNumber)(index) &&
        index >= 0 &&
        (0, util_1.isNumber)(count) &&
        count >= 0, "$substrBytes: invalid arguments");
    var buf = utf8Encode(s);
    var validIndex = [];
    var acc = 0;
    for (var i = 0; i < buf.length; i++) {
        validIndex.push(acc);
        acc += buf[i].length;
    }
    var begin = validIndex.indexOf(index);
    var end = validIndex.indexOf(index + count);
    (0, util_1.assert)(begin > -1 && end > -1, "$substrBytes: invalid range, start or end index is a UTF-8 continuation byte.");
    return s.substring(begin, end);
}
exports.$substrBytes = $substrBytes;
