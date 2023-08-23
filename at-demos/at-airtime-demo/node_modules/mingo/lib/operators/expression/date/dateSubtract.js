"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateSubtract = void 0;
var core_1 = require("../../../core");
var dateAdd_1 = require("./dateAdd");
/**
 * Decrements a Date object by a specified number of time units.
 * @param obj
 * @param expr
 */
function $dateSubtract(obj, expr, options) {
    var amount = (0, core_1.computeValue)(obj, expr === null || expr === void 0 ? void 0 : expr.amount, null, options);
    return (0, dateAdd_1.$dateAdd)(obj, __assign(__assign({}, expr), { amount: -1 * amount }), options);
}
exports.$dateSubtract = $dateSubtract;
