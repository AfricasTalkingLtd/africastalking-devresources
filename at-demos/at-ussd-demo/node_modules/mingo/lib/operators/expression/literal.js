"use strict";
// Literal Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#literal-expression-operator
Object.defineProperty(exports, "__esModule", { value: true });
exports.$literal = void 0;
/**
 * Return a value without parsing.
 * @param obj
 * @param expr
 * @param options
 */
function $literal(obj, expr, options) {
    return expr;
}
exports.$literal = $literal;
