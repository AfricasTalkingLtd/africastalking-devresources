"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setIsSubset = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Returns true if all elements of a set appear in a second set.
 * @param obj
 * @param expr
 */
function $setIsSubset(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    return (0, util_1.intersection)(args, options === null || options === void 0 ? void 0 : options.hashFunction).length === args[0].length;
}
exports.$setIsSubset = $setIsSubset;
