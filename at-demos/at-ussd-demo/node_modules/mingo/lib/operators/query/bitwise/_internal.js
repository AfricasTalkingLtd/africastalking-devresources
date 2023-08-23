"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBitwiseOperator = void 0;
var _predicates_1 = require("../../_predicates");
var createBitwiseOperator = function (predicate) {
    return (0, _predicates_1.createQueryOperator)(function (value, mask, options) {
        var b = 0;
        if (mask instanceof Array) {
            for (var _i = 0, mask_1 = mask; _i < mask_1.length; _i++) {
                var n = mask_1[_i];
                b = b | (1 << n);
            }
        }
        else {
            b = mask;
        }
        return predicate(value & b, b);
    });
};
exports.createBitwiseOperator = createBitwiseOperator;
