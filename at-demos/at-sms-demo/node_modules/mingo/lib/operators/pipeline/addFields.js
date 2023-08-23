"use strict";
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
exports.$addFields = void 0;
var core_1 = require("../../core");
var util_1 = require("../../util");
/**
 * Adds new fields to documents.
 * Outputs documents that contain all existing fields from the input documents and newly added fields.
 *
 * @param {Iterator} collection
 * @param {Object} expr
 * @param {Options} options
 */
function $addFields(collection, expr, options) {
    var newFields = Object.keys(expr);
    if (newFields.length === 0)
        return collection;
    return collection.map(function (obj) {
        var newObj = __assign({}, obj);
        for (var _i = 0, newFields_1 = newFields; _i < newFields_1.length; _i++) {
            var field = newFields_1[_i];
            var newValue = (0, core_1.computeValue)(obj, expr[field], null, options);
            if (newValue !== undefined) {
                (0, util_1.setValue)(newObj, field, newValue);
            }
            else {
                (0, util_1.removeValue)(newObj, field);
            }
        }
        return newObj;
    });
}
exports.$addFields = $addFields;
