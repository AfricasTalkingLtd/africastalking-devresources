"use strict";
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN-array-element/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$maxN = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var maxN_1 = require("../../accumulator/maxN");
/**
 * Returns the n largest values in an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $maxN(obj, expr, options) {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return (0, maxN_1.$maxN)(obj, expr, options);
    var _a = (0, core_1.computeValue)(obj, expr, null, options), input = _a.input, n = _a.n;
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(input), "Must resolve to an array/null or missing");
    return (0, maxN_1.$maxN)(input, { n: n, input: "$$this" }, options);
}
exports.$maxN = $maxN;
