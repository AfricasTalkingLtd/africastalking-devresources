// Object Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators
import { computeValue } from "../../../core";
import { into } from "../../../util";
/**
 * Combines multiple documents into a single document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
export function $mergeObjects(obj, expr, options) {
    const docs = computeValue(obj, expr, null, options);
    return docs instanceof Array
        ? docs.reduce((memo, o) => into(memo, o), {})
        : {};
}
