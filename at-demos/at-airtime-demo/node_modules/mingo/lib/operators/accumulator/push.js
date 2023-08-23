"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$push = void 0;
var core_1 = require("../../core");
var util_1 = require("../../util");
/**
 * Returns an array of all values for the selected field among for each document in that group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {Array|*}
 */
function $push(collection, expr, options) {
    if ((0, util_1.isNil)(expr))
        return collection;
    var copts = core_1.ComputeOptions.init(options);
    return collection.map(function (obj) {
        return (0, core_1.computeValue)(obj, expr, null, copts.update(obj));
    });
}
exports.$push = $push;
