/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
import { computeValue } from "../../../core";
import { assert, isObject } from "../../../util";
/**
 * A ternary operator that evaluates one expression,
 * and depending on the result returns the value of one following expressions.
 *
 * @param obj
 * @param expr
 */
export function $cond(obj, expr, options) {
    let ifExpr;
    let thenExpr;
    let elseExpr;
    const errorMsg = "$cond: invalid arguments";
    if (expr instanceof Array) {
        assert(expr.length === 3, errorMsg);
        ifExpr = expr[0];
        thenExpr = expr[1];
        elseExpr = expr[2];
    }
    else {
        assert(isObject(expr), errorMsg);
        ifExpr = expr.if;
        thenExpr = expr.then;
        elseExpr = expr.else;
    }
    const condition = computeValue(obj, ifExpr, null, options);
    return computeValue(obj, condition ? thenExpr : elseExpr, null, options);
}
