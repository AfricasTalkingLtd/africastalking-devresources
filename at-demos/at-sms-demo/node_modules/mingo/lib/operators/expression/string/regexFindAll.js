"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$regexFindAll = void 0;
var _internal_1 = require("./_internal");
/**
 * Applies a regular expression (regex) to a string and returns information on the all matched substrings.
 *
 * @param obj
 * @param expr
 */
function $regexFindAll(obj, expr, options) {
    return (0, _internal_1.regexSearch)(obj, expr, options, { global: true });
}
exports.$regexFindAll = $regexFindAll;
