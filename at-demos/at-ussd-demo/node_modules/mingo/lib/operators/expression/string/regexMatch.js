"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$regexMatch = void 0;
var _internal_1 = require("./_internal");
/**
 * Applies a regular expression (regex) to a string and returns a boolean that indicates if a match is found or not.
 *
 * @param obj
 * @param expr
 */
function $regexMatch(obj, expr, options) {
    return (0, _internal_1.regexSearch)(obj, expr, options, { global: false }).length != 0;
}
exports.$regexMatch = $regexMatch;
