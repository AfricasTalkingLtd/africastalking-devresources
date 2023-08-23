"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setUnion = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Returns a set that holds all elements of the input sets.
 * @param obj
 * @param expr
 */
function $setUnion(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    (0, util_1.assert)((0, util_1.isArray)(args) && args.length == 2 && args.every(util_1.isArray), "$setUnion: arguments must be arrays");
    return (0, util_1.unique)(args[0].concat(args[1]), options === null || options === void 0 ? void 0 : options.hashFunction);
}
exports.$setUnion = $setUnion;
