"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$count = void 0;
/**
 * Returns the number of documents in the group or window.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @returns {*}
 */
function $count(collection, expr, options) {
    return collection.length;
}
exports.$count = $count;
