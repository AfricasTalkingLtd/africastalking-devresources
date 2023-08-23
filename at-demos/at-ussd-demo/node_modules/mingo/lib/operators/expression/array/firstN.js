"use strict";
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN-array-element/#mongodb-expression-exp.-firstN
Object.defineProperty(exports, "__esModule", { value: true });
exports.$firstN = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var firstN_1 = require("../../accumulator/firstN");
/**
 * Returns a specified number of elements from the beginning of an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $firstN(obj, expr, options) {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return (0, firstN_1.$firstN)(obj, expr, options);
    var _a = (0, core_1.computeValue)(obj, expr, null, options), input = _a.input, n = _a.n;
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(input), "Must resolve to an array/null or missing");
    return (0, firstN_1.$firstN)(input, { n: n, input: "$$this" }, options);
}
exports.$firstN = $firstN;
