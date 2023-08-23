"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setEquals = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Returns true if two sets have the same elements.
 * @param obj
 * @param expr
 */
function $setEquals(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    var xs = (0, util_1.unique)(args[0], options === null || options === void 0 ? void 0 : options.hashFunction);
    var ys = (0, util_1.unique)(args[1], options === null || options === void 0 ? void 0 : options.hashFunction);
    return (xs.length === ys.length &&
        xs.length === (0, util_1.intersection)([xs, ys], options === null || options === void 0 ? void 0 : options.hashFunction).length);
}
exports.$setEquals = $setEquals;
