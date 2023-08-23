// Object Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators
import { $setField } from "./setField";
/**
 * Adds, updates, or removes a specified field in a document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
export function $unsetField(obj, expr, options) {
    return $setField(obj, {
        ...expr,
        value: "$$REMOVE",
    }, options);
}
