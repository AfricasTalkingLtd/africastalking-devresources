"use strict";
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN-array-element/#mongodb-expression-exp.-lastN
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lastN = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var lastN_1 = require("../../accumulator/lastN");
/**
 * Returns a specified number of elements from the end of an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $lastN(obj, expr, options) {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return (0, lastN_1.$lastN)(obj, expr, options);
    var _a = (0, core_1.computeValue)(obj, expr, null, options), input = _a.input, n = _a.n;
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(input), "Must resolve to an array/null or missing");
    return (0, lastN_1.$lastN)(input, { n: n, input: "$$this" }, options);
}
exports.$lastN = $lastN;
