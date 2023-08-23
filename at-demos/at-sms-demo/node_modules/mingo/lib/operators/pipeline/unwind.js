"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$unwind = void 0;
var lazy_1 = require("../../lazy");
var util_1 = require("../../util");
/**
 * Takes an array of documents and returns them as a stream of documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array}
 */
function $unwind(collection, expr, options) {
    if ((0, util_1.isString)(expr))
        expr = { path: expr };
    var path = expr.path;
    var field = path.substr(1);
    var includeArrayIndex = (expr === null || expr === void 0 ? void 0 : expr.includeArrayIndex) || false;
    var preserveNullAndEmptyArrays = expr.preserveNullAndEmptyArrays || false;
    var format = function (o, i) {
        if (includeArrayIndex !== false)
            o[includeArrayIndex] = i;
        return o;
    };
    var value;
    return (0, lazy_1.Lazy)(function () {
        var _loop_1 = function () {
            // take from lazy sequence if available
            if (value instanceof lazy_1.Iterator) {
                var tmp = value.next();
                if (!tmp.done)
                    return { value: tmp };
            }
            // fetch next object
            var wrapper = collection.next();
            if (wrapper.done)
                return { value: wrapper };
            // unwrap value
            var obj = wrapper.value;
            // get the value of the field to unwind
            value = (0, util_1.resolve)(obj, field);
            // throw error if value is not an array???
            if (value instanceof Array) {
                if (value.length === 0 && preserveNullAndEmptyArrays === true) {
                    value = null; // reset unwind value
                    (0, util_1.removeValue)(obj, field);
                    return { value: { value: format(obj, null), done: false } };
                }
                else {
                    // construct a lazy sequence for elements per value
                    value = (0, lazy_1.Lazy)(value).map(function (item, i) {
                        var newObj = (0, util_1.resolveGraph)(obj, field, {
                            preserveKeys: true,
                        });
                        (0, util_1.setValue)(newObj, field, item);
                        return format(newObj, i);
                    });
                }
            }
            else if (!(0, util_1.isEmpty)(value) || preserveNullAndEmptyArrays === true) {
                return { value: { value: format(obj, null), done: false } };
            }
        };
        for (;;) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
    });
}
exports.$unwind = $unwind;
