// Object Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators
import { computeValue } from "../../../core";
import { assert, isObject } from "../../../util";
/**
 * Converts a document to an array of documents representing key-value pairs.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
export function $objectToArray(obj, expr, options) {
    const val = computeValue(obj, expr, null, options);
    assert(isObject(val), "$objectToArray expression must resolve to an object");
    const result = [];
    for (const [k, v] of Object.entries(val)) {
        result.push({ k, v });
    }
    return result;
}
