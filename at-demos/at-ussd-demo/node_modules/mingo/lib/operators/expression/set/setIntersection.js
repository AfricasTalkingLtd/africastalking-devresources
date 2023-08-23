"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setIntersection = void 0;
var core_1 = require("../../../core");
var util_1 = require("../../../util");
/**
 * Returns the common elements of the input sets.
 * @param obj
 * @param expr
 */
function $setIntersection(obj, expr, options) {
    var args = (0, core_1.computeValue)(obj, expr, null, options);
    (0, util_1.assert)((0, util_1.isArray)(args) && args.every(util_1.isArray), "$setIntersection: expresssion must resolve to array of arrays");
    return (0, util_1.intersection)(args, options === null || options === void 0 ? void 0 : options.hashFunction);
}
exports.$setIntersection = $setIntersection;
