"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$first = void 0;
var core_1 = require("../../core");
/**
 * Returns the first value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @returns {*}
 */
function $first(collection, expr, options) {
    return collection.length > 0
        ? (0, core_1.computeValue)(collection[0], expr, null, options)
        : undefined;
}
exports.$first = $first;
