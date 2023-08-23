"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$round = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
var _internal_1 = require("./_internal");
/**
 * Rounds a number to to a whole integer or to a specified decimal place.
 * @param {*} obj
 * @param {*} expr
 */
function $round(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var num = args[0];
    var place = args[1];
    if ((0, util_1.isNil)(num) || isNaN(num) || Math.abs(num) === Infinity)
        return num;
    (0, util_1.assert)((0, util_1.isNumber)(num), "$round expression must resolve to a number.");
    return (0, _internal_1.truncate)(num, place, true);
}
exports.$round = $round;
