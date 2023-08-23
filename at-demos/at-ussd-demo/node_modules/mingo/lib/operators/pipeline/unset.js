"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$unset = void 0;
var util_1 = require("../../util");
var project_1 = require("./project");
/**
 * Removes/excludes fields from documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Iterator}
 */
function $unset(collection, expr, options) {
    expr = (0, util_1.ensureArray)(expr);
    var doc = {};
    for (var _i = 0, expr_1 = expr; _i < expr_1.length; _i++) {
        var k = expr_1[_i];
        doc[k] = 0;
    }
    return (0, project_1.$project)(collection, doc, options);
}
exports.$unset = $unset;
