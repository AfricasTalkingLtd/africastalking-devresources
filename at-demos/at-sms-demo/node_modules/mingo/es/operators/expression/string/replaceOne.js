/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { computeValue } from "../../../core";
import { assert, isNil, isString } from "../../../util";
/**
 * Replaces the first instance of a matched string in a given input.
 *
 * @param  {Object} obj
 * @param  {Array} expr
 */
export function $replaceOne(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    const arr = [args.input, args.find, args.replacement];
    if (arr.some(isNil))
        return null;
    assert(arr.every(isString), "$replaceOne expression fields must evaluate to string");
    return args.input.replace(args.find, args.replacement);
}
