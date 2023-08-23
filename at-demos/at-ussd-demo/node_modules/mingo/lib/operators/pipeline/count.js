"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$count = void 0;
var lazy_1 = require("../../lazy");
var util_1 = require("../../util");
/**
 * Returns a document that contains a count of the number of documents input to the stage.
 *
 * @param {Array} collection
 * @param {String} expr
 * @param {Options} options
 * @return {Object}
 */
function $count(collection, expr, options) {
    var _a;
    (0, util_1.assert)((0, util_1.isString)(expr) &&
        expr.trim() !== "" &&
        expr.indexOf(".") === -1 &&
        expr.trim()[0] !== "$", "Invalid expression value for $count");
    return (0, lazy_1.Lazy)([
        (_a = {},
            _a[expr] = collection.size(),
            _a),
    ]);
}
exports.$count = $count;
