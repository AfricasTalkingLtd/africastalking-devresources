"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$last = void 0;
var core_1 = require("../../core");
/**
 * Returns the last value in the collection.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
function $last(collection, expr, options) {
    return collection.length > 0
        ? (0, core_1.computeValue)(collection[collection.length - 1], expr, null, options)
        : undefined;
}
exports.$last = $last;
