"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$rtrim = void 0;
var _internal_1 = require("./_internal");
/**
 * Removes whitespace characters, including null, or the specified characters from the end of a string.
 *
 * @param obj
 * @param expr
 */
function $rtrim(obj, expr, options) {
    return (0, _internal_1.trimString)(obj, expr, options, { left: false, right: true });
}
exports.$rtrim = $rtrim;
