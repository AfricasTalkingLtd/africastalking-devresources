/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { computeValue } from "../../../core";
import { assert, isNil, isString } from "../../../util";
/**
 * Replaces all instances of a matched string in a given input.
 *
 * @param  {Object} obj
 * @param  {Array} expr
 */
export function $replaceAll(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    const arr = [args.input, args.find, args.replacement];
    if (arr.some(isNil))
        return null;
    assert(arr.every(isString), "$replaceAll expression fields must evaluate to string");
    return args.input.replace(new RegExp(args.find, "g"), args.replacement);
}
