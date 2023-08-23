import { computeValue } from "../../../core";
import { assert, isNil, isString } from "../../../util";
const WHITESPACE_CHARS = [
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
export function trimString(obj, expr, options, trimOpts) {
    const val = computeValue(obj, expr, null, options);
    const s = val.input;
    if (isNil(s))
        return null;
    const codepoints = isNil(val.chars)
        ? WHITESPACE_CHARS
        : val.chars.split("").map((c) => c.codePointAt(0));
    let i = 0;
    let j = s.length - 1;
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
/**
 * Performs a regex search
 *
 * @param obj
 * @param expr
 * @param opts
 */
export function regexSearch(obj, expr, options, reOpts) {
    const val = computeValue(obj, expr, null, options);
    if (!isString(val.input))
        return [];
    const regexOptions = val.options;
    if (regexOptions) {
        assert(regexOptions.indexOf("x") === -1, "extended capability option 'x' not supported");
        assert(regexOptions.indexOf("g") === -1, "global option 'g' not supported");
    }
    let input = val.input;
    const re = new RegExp(val.regex, regexOptions);
    let m;
    const matches = [];
    let offset = 0;
    while ((m = re.exec(input))) {
        const result = {
            match: m[0],
            idx: m.index + offset,
            captures: [],
        };
        for (let i = 1; i < m.length; i++) {
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
