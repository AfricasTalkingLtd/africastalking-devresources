// https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortArray/#mongodb-expression-exp.-sortArray
import { Aggregator } from "../../../aggregator";
import { computeValue } from "../../../core";
import { assert, DEFAULT_COMPARATOR, isArray, isNil, isObject, } from "../../../util";
/**
 * Sorts an array based on its elements. The sort order is user specified.
 *
 * @param obj The target object
 * @param expr The expression argument
 * @param options Options
 * @returns
 */
export function $sortArray(obj, expr, options) {
    const { input, sortBy } = computeValue(obj, expr, null, options);
    if (isNil(input))
        return null;
    assert(isArray(input), "$sortArray expression must resolve to an array");
    if (isObject(sortBy)) {
        return new Aggregator([{ $sort: sortBy }]).run(input);
    }
    const result = [...input];
    result.sort(DEFAULT_COMPARATOR);
    if (sortBy === -1)
        result.reverse();
    return result;
}
