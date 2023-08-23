// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
import { computeValue } from "../../../core";
import { assert, isDate } from "../../../util";
/**
 * Computes the sum of an array of numbers.
 *
 * @param obj
 * @param expr
 * @returns {Object}
 */
export function $add(obj, expr, options) {
    const args = computeValue(obj, expr, null, options);
    let foundDate = false;
    const result = args.reduce((acc, val) => {
        if (isDate(val)) {
            assert(!foundDate, "'$add' can only have one date value");
            foundDate = true;
            val = val.getTime();
        }
        // assume val is a number
        acc += val;
        return acc;
    }, 0);
    return foundDate ? new Date(result) : result;
}
