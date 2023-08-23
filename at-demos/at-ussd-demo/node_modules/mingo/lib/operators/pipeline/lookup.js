"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lookup = void 0;
var util_1 = require("../../util");
/**
 * Performs a left outer join to another collection in the same database to filter in documents from the “joined” collection for processing.
 *
 * @param collection
 * @param expr
 * @param opt
 */
function $lookup(collection, expr, options) {
    var joinColl = (0, util_1.isString)(expr.from)
        ? options === null || options === void 0 ? void 0 : options.collectionResolver(expr.from)
        : expr.from;
    (0, util_1.assert)(joinColl instanceof Array, "'from' field must resolve to an array");
    var hash = {};
    for (var _i = 0, joinColl_1 = joinColl; _i < joinColl_1.length; _i++) {
        var obj = joinColl_1[_i];
        var k = (0, util_1.hashCode)((0, util_1.resolve)(obj, expr.foreignField), options === null || options === void 0 ? void 0 : options.hashFunction);
        hash[k] = hash[k] || [];
        hash[k].push(obj);
    }
    return collection.map(function (obj) {
        var k = (0, util_1.hashCode)((0, util_1.resolve)(obj, expr.localField), options === null || options === void 0 ? void 0 : options.hashFunction);
        var newObj = (0, util_1.into)({}, obj);
        newObj[expr.as] = hash[k] || [];
        return newObj;
    });
}
exports.$lookup = $lookup;
