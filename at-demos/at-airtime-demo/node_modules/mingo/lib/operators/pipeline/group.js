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
exports.$group = void 0;
var core_1 = require("../../core");
var util_1 = require("../../util");
// lookup key for grouping
var ID_KEY = "_id";
/**
 * Groups documents together for the purpose of calculating aggregate values based on a collection of documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array}
 */
function $group(collection, expr, options) {
    var idExpr = expr[ID_KEY];
    var copts = core_1.ComputeOptions.init(options);
    return collection.transform(function (coll) {
        var partitions = (0, util_1.groupBy)(coll, function (obj) { return (0, core_1.computeValue)(obj, idExpr, null, options); }, options === null || options === void 0 ? void 0 : options.hashFunction);
        // remove the group key
        expr = __assign({}, expr);
        delete expr[ID_KEY];
        var i = -1;
        var size = partitions.keys.length;
        return function () {
            if (++i === size)
                return { done: true };
            var groupId = partitions.keys[i];
            var obj = {};
            // exclude undefined key value
            if (groupId !== undefined) {
                obj[ID_KEY] = groupId;
            }
            // compute remaining keys in expression
            for (var _i = 0, _a = Object.entries(expr); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], val = _b[1];
                obj[key] = (0, core_1.computeValue)(partitions.groups[i], val, key, copts.update(null, { groupId: groupId }));
            }
            return { value: obj, done: false };
        };
    });
}
exports.$group = $group;
