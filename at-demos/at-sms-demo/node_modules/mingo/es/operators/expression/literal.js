// Literal Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#literal-expression-operator
/**
 * Return a value without parsing.
 * @param obj
 * @param expr
 * @param options
 */
export function $literal(obj, expr, options) {
    return expr;
}
