"use strict";
/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$switch = void 0;
var core_1 = require("../../../core");
/**
 * An operator that evaluates a series of case expressions. When it finds an expression which
 * evaluates to true, it returns the resulting expression for that case. If none of the cases
 * evaluate to true, it returns the default expression.
 *
 * @param obj
 * @param expr
 */
function $switch(obj, expr, options) {
    var thenExpr = null;
    // Array.prototype.find not supported in IE, hence the '.some()' proxy
    expr.branches.some(function (b) {
        var found = (0, core_1.computeValue)(obj, b.case, null, options);
        if (found === true)
            thenExpr = b.then;
        return found;
    });
    return (0, core_1.computeValue)(obj, thenExpr !== null ? thenExpr : expr.default, null, options);
}
exports.$switch = $switch;
