/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * An operator that evaluates a series of case expressions. When it finds an expression which
 * evaluates to true, it returns the resulting expression for that case. If none of the cases
 * evaluate to true, it returns the default expression.
 *
 * @param obj
 * @param expr
 */
export declare function $switch(obj: RawObject, expr: {
    branches: Array<{
        case: AnyVal;
        then: AnyVal;
    }>;
    default: AnyVal;
}, options?: Options): AnyVal;
