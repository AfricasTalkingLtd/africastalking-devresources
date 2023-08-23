// Miscellaneous Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/rand/#mongodb-expression-exp.-rand
import { computeValue } from "../../../core";
import { assert, isNil, isObject, isString } from "../../../util";
/**
 * Adds, updates, or removes a specified field in a document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
export function $getField(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    let input = obj;
    let field = args;
    if (isObject(args) && args.input && args.field) {
        input = args.input;
        field = args.field;
    }
    if (isNil(input))
        return null;
    assert(isObject(input), "$getField expression 'input' must evaluate to an object");
    assert(isString(field), "$getField expression 'field' must evaluate to a string");
    return input[field];
}
